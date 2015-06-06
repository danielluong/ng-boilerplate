(function(){
    'use strict';

    angular
        .module('app')
        .constant('CONFIG', {
            pageTitle: 'ngBoilerplate',
            apiBaseUrl: 'http://jsonplaceholder.typicode.com/',
            resourceUrlWhitelist: [
                'https://*.s3.amazonaws.com/'
            ],
            defaultState: 'main'
        });
})();