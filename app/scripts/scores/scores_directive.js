angular.module('Scores')
.directive('scores', function() {
  return {
    restrict: 'A',
    /*require: 'ngModel',
    scope: {
      ngModel: '='
    },
    */
    controller: 'ScoresCtrl',
    templateUrl: 'scripts/scores/scores.html'
  };
});