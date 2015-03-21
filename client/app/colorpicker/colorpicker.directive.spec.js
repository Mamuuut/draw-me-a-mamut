'use strict';

describe('Directive: colorPicker', function () {

  // load the directive's module and view
  beforeEach(module('drawMeAMamutApp'));
  beforeEach(module('app/color-picker/color-picker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<color-picker></color-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the colorPicker directive');
  }));
});