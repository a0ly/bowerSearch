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

   searchCtrl.$inject = ['$scope', '$timeout','bowerSvc','$location','$routeParams'];
   function searchCtrl( $scope, $timeout, bowerSvc, $location, $routeParams ) {
      var vm = this;
      vm.keyword = $routeParams.keyword;
      vm.goRepository = goRepository;

      activate();

      function activate() {
         vm.searchList = [];
         if( bowerSvc.get().stateInit ) {
            $timeout(function() {
               activate();
            }, 200);
         } else {
            bowerSvc.search(vm.keyword)
            .then(function(result) {
               vm.searchList = result;
            });
         }
      }
      
      function goRepository(pack) {
         $window.open(pack.website);
      }
   }

})();
