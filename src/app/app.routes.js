(function(){
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/login/loginView.html',
                controller: 'loginController',
                controllerAs: 'login',
                isPublic: true
            })
            .state('main', {
                url: '/main',
                templateUrl: 'app/components/main/mainView.html',
                controller: 'mainController',
                controllerAs: 'main'
            })
            .state('default', {
                url: '/',
                controller: ['$state', 'CONFIG', function($state, CONFIG){
                    $state.go(CONFIG.defaultState);
                }],
                isPublic: true
            });
    }
})();