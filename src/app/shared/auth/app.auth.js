(function(){
	'use strict';

	angular
        .module('app.auth', ['ngCookies'])
        .run(run);

    run.$inject = ['$rootScope', '$state', '$cookieStore', '$http', '$location'];

	function run ($rootScope, $state, $cookieStore, $http, $location){
        $rootScope.authToken = $cookieStore.get('authToken');
        
        if($rootScope.authToken){
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.authToken;
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if(!toState.isPublic && typeof $rootScope.authToken === 'undefined'){
                event.preventDefault();
                $rootScope.redirectTo = { state: toState, params: toParams };
                $state.go('auth', { redirectTo: toState.url });
            }
        });
    };
})();