(function(){
    'use strict';

    angular
        .module('app.main')
        .controller('mainController', mainController);

    mainController.$inject = [];

    function mainController(){
        /* jshint validthis: true */
        var vm = this;

        init();

        function init(){
        }
    };
})();