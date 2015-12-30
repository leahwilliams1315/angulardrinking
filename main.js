var app = angular.module('app', ['ngMaterial']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});

app.controller('ctrl', function($scope, $http, $mdDialog){

  $scope.categories = ['Wine','Beer','Spirits','Cider','Sparkling Wine','Liquer'];



$scope.openDrink = function(ev, drink){


    $mdDialog.show({
          controller: function($scope){
            $scope.drink = drink;

          },
          templateUrl: 'Templates/drink.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
}

$scope.searchDrinks = function(queryString){
  getDrinks(queryString)
    .then(function(result){
      return result.data.data;
  }).then(function(drinks){
      $scope.list = drinks;
  })
}

function getDrinks(queryString){
    return $http.get('https://lcboapi.com/v2/products', {
      headers: { 'Authorization': 'Token MDo4YjkwYTEwNC1hY2NkLTExZTUtYjllYi02YmFhZTcxMzUxYTk6c3Y4MUk4SGEzdTJIM2tGaG5BY0ZzbmVFZEUyMTVrd2tZUGhh' },
      params: {
        q: queryString

      }})
}

});

    //
    //
    // $.ajax('http://food2fork.com/api/search', {
    //   data: {
    //   key: '3e0ff2983607fdcc8476627e4065dfca',
    //   q: qstring
    // }})
