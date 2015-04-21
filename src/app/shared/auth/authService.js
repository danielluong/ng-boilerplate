(function(){
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['CONFIG', 'base64Service', '$q', '$http', '$cookieStore', '$rootScope', '$timeout'];

    function authService(CONFIG, base64Service, $q, $http, $cookieStore, $rootScope, $timeout){
        var endpoint = 'users/';

        return {
            login: login,
            setToken: setToken,
            logout: logout
        };

        function login(username, password){
            var token = base64Service.encode(username + ':' + password);

            var d = $q.defer();

            $http.get(CONFIG.apiBaseUrl + endpoint + username, {
                headers: { 'Authorization': 'Basic ' + token }
            })
            .success(function(data, status, headers, config){
                d.resolve({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            })
            .error(function(data, status, headers, config){
                d.reject({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            });

            return d.promise;
        };

        function setToken(username, password){
            $rootScope.authToken = base64Service.encode(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.authToken;
            $cookieStore.put('authToken', $rootScope.authToken);
        };

        function logout(){
            delete $rootScope.authToken;
            $http.defaults.headers.common.Authorization = 'Basic ';
            $cookieStore.remove('authToken');
        };
    }
})();