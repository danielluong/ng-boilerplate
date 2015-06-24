(function(){
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = ['CONFIG', '$sceDelegateProvider'];
    run.$inject = ['$rootScope', 'CONFIG', '$state'];

    function config(CONFIG, $sceDelegateProvider){
        CONFIG.resourceUrlWhitelist.map(function(url){
            $sceDelegateProvider.resourceUrlWhitelist(['self', url + '**']);
        });
    }

    function run($rootScope, CONFIG, $state){
        $rootScope.CONFIG = CONFIG;
        $rootScope.$state = $state;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if(fromState.name.substring(0, toState.name.length) === toState.name
            && angular.equals(fromParams, toParams)){
                event.preventDefault();
            }
        });
    }
})();