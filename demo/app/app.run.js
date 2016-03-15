(function(){
   'use strict';
   angular
      .module('bowerSearchApp')
      .run(appInitialization);

   appInitialization.$inject = ['bowerSvc']
   function appInitialization(bowerSvc) {
      bowerSvc.activate();
   }
})();