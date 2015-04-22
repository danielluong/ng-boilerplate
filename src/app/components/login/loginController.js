(function(){
    'use strict';

    angular
        .module('app.login')
        .controller('loginController', loginController);
    
    loginController.$inject = ['authService', '$rootScope', '$state', 'CONFIG', 'resourceService'];

    function loginController(authService, $rootScope, $state, CONFIG, resourceService){
        /* jshint validthis: true */
        var vm = this;
        
        vm.submit = submit;
        vm.loading = false;
        vm.error = false;

        activate();

        function activate(){
            authService.logout();
        };

        function submit(isValid){
            if(!isValid){
                return;
            }

            vm.loading = true;
            vm.error = false;

            authService.login(vm.credentials.username, vm.credentials.password)
            .then(function(response){
                authService.setToken(vm.credentials.username, vm.credentials.password);
                
                if($rootScope.redirectTo){
                    $state.go($rootScope.redirectTo.state.name, $rootScope.redirectTo.params);
                    delete $rootScope.redirectTo;
                } else {
                    $state.go(CONFIG.defaultState);
                }
            }, function(response){
                vm.error = 'The username and password you entered did not match our records. Please double-check and try again.';
            })
            .finally(function(){
                vm.loading = false;
            });
        };
    };
})();