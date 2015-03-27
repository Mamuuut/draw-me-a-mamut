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

        scope.onDrawToPath = function($event) {
          var iPath = $($event.currentTarget).data('path');
          $rootScope.$broadcast('draw-to-path', iPath);
        };

        scope.onClear = function() {
          $rootScope.$broadcast('draw-clear');
        };
      }
    };
  })
  .directive('drawHistoryPath', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.getPathPercent = function(oPath) {
          return {
            'top' : (1 - oPath.fAnimPercent) * 100 + '%'
          }
        }

        element.find('.draw-history-color').css({
          'background-color': scope.oPath.sColor,
          'color': tinycolor(scope.oPath.sColor).isDark() ? '#ffffff' : '#000000'
        });
      }
    };
  });