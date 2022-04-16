(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['MenuDataService', 'items'];
  function ItemsController(MenuDataService, items) {
    var ctrl = this;
    ctrl.items = items;
    console.log(ctrl.items);
  }
})();
