'use strict';

angular.module('drawMeAMamutApp')
  .directive('strokePicker', function () {

    return {
      templateUrl: 'app/size-picker/size-picker.html',
      restrict: 'E',
      scope: {
        iStroke : '=stroke'
      },
      link: function (scope, element, attrs) {

        scope.aiStrokeWidth = [1, 2, 4, 8, 16, 32];

        scope.onClick = function($event) {
          element.find('.line-width').removeClass('selected');
          $($event.currentTarget).addClass('selected');
          var iStroke = $($event.currentTarget).data('stroke');
          scope.iStroke = iStroke;
        };
      }
    };
  });