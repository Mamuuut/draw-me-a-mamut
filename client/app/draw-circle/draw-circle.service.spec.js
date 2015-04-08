'use strict';

describe('Service: drawCircle', function () {

  // load the service's module
  beforeEach(module('drawMeAMamutApp'));

  // instantiate service
  var drawCircle;
  beforeEach(inject(function (_drawCircle_) {
    drawCircle = _drawCircle_;
  }));

  it('should do something', function () {
    expect(!!drawCircle).toBe(true);
  });

});
