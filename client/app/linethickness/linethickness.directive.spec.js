'use strict';

describe('Directive: linethickness', function () {

  // load the directive's module and view
  beforeEach(module('drawMeAMamutApp'));
  beforeEach(module('app/linethickness/linethickness.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<linethickness></linethickness>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the linethickness directive');
  }));
});