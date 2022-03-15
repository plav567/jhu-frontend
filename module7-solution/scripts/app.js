(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('priceFormat', PriceFormatFilter);

  // Inject service into controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  // Controller for "to buy" shopping list
  function ToBuyController(ShoppingListCheckOffService) {
    var itemBuyer = this;

    itemBuyer.items = ShoppingListCheckOffService.getToBuyItems();

    // Function to buy item
    itemBuyer.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

  // Inject service into controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'priceFormatFilter'];
  // Controller for "bought" shopping list
  function AlreadyBoughtController(ShoppingListCheckOffService, priceFormatFilter) {
    var itemTracker = this;

    itemTracker.items = ShoppingListCheckOffService.getBoughtItems();

    itemTracker.calculatePrice = function(pricePerItem, quantity) {
      return pricePerItem * quantity;
    }

    itemTracker.formatPrice = function() {
      return priceFormatFilter();
    };
  }

  // Shopping list check off service
  function ShoppingListCheckOffService() {
    var service = this;

    // Items to buy
    var toBuyItems = [
      {name: "cookies", quantity: 5, pricePerItem: 2.32},
      {name: "chips", quantity: 2, pricePerItem: 1.50},
      {name: "water", quantity: 20, pricePerItem: 1},
      {name: "ice cream", quantity: 2, pricePerItem: 5.12},
      {name: "noodles", quantity: 10, pricePerItem: 7.49}
    ];
    // Bought items
    var boughtItems = [];

    // Function to buy an item - remove from to buy list and add to bought list
    service.buyItem = function(itemIndex) {
      var item = toBuyItems[itemIndex];
      toBuyItems.splice(itemIndex, 1);
      boughtItems.push(item);
    }

    service.getToBuyItems = function() {
      return toBuyItems;
    }

    service.getBoughtItems = function() {
      return boughtItems;
    }
  }

  // Filter factory function
  function PriceFormatFilter() {
    return function (price) {
      return "$$" + price;
    };
  }
})();
