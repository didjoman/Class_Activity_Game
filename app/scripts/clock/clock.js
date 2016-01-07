"use strict";
angular.module('Clock', [])
.directive('clock', function() {
  return {
    restrict: 'E',
    controller: 'ClockCtrl',
    templateUrl: 'scripts/clock/clock.html'
  };
})
.controller('ClockCtrl', function($scope, $timeout) {
  /* Small timer */
  $scope.clock = ""; // initialise the time variable
  $scope.tickInterval = 1000 //ms
  $scope.beginTime = 0;

  var updateTimer = function() {
    var diff = (Date.now() - $scope.beginTime)/1000; // get the current time
    var hours = ("0" + parseInt(diff/3600)).slice(-2);
    var min = ("0" + parseInt((diff % 3600) / 60)).slice(-2);
    var sec = ("0" + parseInt(diff % 3600 % 60)).slice(-2);
    $scope.clock = hours+":"+min+":"+sec;
    $timeout(updateTimer, $scope.tickInterval); // reset the timer
  }

    // Start the timer
  var startTimer = function(){
    $scope.beginTime = Date.now();
    $timeout(updateTimer, $scope.tickInterval);
  }

  startTimer();

});

  