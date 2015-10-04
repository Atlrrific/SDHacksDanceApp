angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.Places;
  $http.get('http://localhost:8080/yelp' ).then(function(resp) {
    console.log('Success', resp);
    $scope.Places = resp.data.businesses;
    console.log(resp.data.businesses[0].name);

    console.log("TEST");
    console.log( $scope.Places[0].name);
    // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
  })

  
  console.log("TEST");
  console.log( $scope.Places);
  


  function createCORSRequest(method, url,data) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
      xhr.send(data);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
      xhr.send(data);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    return xhr;
  }
$scope.userEmail = 'ramon@yes.com';
 $scope.findMatch = function(place) {
    console.log(place);

    $scope.place = place;
    $scope.matchModal.show();
  };

  $scope.place ;
  // Form data for the login modal
  $scope.loginData = {};
  $scope.matchData = {};



  $scope.Match;
   // Perform the login action when the user submits the login form
  $scope.findTheMatch = function() {
    console.log('Doing login', $scope.matchData);

    // var xhr = createCORSRequest('POST', 'http://dancify.mybluemix.net/login',$scope.loginData);
    // if (!xhr) {
    //   throw new Error('CORS not supported');
    // }else{
    //   console.log(xhr);
    // }

    // console.log("Sending the data");
    // console.log($scope.matchData);

    $http.get('http://localhost:8080/matchesUser1').then(function(resp) {
    console.log('Success', resp);
     $scope.Match = resp;
    // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

    $scope.modal.hide();
  };






  // Perform the login action when the user submits the login form
  $scope.doMatch = function() {
    console.log('Doing login', $scope.matchData);

    // var xhr = createCORSRequest('POST', 'http://dancify.mybluemix.net/login',$scope.loginData);
    // if (!xhr) {
    //   throw new Error('CORS not supported');
    // }else{
    //   console.log(xhr);
    // }


    $scope.matchData.useremail = $scope.userEmail;

    $scope.matchData.eventid = $scope.place.id;
    console.log("Sending the data");
    console.log($scope.matchData);

    $http.post('http://localhost:8080/matchrequest', $scope.matchData).then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })

    $http.get('http://localhost:8080/matchrequest' ).then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

    $scope.modal.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeMatchModal = function() {
    $scope.modal.hide();
  };



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/matchModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.matchModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // var xhr = createCORSRequest('POST', 'http://dancify.mybluemix.net/login',$scope.loginData);
    // if (!xhr) {
    //   throw new Error('CORS not supported');
    // }else{
    //   console.log(xhr);
    // }

    $http.get('http://localhost:8080/matchrequest' ).then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


  // Form data for the advanced search modal
  $scope.advancedSearchData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/advancedSearch.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.searchModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAdvancedSearch = function() {
    $scope.searchModal.hide();
  };

  // Open the login modal
  $scope.advancedSearch = function() {
    $scope.searchModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doAdvancedSearch = function() {
    console.log('Doing advancedSearch', $scope.advancedSearchData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeAdvancedSearch();
    }, 1000);
  };

  

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
