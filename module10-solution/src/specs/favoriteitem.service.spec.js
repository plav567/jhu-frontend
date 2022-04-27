describe('favoriteitem', function() {

  var $httpBackend;
  var ApiPath;
  var menuService;

  beforeEach(function() {
    module('common');

    inject(function ($injector) {

      $httpBackend = $injector.get('$httpBackend');
      menuService = $injector.get('MenuService');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return that favorite item does exist', function () {
    $httpBackend.whenGET(ApiPath + '/menu_items/A3.json').respond('A3');

    menuService.getMenuItem('A3').then(function(response) {
      expect(response.data).toEqual('A3');
    });

    $httpBackend.flush();

  });

  it('should return that favorite item does not exist', function () {
    $httpBackend.whenGET(ApiPath + '/menu_items/Z1.json').respond(undefined);

    menuService.getMenuItem('Z1').then(function(response) {
      expect(response.data).toBeUndefined();
    });

    $httpBackend.flush();

  });

});
