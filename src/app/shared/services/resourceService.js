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
        .module('app')
        .service('resourceService', resourceService);

    resourceService.$inject = ['$q', '$rootScope', '$http', '$state', 'authService'];

    function resourceService($q, $rootScope, $http, $state, authService){
    
        return {
            xhr: xhr,
            query: query,
            get: get,
            post: post,
            put: put,
            patch: patch,
            delete: destroy
        };

        function xhr(method, url, requestData, baseUrlOverride){
            // The timeout property of the http request takes a deferred value
            // that will abort the underying AJAX request if / when the deferred
            // value is resolved.
            var deferredAbort = $q.defer();

            // Set AJAX request parameters.
            var options = {
                method: method,
                url: baseUrlOverride ? baseUrlOverride + url : $rootScope.CONFIG.apiBaseUrl + url,
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
                    return response;
                },
                function(response){
                    if(response.status === 0){
                        response.canceled = true;
                    } else if(response.status === 401 || response.status === 403){
                        authService.requestAuth($state.current, $state.params);
                    }

                    return $q.reject(response);
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
        }

        function query(resource, params, baseUrlOverride){
            return xhr('GET', resource, params, baseUrlOverride);
        }

        function get(resource, id, params, baseUrlOverride){
            return xhr('GET', resource + '/' + id, params, baseUrlOverride);
        }

        function post(resource, data, baseUrlOverride){
            return xhr('POST', resource, data, baseUrlOverride);
        }

        function put(resource, id, data, baseUrlOverride){
            return xhr('PUT', resource + '/' + id, data, baseUrlOverride);
        }

        function patch(resource, id, data, baseUrlOverride){
            return xhr('PATCH', resource + '/' + id, data, baseUrlOverride);
        }

        function destroy(resource, id, data, baseUrlOverride){
            return xhr('DELETE', resource + '/' + id, data, baseUrlOverride);
        }
    }
})();