(function () {
  'use strict';

  angular.module('public')
  .directive('favoritedish', DishValidator);

  DishValidator.$inject = ['$q', 'MenuService']
  function DishValidator($q, MenuService) {
    var ddo = {
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$asyncValidators.favoritedish = function(modelValue, viewValue) {
          return MenuService.getMenuItem(viewValue)
          .then(function (response) {
            return true;
          })
          .catch(function (error) {
            return $q.reject();
          });
        };
      }
    };

    return ddo;
  }

})();
