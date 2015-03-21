'use strict';

angular.module('drawMeAMamutApp')
  .directive('linethickness', function () {
    return {
      templateUrl: 'app/linethickness/linethickness.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

        scope.getDotStyle = function(iWidth)
        {
            console.log(iWidth);
        };

        element.on('click', '.line-width', function(event) {
          element.find('.line-width').removeClass('selected');
          $(event.currentTarget).addClass('selected');
          var iLineWidth = $(event.currentTarget).data('width');
          scope.iLineWidth = iLineWidth;
        });
      }
    };
  })
  .directive('dotstyle', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.css('transform', 'scale(' + (scope.iWidth + 2) / 18 + ')');
      }
    };
  });