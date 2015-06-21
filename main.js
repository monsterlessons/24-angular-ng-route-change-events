var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/posts', {
      controller: 'postsCtrl',
      templateUrl: 'posts.html'
    })
    .when('/posts/:postId', {
      controller: 'postCtrl',
      templateUrl: 'post.html'
    });
});

app.run(function ($rootScope) {
  console.log('run');
  $rootScope.$on('$routeChangeStart', function (event, current, previous, reject) {
    console.log('changestart', arguments);
  });

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous, reject) {
    console.log('changesuccess', arguments);
    $rootScope.currentPath = current.$$route.originalPath;
  });
});

app.controller('pathCtrl', function () {

});

app.controller('HomeCtrl', function ($scope) {
  console.log('HomeCtrl');
  $scope.model = {
    message: 'This is my homepage'
  };
});

app.controller('postsCtrl', function ($scope, postsFactory) {
  console.log('postsCtrl');
  $scope.posts = postsFactory;
});

app.controller('postCtrl', function ($scope, $routeParams, postsFactory) {
  var postId = Number($routeParams.postId);
  $scope.post = _.findWhere(postsFactory, {id: postId});

});

app.factory('postsFactory', function () {
  return [
    {
      id: 1,
      name: 'Why AngularJS is good?'
    },
    {
      id: 2,
      name: 'I love AngularJS'
    },
    {
      id: 3,
      name: 'Is AngularJS easy to learn?'
    }
  ];
});