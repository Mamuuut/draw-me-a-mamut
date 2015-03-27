'use strict';

angular.module('drawMeAMamutApp')
  .directive('opacityPicker', function ($document) {

    var iOffsetX = undefined;

    var getOpacity = function(iOffsetX, element) {
      return Math.round(10 * iOffsetX / element.outerWidth()) / 10;
    };

    return {
      templateUrl: 'app/opacity-picker/opacity-picker.html',
      restrict: 'E',
      scope: {
        fOpacity : '=opacity'
      },

      link: function (scope, element, attrs) {

        scope.getOpacityStyle = function() {
          return {
            'left' : scope.fOpacity * 100 + '%'
          };
        };

        scope.onMouseMove = function($event) {
          if (iOffsetX !== undefined) {
            iOffsetX = $event.pageX - element.offset().left;
            scope.fOpacity = getOpacity(iOffsetX, element);
          }
        };

        scope.onMouseDown = function($event) {
          iOffsetX = $event.pageX - element.offset().left;
          scope.fOpacity = getOpacity(iOffsetX, element);
        };

        $document.on('mouseup', function(event) {
          iOffsetX = undefined;
        });
      }
    };
  });