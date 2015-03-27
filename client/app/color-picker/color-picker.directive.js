'use strict';

angular.module('drawMeAMamutApp')
  .directive('colorPicker', function () {
    
    var asColor = [
      'rgb( 27, 154, 247)',
      'rgb( 85, 218, 225)',
      'rgb( 73, 232,  69)',
      'rgb(165, 222,  55)',
      'rgb(255, 212,  38)',
      'rgb(254, 174,  27)',
      'rgb(252, 136,  15)',
      'rgb(253, 102,  49)',
      'rgb(255,  67,  81)',
      'rgb(237,  70, 148)',
      'rgb(219,  73, 216)',
      'rgb(123, 114, 233)'
    ]
    var iNbColor = 5;

    var getGrayColor = function() {
      var oColor = tinycolor('#000');
      var asResult = [oColor.toHexString()];
      for(var i = 1; i < 10; i++) {
        asResult.push(oColor.lighten(11).toHexString());
      }
      return asResult;
    }

    var getColorArray = function(sColor) {
      var oColor = tinycolor(sColor);
      var fColorLight = oColor.getBrightness();
      var fLightStep = Math.round(100 * (255 - fColorLight) / (255 * iNbColor)) - 1;
      var asResult = [oColor.toHexString()];
      for(var i = 1; i < iNbColor; i++) {
        asResult.push(oColor.lighten(fLightStep).toHexString());
      }
      return asResult;
    }

    return {
      templateUrl: 'app/color-picker/color-picker.html',
      restrict: 'E',
      scope: {
        sDrawColor : '=color'
      },

      link: function (scope, element, attrs) {

        scope.asColor = _.flatten(getGrayColor().concat(_.map(asColor, getColorArray)));

        scope.getSelectedColor = function() {
          return {
            'background-color' : scope.sDrawColor
          };
        };

        scope.onClick = function($event) {
          element.find('.color').removeClass('selected');
          $($event.currentTarget).addClass('selected');
          var sColor = $($event.currentTarget).data('color');
          scope.sDrawColor = sColor;
        };

      }
    };
  });