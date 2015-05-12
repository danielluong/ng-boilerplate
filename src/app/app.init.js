(function(){
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = ['CONFIG', '$sceDelegateProvider'];
    run.$inject = ['CONFIG', '$rootScope'];

    function config(CONFIG, $sceDelegateProvider){
        $sceDelegateProvider.resourceUrlWhitelist(['self', CONFIG.cdn + '**']);
    }

    function run(CONFIG, $rootScope){
        $rootScope.CONFIG = CONFIG;
    }
})();