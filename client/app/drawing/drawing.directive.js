'use strict';

angular.module('drawMeAMamutApp')
  .directive('drawing', function ($window, $rootScope, $q)
  {

    return {
      restrict : 'A',
      templateUrl : 'app/drawing/drawing.html',
      link : function (scope, element, attrs)
      {
        scope.iNbPos = 0;

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
            'width' : element.innerWidth(),
            'height' : element.innerHeight()
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

        var drawPath = function(elCanvas, oPath, iMaxPos)
        {
          var ctx = elCanvas.get(0).getContext('2d');

          ctx.strokeStyle = oPath.sColor;
          ctx.lineWidth = oPath.iStroke;
          ctx.lineCap = 'round';

          var oStartPos = oPath.aoPos[0];
          ctx.beginPath();
          ctx.moveTo(oStartPos.x - 0.01, oStartPos.y - 0.01);

          for (var iPos = 1, iLength = iMaxPos || oPath.aoPos.length; iPos < iLength; iPos++) {
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
          scope.aoPath.splice(scope.iNbPos);
          scope.bDown = true;
          scope.oPath = {
            'aoPos' : [],
            'fAnimPercent' : 1,
            'sColor' : scope.sGetRgba(),
            'iStroke' : scope.iStroke
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

            scope.iNbPos = scope.aoPath.length;

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
        scope.onMouseDown = function(event)
        {
          beginPath(event);
        };

        scope.onMouseUp = function($event)
        {
          if (scope.bDown) {
            endPath($event);
          }
        };

        scope.onMouseEnter = function($event)
        {
          if ($event.which) {
            beginPath($event);
          }
        };

        scope.onMouseMove = function($event)
        {
          if (scope.bDown) {
            addPos($event);
          }
        };

        // Resize
        onResize(element);

        angular.element($window).on('resize', function()
        {
            onResize();
        });

        $rootScope.$on('draw-clear', function()
        {
          scope.aoPath = [];
          clearCanvas(elBack);
        });

        $rootScope.$on('draw-to-path', function(event, iToPath)
        {
          clearCanvas(elBack);

          var iPath = 0;
          for (var iLength = scope.aoPath.length; iPath < iLength; iPath++) {
            scope.aoPath[iPath].fAnimPercent = 0;
          }

          iPath = 0;
          for (var iPath; iPath < iToPath + 1; iPath ++) {
            scope.aoPath[iPath].fAnimPercent = 1;
            drawPath(elBack, scope.aoPath[iPath]);
          }
          
          scope.iNbPos = iToPath + 1;
        });

        $rootScope.$on('draw-repeat', function()
        {
          clearCanvas(elBack);

          var iTotalPos = 0;
          var iPath = 0;
          for (var iLength = scope.aoPath.length; iPath < iLength; iPath++) {
            scope.aoPath[iPath].fAnimPercent = 0;
            iTotalPos += scope.aoPath[iPath].aoPos.length;
          }

          var iStep = Math.ceil(iTotalPos / 300);

          var iMaxPos = 1;
          iPath = 0;
          var iterate = function() {
            if (scope.aoPath[iPath] !== undefined) {
              drawPath(elBack, scope.aoPath[iPath], iMaxPos);
              var iNbPos = scope.aoPath[iPath].aoPos.length;
              scope.aoPath[iPath].fAnimPercent = iMaxPos / (iNbPos - 1);
              if (iMaxPos >= iNbPos - 1) {
                iPath++;
                iMaxPos = 1;
              }
              else {
                iMaxPos = Math.min(iMaxPos + iStep, scope.aoPath[iPath].aoPos.length - 1);
              }
              setTimeout(iterate, 10);
              scope.$apply();
            }
          }
          setTimeout(iterate, 10);
        });
      }
    };
  });