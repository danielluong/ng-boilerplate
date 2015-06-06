(function(){
    'use strict';

    angular
        .module('app.auth', ['ngCookies'])
        .run(run);

    run.$inject = ['$rootScope', '$cookieStore', '$http', '$state', 'base64Service'];

    function run($rootScope, $cookieStore, $http, $state, base64Service){
        $rootScope.user = $cookieStore.get('user');

        if($rootScope.user){
            $rootScope.user = JSON.parse(base64Service.decode($rootScope.user));
        }
        
        if($rootScope.user && $rootScope.user.token && $rootScope.user.token.token){
            $http.defaults.headers.common['token'] = $rootScope.user.token.token;
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if(!toState.isPublic && (!$rootScope.user || !$rootScope.user.token || !$rootScope.user.token.token)){
                event.preventDefault();
                $rootScope.redirectTo = { state: toState, params: toParams };
                $state.go('login', { redirectTo: toState.url });
            }
        });
    }
})();