(function () {
  'use strict';

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'SignupService'];
  function SignupController (MenuService, SignupService) {
    var ctrl = this;

    ctrl.submitForm = function () {
      ctrl.submitted = true;
      var promise = MenuService.getMenuItem(ctrl.dish);
      promise.then(function (response) {
        ctrl.validDish = true;
        SignupService.registerUser(
          ctrl.firstname,
          ctrl.lastname,
          ctrl.email,
          ctrl.phone,
          ctrl.dish
        );
        console.log(SignupService.getUserInfo());
      }).catch(function (error) {
        ctrl.validDish = false;
      })
    }
  }
})();
