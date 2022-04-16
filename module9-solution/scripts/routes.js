(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if url can't be found
    $urlRouterProvider.otherwise('/');

    // Set up ui states
    $stateProvider
    // Home page
    .state('homeView', {
      url: '/',
      templateUrl: 'home.template.html'
    })
    .state('categoriesView', {
      url: '/categories',
      templateUrl: 'main-categories.template.html',
      controller: 'CategoriesController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('itemsView', {
      url: '/items/{shortName}',
      templateUrl: 'main-items.template.html',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          console.log($stateParams.shortName);
          return MenuDataService.getItemsForCategory($stateParams.shortName);
        }]
      }
    });
  }

})();
