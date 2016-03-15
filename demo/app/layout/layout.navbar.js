
(function() {
   'use strict';
   angular
      .module('bowerSearchApp.layout')
      .directive('bowerNavbar', bowerNavbarDirective);

   bowerNavbarDirective.$inject = [];
   function bowerNavbarDirective() {
      var directive = {
         templateUrl: 'app/layout/navbar.html',
         controller : navCtrl,
         controllerAs : 'nav'
      };
      return directive;

      navCtrl.$inject = ['bowerSvc','$location', '$window'];
      function navCtrl(bowerSvc, $location, $window) {
         var vm = this;
         vm.search = search;
         vm.goIndex = goIndex;
         vm.packages = bowerSvc.get();
         
         function search() {
            if(vm.query) {
               $location.path('/search/'+vm.query);
            }
         }

         function goIndex() {
            $window.scrollTo(0,0);
            $location.path('/');
         }
      }
   }

})();
