'use strict';

angular.module('drawMeAMamutApp')
  .directive('drawHistory', function ($rootScope) {
    return {
      templateUrl: 'app/draw-history/draw-history.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        element.on('click', '.draw-history-repeat', function()
        {
          $rootScope.$broadcast('draw-repeat');
        });
      }
    };
  })
  .directive('drawHistoryPath', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        element.css('background-color', scope.oPath.sColor);
      }
    };
  });