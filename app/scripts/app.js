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
    'Grid',
    'Pager'
  ])
  .constant('_', _)
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
     // Couvertures trouver les têtes
     // Frises chrono
     // Questions générales sur les comics : nb pages (22-24) (QCM) 15 22 30 48 64 
     // QG: auteur Stan lee, Jack Kirby, Joe Simon
     // QG: Comic code authority : 
     // Name of one magazine : Strange, Titans, Special Strange, Nova, Spidey ...
  var questions = [   
    {
      title: 'X-men', 
      question: 'Find at least 3 of the 6 founders of the X-Men. \
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for 3 members found. <br /> \
                  &nbsp;&nbsp;&nbsp; - <strong>2pts.</strong> for all the members \
                </div>', 
      answer: ['<p>The 6 founders are: </p>\
                <ul style="margin: auto; width: 400px;">\
                  <li>Beast</li>\
                  <li>Cyclops</li>\
                  <li>Marvel Girl (Jean Grey)</li>\
                  <li>Iceman</li>\
                  <li>Angel (Archangel)</li>\
                  <li>Professor X (Charle Xavier)</li>\
                </ul>',
               '<img src="images/xmen_founders.jpg" \
                     alt="founders of the xmen." \
                     style="width: 300px; display:block; margin: auto; margin-top: -50px;" />'
              ], 
      type: 'single', 
      points: [1,2]
    },
    
    {
      title: 'Brotherhood of Evil Mutants', 
      question: 'Find at least 3 of the 5 Brotherhood of Evil Mutants\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for 3 members found. <br /> \
                  &nbsp;&nbsp;&nbsp; - <strong>2pts.</strong> for all the members \
                </div>', 
      answer: ['<p>The 5 founders are: </p>\
                <ul style="margin: auto; width: 400px;">\
                  <li>Magneto</li>\
                  <li>Toad</li>\
                  <li>Quicksilver</li>\
                  <li>Scarlet Witch</li>\
                  <li>Mastermind</li>\
                </ul> ',
               '<img src="images/the_brotherhood_of_evil_mutants.jpg" \
                     alt="Founders of the Brotherhood of Evil Mutants." \
                     style="width: 400px; display:block; margin: auto; margin-top: -50px;" />'
              ], 
      type: 'single', 
      points: [1,2]
    },
    {
      title: 'Avengers', 
      question: 'Find at least 3 of the 6 Avengers\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for 3 members found. <br /> \
                  &nbsp;&nbsp;&nbsp; - <strong>2pts.</strong> for all the members \
                </div>', 
      answer: ['<p>The 6 founders are: </p>\
                <ul style="margin: auto; width: 400px;">\
                  <li>Iron Man</li>\
                  <li>Thor</li>\
                  <li>Ant-man</li>\
                  <li>Wasp</li>\
                  <li>Hulk</li>\
                  <li>Captain America</li>\
                </ul>',
               '<img src="images/avengers3.jpg" \
                     alt="Founders of the avengers." \
                     style="width: 350px; display:block; margin: auto; margin-top: -50px;" />'
              ], 
      type: 'single', 
      points: [1,2]
    },
    {
      title: 'Sinister Six', 
      question: 'Find at least 3 of the 6 Sinister Six.\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for 3 members found. <br /> \
                  &nbsp;&nbsp;&nbsp; - <strong>2pts.</strong> for all the members \
                </div>', 
      answer: ['<p>The 5 founders are: </p>\
                <ul style="margin: auto; width: 400px;">\
                  <li>Doctor Octopus (leader)</li>\
                  <li>Electro</li>\
                  <li>Kraven the Hunter</li>\
                  <li>Mysterio (Quentin Beck)</li>\
                  <li>Sandman</li>\
                  <li>Vulture (Adrian Toomes)</li>\
                </ul>',
               '<img src="images/sinister_six.jpg" \
                     alt="founders of the xmen." \
                     style="width: 500px; display:block; margin: auto; margin-top: -50px;" />'
              ], 
      type: 'single', 
      points: [1,2]
    },
    {
      title: 'Timeline', 
      question: 'Place the items at the right place on the timeline.<br /><br />\
                  <img style="display: block; margin: auto;" src="images/timeline2.png" alt="timeline" /> \
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for 2 heroes well placed. <br /> \
                  &nbsp;&nbsp;&nbsp; - <strong>2pts.</strong> for all the heroes well placed. \
                </div>', 
      answer: ['<img src="images/timeline2.jpg" \
                     alt="Timeline." \
                     style="width: 500px; display:block; margin: auto; margin-top: -50px;" />'
              ], 
      type: 'single', 
      points: [1,2]
    },
    {
      title: 'Timeline', 
      question: 'Place the items at the right place on the timeline.<br /><br />\
                  <img style="display: block; margin: auto;" src="images/timeline2.png" alt="timeline" /> \
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for 2 heroes well placed. <br /> \
                  &nbsp;&nbsp;&nbsp; - <strong>2pts.</strong> for all the heroes well placed. \
                </div>', 
      answer: ['<img src="images/timeline2.png" \
                     alt="Timeline." \
                     style="width: 500px; display:block; margin: auto; margin-top: -50px;" />'
              ], 
      type: 'single', 
      points: [1,2]
    },
  {
      title: 'Find the super hero', 
      question: 'The heads on the comics covers have been hidden.<br /> \
                  Will you be able to find the super hero ?<br /><br /> \
                  <strong style="display: block; text-align: center;"> \
                    Give the names of the 2 mysterious heroes. \
                  </strong><br />\
                  <img style="display: block; margin: auto; width: 150px; transform: rotate(10deg);" src="images/find_the_head.png" alt="timeline" /> \
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> per hero found. <br /> \
                </div>', 
      answer: ['<figure style="display:block; margin-top: -50px; float: left;"> \
                  <img src="images/marry_jane.jpg" alt="Timeline." style="width: 200px; box-shadow: 3px 3px 2px rgba(0,0,0,.6);" />\
                  <figcaption>Marry Jane</figcaption> \
                </figure> \
                <figure style="display:block; position: relative; left: 50px;  margin-top: -50px;"> \
                  <img src="images/marry_jane.jpg" alt="Timeline." style="width: 200px; box-shadow: 3px 3px 2px rgba(0,0,0,.6);" />\
                  <figcaption>Marry Jane</figcaption> \
                </figure> \
                <div style="clear: both;"></div>'
              ], 
      type: 'single', 
      points: [1,2]
    },
    {
      title: 'Find the super hero', 
      question: 'The heads on the comics covers have been hidden.<br /> \
                  Will you be able to find the super hero ?<br /><br /> \
                  <strong style="display: block; text-align: center;"> \
                    Give the names of the 2 mysterious heroes. \
                  </strong><br />\
                  <img style="display: block; margin: auto; width: 150px; transform: rotate(10deg);" src="images/find_the_head.png" alt="timeline" /> \
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> per hero found. <br /> \
                </div>', 
      answer: ['<figure style="display:block; margin-top: -50px; float: left;"> \
                  <img src="images/marry_jane.jpg" alt="Timeline." style="width: 200px; box-shadow: 3px 3px 2px rgba(0,0,0,.6);" />\
                  <figcaption>Marry Jane</figcaption> \
                </figure> \
                <figure style="display:block; position: relative; left: 50px;  margin-top: -50px;"> \
                  <img src="images/marry_jane.jpg" alt="Timeline." style="width: 200px; box-shadow: 3px 3px 2px rgba(0,0,0,.6);" />\
                  <figcaption>Marry Jane</figcaption> \
                </figure> \
                <div style="clear: both;"></div>'
              ], 
      type: 'single', 
      points: [1,2]
    },
    {
      title: 'Number of page per comic ?',
      question: 'Guess the average number of pages in a US comic ? <br />\
                <form style="display: block; width: 200px; margin: auto;"> \
                  <input type="radio" /> 16 ?<br /> \
                  <input type="radio" /> 22 ?<br /> \
                  <input type="radio" /> 30 ?<br /> \
                  <input type="radio" /> 48 ?<br /> \
                  <input type="radio" /> 64 ?<br /> \
                </form>\
                <div class="alert alert-warning" role="alert"> \
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> \
                  <strong>Warning!</strong> The first team which gives the correct answer wins ! <br />\
                </div>\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for the first correct answer. <br /> \
                </div>', 
      answer: 'US comic have between <strong>22</strong> and <strong>24</strong> pages.',
      type: 'multi'
    },
    {
      title: 'Famous comic authors',
      question: 'Give the name of a famous comic author.<br />\
                <div class="alert alert-warning" role="alert"> \
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> \
                  <strong>Warning!</strong> The first team which gives the correct answer wins ! <br />\
                </div>\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for the first correct answer. <br /> \
                </div>', 
      answer: 'The most famous comic authors are Stan lee, Jack Kirby, Joe Simon ...\
              <img src="images/authors.png" \
                     alt="Comic authors." \
                     style="width: 500px; display:block; margin: auto; margin-top: 20px;" />',
      type: 'multi'
    },
    {
      title: 'Comics exportation',
      question: 'In France, comics are published in different magazines.<br />\
                Can you give the name of one of these magazines ?\
                <div class="alert alert-warning" role="alert"> \
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> \
                  <strong>Warning!</strong> The first team which gives the correct answer wins ! <br />\
                </div>\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for the first correct answer. <br /> \
                </div>', 
      answer: 'The french comic-magazines are : Strange, Special Strange, Titans, Nova, Spidey ...\
              <img src="images/magazines.png" \
                     alt="French magazines." \
                     style="width: 500px; display:block; margin: auto; margin-top: 10px;" />',
      type: 'multi'
    },
    {
      title: 'Why ?',
      question: 'TODO.<br />\
                <div class="alert alert-warning" role="alert"> \
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> \
                  <strong>Warning!</strong> The first team which gives the correct answer wins ! <br />\
                </div>\
                <div class="alert alert-info" role="alert"> \
                  <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> \
                  <strong>Score:</strong> <br />\
                  &nbsp;&nbsp;&nbsp; - <strong>1pt.</strong> for the first correct answer. <br /> \
                </div>', 
      answer: 'The french comic-magazines are : Strange, Special Strange, Titans, Nova, Spidey ...<br />\
              <img src="images/magazines.png" \
                     alt="French magazines." \
                     style="width: 500px; display:block; margin: auto; margin-top: 10px;" />',
      type: 'multi'
    },
    // TODO: the timelines
    // TODO: Slide why? with the question
    // TODO HERE : 4 or 5 more questions :

    // TODO IRL: Find explanations and documentation about marvel
    //           Find the 4 comic covers
    // 


         // Questions générales sur les comics : nb pages (22-24) (QCM) 15 22 30 48 64 
     // QG: auteur Stan lee, Jack Kirby, Joe Simon
     // QG: Comic code authority : 
     // Name of one magazine : Strange, Titans, Special Strange, Nova, Spidey ...
  ];
  /*
  {title: 'title2', question: 'The question2 ...', answer: ['<strong>This is my answer</strong>', 'answer part 2'], type: 'single', points: 2},
    {title: 'title3', question: 'The question3 ...', answer: '<strong>This is my answer</strong>', type: 'multi', points: [3]},
  */

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
