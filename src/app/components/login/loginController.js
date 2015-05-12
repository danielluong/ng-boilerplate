(function(){
    'use strict';

    angular
        .module('app.login')
        .controller('loginController', loginController);
    
    loginController.$inject = ['authService', '$rootScope', '$state'];

    function loginController(authService, $rootScope, $state){
        /* jshint validthis: true */
        var vm = this;
        
        vm.loading = false;
        vm.errors = [];
        vm.credentials = {};
        vm.submit = submit;

        init();

        function init(){
            authService.logout();
        }

        function submit(){
            if(vm.loading){
                return;
            }

            vm.loading = true;
            vm.errors = [];

            authService.login(vm.credentials)
            .then(function(response){
                authService.setUser(response.data.data);
                
                if($rootScope.redirectTo){
                    $state.go($rootScope.redirectTo.state.name, $rootScope.redirectTo.params);
                    delete $rootScope.redirectTo;
                } else {
                    $state.go('default');
                }
            }, function(response){
                vm.errors = response.data.error.message.split('\\n');
            })
            .finally(function(){
                vm.loading = false;
            });
        }
    }
})();