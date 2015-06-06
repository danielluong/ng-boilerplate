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
    }
})();