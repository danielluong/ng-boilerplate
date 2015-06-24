(function(){
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['$rootScope', '$state', '$http', 'localStorageService', 'base64Service'];

    function authService($rootScope, $state, $http, localStorageService, base64Service){

        return {
            requestAuth: requestAuth,
            getToken: getToken,
            setToken: setToken,
            unsetToken: unsetToken,
            getUser: getUser,
            setUser: setUser,
            unsetUser: unsetUser,
            setAuth: setAuth,
            unsetAuth: unsetAuth
        };

        function requestAuth(toState, toParams){
            if (toState.name !== 'login') {
                $rootScope.redirectTo = {state: toState, params: toParams};
            }

            $state.go('login', { redirectTo: toState.url });
        }

        function getToken(){
            return $http.defaults.headers.common['Authorization'] || null;
        }

        function setToken(token){
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorageService.set('authToken', token);
        }

        function unsetToken(){
            delete $http.defaults.headers.common['Authorization'];
            localStorageService.remove('authToken');
        }

        function getUser(){
            var user = localStorageService.get('user');
            return user ? JSON.parse(base64Service.decode(user)) : null;
        }

        function setUser(user){
            localStorageService.set('user', base64Service.encode(JSON.stringify(user)));
        }

        function unsetUser(){
            localStorageService.remove('user');
        }
        
        function setAuth(user, token){
            setToken(user);
            setUser(token);
        }

        function unsetAuth(){
            unsetToken();
            unsetUser();
        }
    }
})();