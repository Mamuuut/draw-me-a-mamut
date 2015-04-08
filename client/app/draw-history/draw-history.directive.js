'use strict';

angular.module('drawMeAMamutApp')
  .directive('drawHistory', function ($rootScope) {
    return {
      templateUrl: 'app/draw-history/draw-history.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

        scope.onRepeat = function() {
          $rootScope.$broadcast('draw-repeat');
        };

        scope.onDrawToStep = function($event) {
          var iStep = $($event.currentTarget).data('step');
          $rootScope.$broadcast('draw-to-step', iStep);
        };

        scope.onClear = function() {
          $rootScope.$broadcast('draw-clear');
        };
      }
    };
  })
  .directive('drawHistoryStep', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.getStepPercent = function(oDrawStep) {
          return {
            'top' : (1 - oDrawStep.fAnimPercent) * 100 + '%'
          }
        }

        element.find('.draw-history-color').css({
          'background-color': scope.oDrawStep.sColor,
          'color': tinycolor(scope.oDrawStep.sColor).isDark() ? '#ffffff' : '#000000'
        });
      }
    };
  });