(function(){
    'use strict';

    angular.module('app', [
        'app.utils',
        'app.directives',
        'app.auth',

        'ui.router',
        'ngAnimate',
        
        'app.login',
        'app.main'
    ]);
})();