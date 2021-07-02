var app = angular.module('chatApp', ['firebase']);

app.controller('ChatController', function($scope, $firebaseArray) {

    var ref = firebase.database().ref().child('messages');
    $scope.messages = $firebaseArray(ref);

    var now = Date.now();
var cutoff = now - 3 * 60 * 60 * 1000;
var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
var listener = old.on('child_added', function(snapshot) {
    snapshot.ref.remove();
});

    $scope.send = function() {
        $scope.messages.$add({
            name: $scope.nameText,
            message: $scope.messageText,
            date: Date.now()
        })
        
        $scope.messageText = null;
    }


})

