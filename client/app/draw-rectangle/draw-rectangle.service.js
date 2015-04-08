'use strict';

angular.module('drawMeAMamutApp')
  .service('DrawRectangle', function (Draw) {

        /**
         * return the number of iteration within the step
         * @param  {Object} oStep
         * @return {integer}
         */

        this.iGetNbStepIteration = function(oStep)
        {
          return 10;
        };

        /**
         * Draw the path on the canvas
         * @param  {Object} event - mouse event
         * @return {void}
         */

        this.draw = function(elCanvas, oDrawStep)
        {
          var ctx = elCanvas.get(0).getContext('2d');

          ctx.strokeStyle = oDrawStep.sColor;
          ctx.lineWidth = oDrawStep.iStroke;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'miter';

          var x = oDrawStep.x;
          var y = oDrawStep.y;
          var w = oDrawStep.w;
          var h = oDrawStep.h;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + w, y);
          ctx.lineTo(x + w, y + h);
          ctx.lineTo(x, y + h);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.closePath();
        };

        /**
         * Begin the Path
         * @param  {Object} event - mouse event
         * @return {void}
         */

        this.beginPath = function(oEvent, oScope, elFront, elBack)
        {
          oScope.aoDrawStep.splice(oScope.iNbStep);
          oScope.bDown = true;
          oScope.oDrawStep = {
            'x' : oEvent.offsetX,
            'y' : oEvent.offsetY,
            'w' : 1,
            'h' : 1,
            'fAnimPercent' : 1,
            'iStroke' : oScope.iStroke,
            'iType' : Draw.iTYPE_RECTANGLE,
            'sColor' : oScope.sGetRgba()
          };
          oScope.aoDrawStep.push(oScope.oDrawStep);

          Draw.clearCanvas(elFront);
          this.draw(elFront, oScope.oDrawStep);
        };

        /**
         * Begin the Path
         * @param  {Object} event - mouse event
         * @return {void}
         */

        this.endPath = function(oEvent, oScope, elFront, elBack)
        {
          if (oScope.bDown) {
            oScope.oDrawStep.w = oEvent.offsetX - oScope.oDrawStep.x;
            oScope.oDrawStep.h = oEvent.offsetY - oScope.oDrawStep.y;

            Draw.clearCanvas(elFront);
            this.draw(elBack, oScope.oDrawStep);

            oScope.iNbStep = oScope.aoDrawStep.length;

            oScope.bDown = false;
          }
        };

        /**
         * Mouse down event listener
         * @param  {Object} oEvent - mouse event
         * @param  {Object} oScope
         * @param  {jQueryElement} elFront
         * @param  {jQueryElement} elBack
         * @return {void}
         */

        this.onMouseDown = function(oEvent, oScope, elFront, elBack)
        {
          this.beginPath(oEvent, oScope, elFront, elBack);
        };

        /**
         * Mouse up event listener
         * @param  {Object} oEvent - mouse event
         * @param  {Object} oScope
         * @param  {jQueryElement} elFront
         * @param  {jQueryElement} elBack
         * @return {void}
         */

        this.onMouseUp = function(oEvent, oScope, elFront, elBack)
        {
          this.endPath(oEvent, oScope, elFront, elBack);
        };

        /**
         * Mouse move event listener
         * @param  {Object} oEvent - mouse event
         * @param  {Object} oScope
         * @param  {jQueryElement} elFront
         * @param  {jQueryElement} elBack
         * @return {void}
         */

        this.onMouseMove = function(oEvent, oScope, elFront, elBack)
        {
          if (oScope.bDown) {
            oScope.oDrawStep.w = oEvent.offsetX - oScope.oDrawStep.x;
            oScope.oDrawStep.h = oEvent.offsetY - oScope.oDrawStep.y;

            Draw.clearCanvas(elFront);
            this.draw(elFront, oScope.oDrawStep);
          }
        };

        /**
         * Mouse enetr event listener
         * @param  {Object} oEvent - mouse event
         * @param  {Object} oScope
         * @param  {jQueryElement} elFront
         * @param  {jQueryElement} elBack
         * @return {void}
         */

        this.onMouseEnter = function(oEvent, oScope, elFront, elBack)
        {
          // Not Used
        };

        /**
         * Mouse leave event listener
         * @param  {Object} oEvent - mouse event
         * @param  {Object} oScope
         * @param  {jQueryElement} elFront
         * @param  {jQueryElement} elBack
         * @return {void}
         */

        this.onMouseLeave = function(oEvent, oScope, elFront, elBack)
        {
          // Not Used
        };
  });
