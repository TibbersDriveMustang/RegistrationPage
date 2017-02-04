var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location){
      $rootScope.$on('$routeChangeError', function(event, next, previous, error){
            if(error == 'AUTH_REQUIRED'){
                  $rootScope.message = 'Woops, you need to login first';
                  $location.path('/login');
            }     //Auth Required
      })
}]);

myApp.config(['$routeProvider',function($routeProvider){
      $routeProvider
            .when('/login', {
                  templateUrl: 'views/login.html',
                  controller: 'RegistrationController'
            })
            .when('/register', {
                  templateUrl: 'views/register.html',
                  controller: 'RegistrationController'                  
            })
            .when('/success', {
                  templateUrl: 'views/success.html',
                  controller: 'SuccessController',
                  //reslove: provide this route path only if resolve is true
                  resolve:{
                        currentAuth: function(Authentication){
                              return Authentication.requireAuth();
                        }     //currentAuth
                  }     //resolve
            })            
            .otherwise({
                  redirectTo: '/login'
            });
}]);