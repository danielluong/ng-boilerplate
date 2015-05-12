(function(){
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['$rootScope', '$q', '$http', '$cookieStore', 'base64Service'];

    function authService($rootScope, $q, $http, $cookieStore, base64Service){

        return {
            login: login,
            setUser: setUser,
            logout: logout
        };

        function login(credentials){
            var d = $q.defer();

            $http.post($rootScope.CONFIG.apiBaseUrl + 'login', credentials)
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
        }

        function setUser(user){
            $rootScope.user = user;
            $http.defaults.headers.common['token'] = $rootScope.user.token;
            $cookieStore.put('user', base64Service.encode(JSON.stringify($rootScope.user)));
        }

        function logout(){
            delete $rootScope.user;
            delete $http.defaults.headers.common['token'];
            $cookieStore.remove('user');
        }
    }
})();