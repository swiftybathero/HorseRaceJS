(function () {

    var module = angular.module("horseRaceApp");

    var randomService = function () {

        var next = function (min, max) {
            return randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        };

        return {
            next: next
        };
    };

    module.factory("random", randomService);

}());