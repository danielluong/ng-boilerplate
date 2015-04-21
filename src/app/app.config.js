(function(){
    'use strict';

    angular
        .module('app')
        .constant('CONFIG', {
            apiBaseUrl: '/api/v1/',
            defaultState: 'main'
        });
})();