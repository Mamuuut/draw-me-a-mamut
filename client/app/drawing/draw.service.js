'use strict';

angular.module('drawMeAMamutApp')
  .service('Draw', function () {

    this.iTYPE_PATH = 1;
    this.iTYPE_CIRCLE = 2;
    this.iTYPE_RECTANGLE = 3;

    this.aisTYPE = {
      1 : 'path',
      2 : 'circle',
      3 : 'rectangle'
    };

    /**
     * Clear the canvas rect
     * @param  {jqueryElement} elCanvas - canvas jQuery Element
     * @return {void}
     */

    this.clearCanvas = function(elCanvas)
    {
      var ctx = elCanvas.get(0).getContext('2d');
      ctx.clearRect(0, 0, elCanvas.get(0).width, elCanvas.get(0).height);
    };
  });