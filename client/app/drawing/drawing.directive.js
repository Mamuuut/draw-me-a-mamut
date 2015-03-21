'use strict';

angular.module('drawMeAMamutApp')
  .directive('drawing', function ($window)
  {

    return {
      restrict : 'A',
      templateUrl : 'app/drawing/drawing.html',
      link : function (scope, element, attrs)
      {

        scope.bDown = false;

        scope.aoPath = [];

        var elBack = element.find('.canvas-back');
        var elFront = element.find('.canvas-front');

        /**
         * Resize the Element to its parent size
         * @param  {Element} element - element to resize
         * @return {void}
         */

        var onResize = function()
        {
          element.find('canvas').attr({
            'width' : element.parent().innerWidth(),
            'height' : element.parent().innerHeight()
          });

          for (var iPath = 1, iLength = scope.aoPath.length; iPath < iLength; iPath++) {
            var oPath = scope.aoPath[iPath];
            drawPath(elBack, oPath);
          }
        };

        /**
         * Clear the canvas rect
         * @param  {jqueryElement} elCanvas - canvas jQuery Element
         * @return {void}
         */

        var clearCanvas = function(elCanvas)
        {
          var ctx = elCanvas.get(0).getContext('2d');
          ctx.clearRect(0, 0, elCanvas.get(0).width, elCanvas.get(0).height);
        };

        /**
         * Draw the path on the canvas
         * @param  {Object} event - mouse event
         * @return {void}
         */

        var drawPath = function(elCanvas, oPath)
        {
          var ctx = elCanvas.get(0).getContext('2d');

          ctx.strokeStyle = oPath.sColor;
          ctx.lineWidth = oPath.iLineWidth;
          ctx.lineCap = 'round';

          var oStartPos = oPath.aoPos[0];
          ctx.beginPath();
          ctx.moveTo(oStartPos.x - 0.01, oStartPos.y - 0.01);

          for (var iPos = 1, iLength = oPath.aoPos.length; iPos < iLength; iPos++) {
            ctx.lineTo(oPath.aoPos[iPos].x, oPath.aoPos[iPos].y);
          }

          ctx.stroke();
          ctx.closePath();
        };

        /**
         * Begin the path
         * @param  {Object} event - mouse event
         * @return {void}
         */

        var beginPath = function(event)
        {
          scope.bDown = true;
          scope.oPath = {
            'aoPos' : [],
            'sColor' : scope.sColor,
            'iLineWidth' : scope.iLineWidth
          };
          scope.aoPath.push(scope.oPath);
          addPos(event);
        };

        /**
         * End the path
         * @param  {Object} event - mouse event
         * @return {void}
         */

        var endPath = function(event)
        {
          if (scope.bDown) {
            addPos(event);

            clearCanvas(elFront);
            drawPath(elBack, scope.oPath);

            scope.bDown = false;
          }
        };

        /**
         * Add the mouse position to the path
         * @param  {Object} event - mouse event
         * @return {void}
         */

        var addPos = function(event)
        {
          scope.oPath.aoPos.push({
            'x' : event.offsetX,
            'y' : event.offsetY
          });

          clearCanvas(elFront);
          drawPath(elFront, scope.oPath);
        };

        /**
         * Event listeners
         */

        element.on('mousedown', function(event)
        {
          beginPath(event);
        });

        element.on('mouseup', function(event)
        {
          if (scope.bDown) {
            endPath(event);
          }
        });

        element.on('mouseleave', function(event)
        {
          if (scope.bDown) {
            endPath(event);
          }
        });

        element.on('mouseenter', function(event)
        {
          if (event.which) {
            beginPath(event);
          }
        });

        element.on('mousemove', function(event)
        {
          if (scope.bDown) {
            addPos(event);
          }
        });

        // Resize
        onResize(element);

        angular.element($window).on('resize', function()
        {
            onResize();
        });
      }
    };
  });