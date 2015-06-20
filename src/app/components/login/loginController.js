(function(){
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);
    
    loginController.$inject = ['authService', 'resourceService', '$rootScope', '$state'];

    function loginController(authService, resourceService, $rootScope, $state){
        var vm = this;
        vm.loading = false;
        vm.errors = [];
        vm.credentials = {};
        vm.submit = submit;

        init();

        function init(){
            authService.unsetAuth();
        }

        function submit(){
            if(vm.loading){
                return;
            }

            vm.loading = true;
            vm.errors = [];

            resourceService.post('login', credentials)
            .then(function(response){
                authService.setAuth(response.data, response.data.token);
                
                if($rootScope.redirectTo){
                    $state.go($rootScope.redirectTo.state.name, $rootScope.redirectTo.params);
                    delete $rootScope.redirectTo;
                } else {
                    $state.go('default');
                }
            }, function(response){
                vm.errors = response.data.errors;
            }).finally(function(){
                vm.loading = false;
            });
        }
    }
})();