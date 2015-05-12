(function(){
    'use strict';

    angular
        .module('app')
        .constant('CONFIG', {
            apiBaseUrl: '/api/v1/',
            cdn: 'https://*.s3.amazonaws.com/',
            defaultState: 'main'
        });
})();