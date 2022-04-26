(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var service = this;

    // Method returning promise that is result of
    // using $http service using REST API endpoint
    // https://davids-restaurant.herokuapp.com/categories.json
    service.getAllCategories = function () {
      return $http({
        method: 'GET',
        url:  'https://davids-restaurant.herokuapp.com/categories.json'
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error.message);
      });
    };

    // Method returning promis that is result of using
    // $http service using REST API endpoint
    //  https://davids-restaurant.herokuapp.com/menu_items.json?category=
    // where code should append categoryShortName before call to server
    service.getItemsForCategory = function (categoryShortName) {
      // var endpointUrl = https://davids-restaurant.herokuapp.com/menu_items.json?category=
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
        params: {
          'category': categoryShortName
        }
      }).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error.message);
      });
    };
  }

})();
