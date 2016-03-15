(function() {
   'use strict';
   angular
      .module('bowerSearchApp')
      .controller('indexCtrl', indexCtrl)
      .controller('searchCtrl', searchCtrl);

   indexCtrl.$inject = ['bowerSvc', '$window'];
   function indexCtrl(bowerSvc, $window) {
      var vm = this;
      vm.packages = bowerSvc.get();
      vm.goRepository = goRepository;

      function goRepository(pack) {
         $window.open(pack.website);
      }
   }

   searchCtrl.$inject = ['bowerSvc','$location','$routeParams'];
   function searchCtrl(bowerSvc, $location, $routeParams) {
      var vm = this;
      vm.keyword = $routeParams.keyword;
      bowerSvc.search(vm.keyword)
      .then(function(result){
         vm.searchList = result;
      });
   }

})();
