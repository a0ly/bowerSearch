(function() {
   'use strict';
   angular
      .module('bowerSearchApp')
      .controller('mainCtrl', mainCtrl);

   mainCtrl.$inject = ['bowerSvc']
   function mainCtrl(bowerSvc) {
      var vm = this;
      vm.packages = bowerSvc.get();
      console.log(vm.packages);
   }
})();
