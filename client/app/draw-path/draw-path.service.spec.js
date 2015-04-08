'use strict';

describe('Service: drawPath', function () {

  // load the service's module
  beforeEach(module('drawMeAMamutApp'));

  // instantiate service
  var drawPath;
  beforeEach(inject(function (_drawPath_) {
    drawPath = _drawPath_;
  }));

  it('should do something', function () {
    expect(!!drawPath).toBe(true);
  });

});
