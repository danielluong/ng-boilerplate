(function(){
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);
    
    loginController.$inject = ['$rootScope', '$state', 'resourceService', 'authService'];

    function loginController($rootScope, $state, resourceService, authService){
        var vm = this;
        
        vm.loading = false;
        vm.errors = [];
        vm.credentials = {};
        vm.submit = submit;

        init();

        function init(){
            authService.unsetUser();
        }

        function submit(){
            if(vm.loading){
                return;
            }

            vm.loading = true;
            vm.errors = [];

            resourceService.post('login', credentials)
            .then(function(response){
                authService.setUser(response.data);
                
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