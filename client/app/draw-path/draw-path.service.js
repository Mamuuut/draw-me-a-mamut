'use strict';

angular.module('drawMeAMamutApp')
  .service('DrawPath', function (Draw) {

        /**
         * return the number of iteration within the step
         * @param  {Object} oStep
         * @return {integer}
         */

        this.iGetNbStepIteration = function(oStep)
        {
          return oStep.aoPos.length;
        };

        /**
         * Draw the path on the canvas
         * @param  {Object} event - mouse event
         * @return {void}
         */

        this.draw = function(elCanvas, oDrawStep, iMaxPos)
        {
          var ctx = elCanvas.get(0).getContext('2d');

          ctx.strokeStyle = oDrawStep.sColor;
          ctx.lineWidth = oDrawStep.iStroke;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          var oStartPos = oDrawStep.aoPos[0];
          ctx.beginPath();
          ctx.moveTo(oStartPos.x - 0.01, oStartPos.y - 0.01);

          for (var iPos = 1, iLength = iMaxPos || oDrawStep.aoPos.length; iPos < iLength; iPos++) {
            ctx.lineTo(oDrawStep.aoPos[iPos].x, oDrawStep.aoPos[iPos].y);
          }

          ctx.stroke();
          ctx.closePath();
        };

        /**
         * Add the mouse position to the path
         * @param  {Object} oEvent - mouse event
         * @return {void}
         */

        this.addPos = function(oEvent, oScope, elFront, elBack)
        {
          oScope.oDrawStep.aoPos.push({
            'x' : oEvent.offsetX,
            'y' : oEvent.offsetY
          });

          Draw.clearCanvas(elFront);
          this.draw(elFront, oScope.oDrawStep);
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
            'aoPos' : [],
            'fAnimPercent' : 1,
            'iStroke' : oScope.iStroke,
            'iType' : Draw.iTYPE_PATH,
            'sColor' : oScope.sGetRgba()
          };
          oScope.aoDrawStep.push(oScope.oDrawStep);
          this.addPos(oEvent, oScope, elFront, elBack);
        };

        /**
         * Begin the Path
         * @param  {Object} event - mouse event
         * @return {void}
         */

        this.endPath = function(oEvent, oScope, elFront, elBack)
        {
          if (oScope.bDown) {
            this.addPos(oEvent, oScope, elFront, elBack);

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
            this.addPos(oEvent, oScope, elFront, elBack);
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
          if (oEvent.which) {
            this.beginPath(oEvent, oScope, elFront, elBack);
          }
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
          if (oEvent.which) {
            this.endPath(oEvent, oScope, elFront, elBack);
          }
        };
  });
