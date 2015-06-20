(function(){
    'use strict';

    angular
        .module('app.auth', ['ngCookies'])
        .run(run);

    run.$inject = ['authService', '$rootScope'];

    function run(authService, $rootScope){
        var authToken = authService.getToken();

        if(authToken){
            authService.setToken(authToken);
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if(!toState.isPublic && !authToken){
                event.preventDefault();
                authService.requestAuth(toState, toParams);
            }
        });
    }
})();