(function(){
    'use strict';

    angular.module('app', [
        'app.utils',
        'app.directives',

        'ui.router',
        'ngAnimate',
        
        'app.auth',
        'app.main'
    ]);
})();