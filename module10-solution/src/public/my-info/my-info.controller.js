(function () {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['userInfo', 'ApiPath'];
  function MyInfoController(userInfo, ApiPath) {
    var ctrl = this;
    ctrl.userInfo = userInfo;
    ctrl.basePath = ApiPath;
  }
})();
