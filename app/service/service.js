
(function(){
   'use strict';
   angular
      .module('bowerSearchApp.service')
      .service('bowerSvc', bowerService);

   bowerService.API_BASE = 'https://bower-component-list.herokuapp.com';
   bowerService.$inject = ['$http', '$q', '$timeout'];
   function bowerService($http, $q, $timeout) {
      var vm = this;
      var deffered = $q.defer();
      vm.defaultLimit = 9;
      vm.packages = {list:[]};
      vm.activate = activate;
      vm.get = get;
      vm.search = search;

      function activate() {
         vm.packages.stateInit = true;
         $http
            .get(bowerService.API_BASE)
            .success(function(data){
               vm.packages.list = data;
               vm.packages.stateInit = false;
               
               /* initializtion after data loaded */
               initLatest();
               initMostForked();
               initMostStars();
               initMostAuthor();
               initMostKeyword();
            });
      }

      function initLatest(limit) {
         limit = limit || vm.defaultLimit;
         vm.packages.latest = _
            .chain(vm.packages.list)
            .orderBy(['created'], ['desc'])
            .value()
            .slice(0,limit);
      }

      function initMostForked(limit) {
         limit = limit || vm.defaultLimit;
         vm.packages.mostForked = _
            .chain(vm.packages.list)
            .orderBy(['forks'],['desc'])
            .value()
            .slice(0, limit);
      }

      function initMostStars(limit) {
         limit = limit || vm.defaultLimit;
         vm.packages.mostStars = _
            .chain(vm.packages.list)
            .orderBy(['stars'],['desc'])
            .value()
            .slice(0, limit);
      }

      function initMostAuthor(limit) {
         limit = limit || vm.defaultLimit;
         vm.packages.mostAuthor = _
            .chain(vm.packages.list)
            .groupBy('owner')
            .toPairs()
            .map(function(a){
               return {
                  owner : a[0],
                  count : a[1].length
               };
            })
            .orderBy(['count'],['desc'])
            .value()
            .slice(0, limit);

      }

      function initMostKeyword(limit) { 
         limit = limit || 6;
         vm.packages.mostKeywords = _
            .chain(vm.packages.list)
            .map(function(a) {
               return a.keywords
            })
            .compact()
            .flatten()
            .countBy()
            .toPairs()
            .map(function(a) {
               return {
                  keyword: a[0],
                  count: a[1]
               };
            })
            .orderBy(['count'],['desc'])
            .value()
            .slice(0, limit);
      }

      function get() {
         return vm.packages;
      }

      function search(keyword, passedDeffer) {
         
         var deffer = passedDeffer || deffered;

         if(vm.packages.stateInit) {
            $timeout(function(){
               search(keyword, deffer);
            }, 200);
         } else {
            var result = _.chain(vm.packages.list)
               .filter(function(o){
                  if(o.name.indexOf(keyword) > -1) {
                     return true;
                  } else if(o.description && o.description.indexOf(keyword) > -1) {
                     return true;
                  } else if(o.owner.indexOf(keyword) > -1) {
                     return true;
                  } else {
                     for(var i=0; o.keywords && i<o.keywords.length; i++) {
                        if(o.keywords[i].indexOf(keyword) > -1) {
                           return true;
                        }
                     }
                  }
               })
               .value();
            deffer.resolve(result);
         }
         return deffer.promise;
      }
   }

})();