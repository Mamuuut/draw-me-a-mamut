'use strict';

angular.module('drawMeAMamutApp')
  .directive('drawing', function ($window, $rootScope, $q, Draw, DrawPath, DrawCircle, DrawRectangle)
  {
    var asoService = {
      'path' : DrawPath,
      'circle' : DrawCircle,
      'rectangle' : DrawRectangle
    }

    return {
      restrict : 'A',
      templateUrl : 'app/drawing/drawing.html',
      link : function (scope, element, attrs)
      {
        scope.iNbStep = 0;
        var oService;

        scope.$watch('sAction', function(sNewAction) {
          oService = asoService[sNewAction];
        });

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

          for (var iDrawStep = 1, iLength = scope.aoDrawStep.length; iDrawStep < iLength; iDrawStep++) {
            var oDrawStep = scope.aoDrawStep[iDrawStep];
            DrawPath.draw(elBack, oDrawStep);
          }
        };

        /**
         * Draw the nb iteration on the canvas
         * @param  {jQueryElement} elCanvas
         * @param  {array_ao} aoDrawStep
         * @param  {integer} iNbIteration
         * @return {void}
         */

        var drawNbIteration = function(elCanvas, aoDrawStep, iNbIteration)
        {
          var iStep = 0;
          var oStep, oStepService;

          while(iNbIteration > 0) {
            oStep = aoDrawStep[iStep];
            oStepService = asoService[Draw.aisTYPE[oStep.iType]];
            var iNbStepIteration = oStepService.iGetNbStepIteration(oStep);
            
            if (iNbIteration >= iNbStepIteration) {
              oStep.fAnimPercent = 1;
              oStepService.draw(elCanvas, oStep);
              iNbIteration -= iNbStepIteration;
              iStep++;
            }
            else {
              oStep.fAnimPercent = iNbIteration / iNbStepIteration;
              oStepService.draw(elCanvas, oStep, iNbIteration);
              iNbIteration = 0;
            }
          }
        };

        // Resize
        onResize(element);

        angular.element($window).on('resize', function()
        {
            onResize();
        });

        // Mouse Event Listener
        scope.onMouseDown = function($event)
        {
          oService.onMouseDown($event, scope, elFront, elBack);
        };

        scope.onMouseUp = function($event)
        {
          oService.onMouseUp($event, scope, elFront, elBack);
        };

        scope.onMouseEnter = function($event)
        {
          oService.onMouseEnter($event, scope, elFront, elBack);
        };

        scope.onMouseLeave = function($event)
        {
          oService.onMouseLeave($event, scope, elFront, elBack);
        };

        scope.onMouseMove = function($event)
        {
          oService.onMouseMove($event, scope, elFront, elBack);
        };

        $rootScope.$on('draw-clear', function()
        {
          scope.aoDrawStep = [];
          Draw.clearCanvas(elBack);
        });

        $rootScope.$on('draw-to-step', function(event, iToDrawStep)
        {
          Draw.clearCanvas(elBack);

          var iDrawStep = 0;
          var oStep, oStepService;
          for (var iLength = scope.aoDrawStep.length; iDrawStep < iLength; iDrawStep++) {
            oStep = scope.aoDrawStep[iDrawStep];
            oStep.fAnimPercent = 0;
          }

          iDrawStep = 0;
          for (var iDrawStep; iDrawStep < iToDrawStep + 1; iDrawStep ++) {
            oStep = scope.aoDrawStep[iDrawStep];
            oStep.fAnimPercent = 1;
            oStepService = asoService[Draw.aisTYPE[oStep.iType]];
            oStepService.draw(elBack, scope.aoDrawStep[iDrawStep]);
          }
          
          scope.iNbStep = iToDrawStep + 1;
        });

        $rootScope.$on('draw-repeat', function()
        {
          Draw.clearCanvas(elBack);

          var iTotalIteration = 0;
          var iDrawStep = 0;
          var oStep, oStepService;
          for (var iLength = scope.aoDrawStep.length; iDrawStep < iLength; iDrawStep++) {
            oStep = scope.aoDrawStep[iDrawStep];
            oStep.fAnimPercent = 0;
            oStepService = asoService[Draw.aisTYPE[oStep.iType]];
            iTotalIteration += oStepService.iGetNbStepIteration(oStep);
          }

          var iIteration = Math.ceil(iTotalIteration / 300);

          var iMaxIteration = 1;
          var iterate = function() {
            if (iMaxIteration < iTotalIteration) {
              iMaxIteration = Math.min(iMaxIteration + iIteration, iTotalIteration);
              
              Draw.clearCanvas(elBack);
              drawNbIteration(elBack, scope.aoDrawStep, iMaxIteration);

              setTimeout(iterate, 10);
              scope.$apply();
            }
          }
          setTimeout(iterate, 10);
        });
      }
    };
  });