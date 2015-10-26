'use strict';

/**
 * @ngdoc overview
 * @name boardgameApp
 * @description
 * # boardgameApp
 *
 * Main module of the application.
 */
angular
  .module('boardgameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'Game',
    'Grid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .controller('GameController', function(GameManager) {
    this.game = GameManager;


  this.newGame = function(players, gameSize, questions) {
    this.game.newGame(teams, gameSize, questions);
  };

  // MAIN :
  var teams = [
    {name:'Heroes', color:'#199E8F', img:'spiderman.png', winImg: 'spidey_big.png'}, //spidey.png
    {name:'Vilains', color:'#9E1928', img:'venom2.png', winImg: 'venom_big.png'}
  ];

  var questions = [
    {title: 'title', question: 'The question ...', type: 'single'},
    {title: 'title2', question: 'The question2 ...', type: 'single'},
    /*{title: 'title3', question: 'The question3 ...', type: 'multi'},
    {title: 'title4', question: 'The question4 ...', type: 'multi'},
    {title: 'title5', question: 'The question5 ...', type: 'multi'},
    {title: 'title6', question: 'The question6 ...', type: 'multi'},
    {title: 'title7', question: 'The question7 ...', type: 'multi'},
    {title: 'title8', question: 'The question8 ...', type: 'multi'},
    {title: 'title9', question: 'The question9 ...', type: 'multi'},
    {title: 'title10', question: 'The question10 ...', type: 'multi'},
    {title: 'title11', question: 'The question11 ...', type: 'multi'},
    {title: 'title12', question: 'The question12 ...', type: 'multi'},
    {title: 'title13', question: 'The question13 ...', type: 'multi'},
    {title: 'title14', question: 'The question14 ...', type: 'multi'},
    {title: 'title15', question: 'The question15 ...', type: 'multi'},*/
  ];
  var size = 10;

  this.newGame(teams, size, questions);

  // Changing background ! (I love it ♡♡♡)
  // Note : The buffer is changed twice, 
  //(there is a "buffer" background on html and a real background on #global-container)
  var setBackground = function(i,nbCalled){
    var timeInterval = 20000; // ms
    var halfInt = timeInterval / 2;

    if(nbCalled % 2 === 0){
      document.getElementsByTagName('body')[0].style.backgroundImage = 'url(\'images/background'+i+'.jpg\')';
      window.setTimeout(function(){ setBackground(((i+1)%20), nbCalled+1); }, halfInt);
    }
    else {
      document.getElementsByTagName('html')[0].style.backgroundImage = 'url(\'images/background'+i+'.jpg\')';
      window.setTimeout(function(){ setBackground(((i)%20), nbCalled+1); }, halfInt);
    }
  };

  setBackground(0,0);
});
