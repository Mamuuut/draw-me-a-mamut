'use strict';

angular.module('drawMeAMamutApp')
  .directive('colorpicker', function () {
    return {
      templateUrl: 'app/colorpicker/colorpicker.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

        element.on('click', '.color', function(event) {
          element.find('.color').removeClass('selected');
          $(event.currentTarget).addClass('selected');
          var sColor = $(event.currentTarget).data('color');
          scope.sDrawColor = sColor;
        });

      }
    };
  });