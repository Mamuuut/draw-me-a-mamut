'use strict';

angular.module('drawMeAMamutApp')
.controller('DrawCtrl', function ($scope, $window) {

    $scope.aiLineWidth = [1, 2, 4, 8, 16];
    $scope.aoPath = [];
    $scope.asColor = ['#000000', '#999999', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
    $scope.bDown = false;
    $scope.fOpacity = .5;
    $scope.iDrawLineWidth = 4;
    $scope.sDrawColor = $scope.asColor[0];
    
});
