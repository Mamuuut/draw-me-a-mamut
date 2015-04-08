'use strict';

angular.module('drawMeAMamutApp')
  .directive('actionPicker', function (Draw) {
    return {
      templateUrl: 'app/action-picker/action-picker.html',
      restrict: 'E',
      scope: {
        sAction : '=action'
      },
      link: function (scope, element, attrs) {

        scope.asAction = _.values(Draw.aisTYPE);

        scope.onClick = function($event) {
          element.find('.action').removeClass('selected');
          $($event.currentTarget).addClass('selected');
          var sAction = $($event.currentTarget).data('action');
          scope.sAction = sAction;
        };
      }
    };
  })
  .directive('svgIcon', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
          sprite:'@'
      },
      template: '<svg class="viewBox="0 0 30 30" class="icon"><use xlink:href=""/> </svg>',
      link:function(scope, svg, attrs){

          attrs.$observe('sprite', function(sprite) {
            svg.find('use').attr('xlink:href', '#' + attrs.sprite);
          });
      }
    };
  });