'use strict';

describe('Service: drawRectangle', function () {

  // load the service's module
  beforeEach(module('drawMeAMamutApp'));

  // instantiate service
  var drawRectangle;
  beforeEach(inject(function (_drawRectangle_) {
    drawRectangle = _drawRectangle_;
  }));

  it('should do something', function () {
    expect(!!drawRectangle).toBe(true);
  });

});
