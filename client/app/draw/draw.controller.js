'use strict';

angular.module('drawMeAMamutApp')
.controller('DrawCtrl', function ($scope, $window) {

    var hexToRgb = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    $scope.aoPath = [];
    $scope.bDown = false;
    $scope.fOpacity = 1;
    $scope.iStroke = 4;
    $scope.sDrawColor = '#000000';
    $scope.sGetRgba = function() {
        return tinycolor($scope.sDrawColor).setAlpha($scope.fOpacity).toRgbString();
    }
});
