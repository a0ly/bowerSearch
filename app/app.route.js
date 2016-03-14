
(function() {
   'use strict';
   angular
      .module('bowerSearchApp')
      .config(routeConfig);

   routeConfig.$inject = ['$routeProvider'];
   function routeConfig($routeProvider) {
      $routeProvider
         .when('/', {
            templateUrl : 'app/index.html',
            controller : 'indexCtrl',
            controllerAs : 'vm'
         })
         .when('/search/:keyword',{
            templateUrl : 'app/search.html',
            controller : 'searchCtrl',
            controllerAs : 'se'
         })
         .otherwise({redirectTo:'/'});
   }
})();
