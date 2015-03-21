'use strict';

angular.module('drawMeAMamutApp')
.controller('DrawCtrl', function ($scope, $window) {
    $scope.aiLineWidth = [1, 2, 4, 8, 16];
    $scope.asColor = ['#000000', '#999999', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
    $scope.sColor = $scope.asColor[0];
    $scope.fOpacity = .5;
    $scope.iLineWidth = 4;
});
