'use strict';

describe('Directive: actionPicker', function () {

  // load the directive's module and view
  beforeEach(module('drawMeAMamutApp'));
  beforeEach(module('app/action-picker/action-picker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<action-picker></action-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the actionPicker directive');
  }));
});