
(function(){
   'use strict';
   angular
      .module('bowerSearchApp')
      .service('bowerSvc', bowerService);

   bowerService.API_BASE = 'https://bower-component-list.herokuapp.com';
   bowerService.$inject = ['$http']
   function bowerService($http) {
      var vm = this;
      vm.packages = {list:[]};
      vm.activate = activate;
      vm.get = get;
      vm.search;

      function activate() {
         vm.packages.stateInit = true;
         $http
            .get(bowerService.API_BASE)
            .success(function(data){
               vm.packages.list = data;
               vm.packages.stateInit = false;
            });
      }

      function get() {
         return vm.packages;
      }
   }

})();