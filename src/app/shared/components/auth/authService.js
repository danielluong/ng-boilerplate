(function(){
    'use strict';

    angular
        .module('app.auth')
        .service('authService', authService);

    authService.$inject = ['$rootScope', '$q', '$http', '$cookieStore', 'base64Service'];

    function authService($rootScope, $q, $http, $cookieStore, base64Service){

        return {
            setUser: setUser,
            unsetUser: unsetUser
        };

        function setUser(user){
            $rootScope.user = user;
            $http.defaults.headers.common['token'] = $rootScope.user.token;
            $cookieStore.put('user', base64Service.encode(JSON.stringify($rootScope.user)));
        }

        function unsetUser(){
            delete $rootScope.user;
            delete $http.defaults.headers.common['token'];
            $cookieStore.remove('user');
        }
    }
})();