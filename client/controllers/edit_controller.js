var app = angular.module('app');

//To hit this controller and parital, try going to 'http://localhost:8000/#/edit/imatest' to see $routeParams update wiht a new _id property

app.controller('editController',
[
    '$scope',
    '$routeParams', //note that we are using $routeParams because in angular routes we indicated that a string will be sent through the url via the _id porperty.
    //(from app.js $routeProvider.when('/edit/:_id'...) function)
    'friendsFactory',
    function($scope, $routeParams, friendsFactory){//if injected above doen't forget to add in as an arguement
    console.log('editController loaded');
    console.log('$routeParams currently looks like this:', $routeParams);
    var self = this;
    self.currentFriend = {};
    //get a freidns from the factory, this is a one time thing when we load this partial so we didn't set a variable so we could reuse it. We just run the friendsFactory method directly.

        var findFriend = function(){
            friendsFactory.getFriend($routeParams._id, function(factoryData){
                console.log('looking for friend with id of:', $routeParams._id)
                self.currentFriend = factoryData;
            });
            //not much to write here until we are able to find individual friends to edit.
        }
        findFriend();
        //OUR $scope.update function goes here <-- $scope because we need to access this method with ng-submit or ng-click (from teh form in teh previous assignment). Want to see all of the friends when we get back including the updated on? See index in the previous controller.
        self.update = function(){
            if (!self.currentFriend.name || !self.currentFriend.favoriteLanguage){
                console.log("not going to factory because missing name and/or favorite language or is empty string");
                return;
            }
            friendsFactory.update(self.currentFriend, function(return_data){
                console.log(return_data);
            });
        }
    }//close the function being passed into the controller
]//close the array of injected services + controller function
);//end the controller function invocation: ()
