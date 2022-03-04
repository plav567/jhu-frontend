(function() {
  'use strict';
  angular.module('LunchCheck', [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    // Default lunch message is empty
    $scope.lunchMessage = "";

    $scope.checkLunch = function () {
      console.log("lunch dishes: " + $scope.lunchDishes);
      var message = determineMessage($scope.lunchDishes);
      $scope.lunchMessage = message;
    };

    function determineMessage(input) {
      console.log("input: " + input);
      // If textbox is empty or empty string
      if (!input) {
        return "Please enter data first.";
      }

      var maxItems = 3;
      var splitInput = input.split(',');
      var count = 0;

      // Go through dishes and only count non-empty items
      for (var item in splitInput) {
        if (splitInput[item].trim()) {
          count++;
        }
      }

      // Show appropriate message depending on number of items
      if (count <= maxItems) {
        return "Enjoy!";
      } else {
        return "Too much!";
      }
    }


  }
})();
