'use strict';

describe('Directive: opacityPicker', function () {

  // load the directive's module and view
  beforeEach(module('drawMeAMamutApp'));
  beforeEach(module('app/opacity-picker/opacity-picker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<opacity-picker></opacity-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the opacityPicker directive');
  }));
});