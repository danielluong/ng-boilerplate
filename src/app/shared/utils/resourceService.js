// Usage:
// var request = null;
// if(request){ request.abort(); }
// (request = resourceService.query('posts')).then(
//     function(response){
//         console.log('success');
//     },
//     function(response){
//         if(response.canceled) return;
//         console.log('error');
//     }
// );
(function(){
    'use strict';

    angular
        .module('app.utils')
        .service('resourceService', resourceService);

    resourceService.$inject = ['CONFIG', '$q', '$http', '$rootScope', '$state'];

    function resourceService(CONFIG, $q, $http, $rootScope, $state){
    
        return {
            query: query,
            get: get,
            save: save,
            update: update,
            remove: remove
        };

        function xhrPromise(method, url, requestData){
            // The timeout property of the http request takes a deferred value
            // that will abort the underying AJAX request if / when the deferred
            // value is resolved.
            var deferredAbort = $q.defer();

            // Set AJAX request parameters.
            var options = {
                method: method,
                url: url,
                timeout: deferredAbort.promise
            };

            // For GET requests, pass "params" parameter.
            // Pass "data" parameter for all other request types.
            if(method === 'GET'){
                angular.extend(options, { params: requestData });
            } else {
                angular.extend(options, { data: requestData });
            }

            // Initiate the AJAX request.
            var request = $http(options);

            // Rather than returning the http-promise object, we want to pipe it
            // through another promise so that we can "unwrap" the response
            // without letting the http-transport mechansim leak out of the
            // service layer.
            var promise = request.then(
                function(response){
                    return response.data;
                },
                function(response){
                    if(response.status === 401){
                        response.data = { canceled: true, message: ['Error 401 Unauthorized'] };
                        $rootScope.redirectTo = { state: $state.current, params: $state.params };
                        $state.go('auth', { redirectTo: $state.current.url });
                    } else if(response.status === 401 || !angular.isObject(response.data) || !response.data.message){
                        response.data = { canceled: response.status === 0, message: ['An unknown error occurred.'] };
                    }

                    return $q.reject(response.data);
                }
            );

            // Now that we have the promise that we're going to return to the
            // calling context, let's augment it with the abort method. Since
            // the $http service uses a deferred value for the timeout, then
            // all we have to do here is resolve the value and AngularJS will
            // abort the underlying AJAX request.
            promise.abort = function(){
                deferredAbort.resolve();
            };

            // Since we're creating functions and passing them out of scope,
            // we're creating object references that may be hard to garbage
            // collect. As such, we can perform some clean-up once we know
            // that the requests has finished.
            promise.finally(
                function(){
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );

            return promise;

        };

        function query(type, params){
            return xhrPromise('GET', CONFIG.apiBaseUrl + type, params);
        };

        function get(type, id, params){
            return xhrPromise('GET', CONFIG.apiBaseUrl + type + '/' + id, params);
        };

        function save(type, data){
            return xhrPromise('POST', CONFIG.apiBaseUrl + type, data);
        };

        function update(type, id, data){
            return xhrPromise('PATCH', CONFIG.apiBaseUrl + type + '/' + id, data);
        };

        function remove(type, id){
            return xhrPromise('DELETE', CONFIG.apiBaseUrl + type + '/' + id);
        };
    };
})();