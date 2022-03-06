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
      // Apply style to the message
      $scope.messageColor = applyMessageStyle($scope.lunchMessage);
      // Apply style to the message border
      $scope.messageBorder = applyBorderStyle($scope.lunchMessage);
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

    function applyMessageStyle(message) {
      if (message === "Enjoy!") {
        return 'greenMessage';
      } else if (message === "Too much!") {
        return 'redMessage';
      }
    }

    function applyBorderStyle(message) {
      if (message === "Enjoy!" || message === "Too much!") {
        return 'greenBorder';
      } else if (message === "Please enter data first.") {
        return 'redBorder';
      }
    }

  }
})();
