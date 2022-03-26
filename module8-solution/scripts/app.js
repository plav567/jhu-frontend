(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('RestEndpoint', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);

  // Directive
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'itemdisplay.html',
      scope: {
        items: '<',
        searched: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      bindToController: true,
      controllerAs: 'nidc'
    };

    return ddo;
  }

  // Controller for narrowing down items
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.found = [];
    controller.searchedForItem = false;

    controller.findItems = function() {
      controller.searchedForItem = true;
      if (!controller.searchTerm.trim()) {
        controller.found = [];
      } else {
        console.log("searched for " + controller.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
        promise.then(function (response) {
          controller.found = response;
        }).catch(function (error) {
          console.log(error.message);
        });
      }
    };

    controller.removeItem = function(index) {
      console.log("remove index: " + index);
      controller.found.splice(index, 1);
    };

  }

  // Service to search menu for matching items
  MenuSearchService.$inject = ['$http', 'RestEndpoint'];
  function MenuSearchService($http, RestEndpoint) {
    var service = this;

    //Method to retrieve menu items + find which ones match the term
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: RestEndpoint
      }).then(function (response) {
        // Process results and keep items that match
        var foundItems = [];
        var menuItems = response.data.menu_items;
        for (var item in response.data.menu_items) {
          if (menuItems[item].description.match(searchTerm)) {
            // console.log(menuItems[item]);
            foundItems.push(menuItems[item]);
          }
        }
        // Return processed items
        return foundItems;
      }).catch(function (error) {
        console.log(error.message);
      });
    };


  }

})();
