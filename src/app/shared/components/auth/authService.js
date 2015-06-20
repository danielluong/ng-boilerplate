(function(){
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['$rootScope', '$state', '$http', '$cookieStore', 'base64Service'];

    function authService($rootScope, $state, $http, $cookieStore, base64Service){

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
            $rootScope.redirectTo = { state: toState, params: toParams };
            $state.go('login', { redirectTo: toState.url });
        }

        function getToken(){
            return $http.defaults.headers.common['Authorization'] || null;
        }

        function setToken(token){
            $http.defaults.headers.common['Authorization'] = token;
            $cookieStore.put('authToken', token);
        }

        function unsetToken(){
            delete $http.defaults.headers.common['Authorization'];
            $cookieStore.remove('authToken');
        }

        function getUser(){
            var user = $cookieStore.get('user');
            return user ? JSON.parse(base64Service.decode(user)) : null;
        }

        function setUser(user){
            $cookieStore.put('user', base64Service.encode(JSON.stringify(user)));
        }

        function unsetUser(){
            $cookieStore.remove('user');
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