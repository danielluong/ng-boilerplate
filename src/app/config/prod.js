(function(){
    'use strict';

    angular
        .module('app')
        .constant('CONFIG', {
            pageTitle: 'ngBoilerplate',
            apiBaseUrl: '/api/v1/',
            resourceUrlWhitelist: [
                'https://*.s3.amazonaws.com/'
            ],
            defaultState: 'main'
        });
})();