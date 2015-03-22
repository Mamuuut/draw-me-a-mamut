'use strict';

describe('Directive: drawHistory', function () {

  // load the directive's module and view
  beforeEach(module('drawMeAMamutApp'));
  beforeEach(module('app/draw-history/draw-history.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<draw-history></draw-history>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the drawHistory directive');
  }));
});