(function(){
    'use strict';

    angular.module('app', [
        'ui.router',

        'app.utils',
        'app.directives',
        'app.auth',
        
        'app.login',
        'app.main'
    ]);
})();