(function () {

    var module = angular.module("horseRaceApp");

    var horseController = function ($scope, $interval, random) {

        function Horse(horseName) {

            var name = "";
            if (horseName) {
                name = horseName;
            };

            var isWinner = false;
            var position = 0;

            var run = function () {
                var move = random.next(1, 5);

                if (position + move >= $scope.maxValue) {
                    position = $scope.maxValue;
                    isWinner = true;
                }
                else {
                    position += move;
                }
            };

            return {
                name: name,
                isWinner: isWinner,
                position: position,
                run: run
            };
        };

        $scope.addHorse = function (horseName) {
            if (horseName) {
                $scope.horses.push(new Horse(horseName));
                $scope.horseName = "";
            }
        };

        var intervalWatcher = undefined;
        var onRun = function () {
            var winners = [];
            for (var i = 0; i <= $scope.horses.length; i++) {
                var horseRun = $scope.horses[i];
                horseRun.run();

                if (horseRun.position >= $scope.maxValue) {
                    horseRun.isWinner = true;
                    winners.push(horseRun);
                };
            };

            if (winners.length != 0 && angular.isDefined(intervalWatcher)) {
                $interval.cancel(intervalWatcher);
                intervalWatcher = undefined;
            };
        };
        $scope.startRace = function () {

            if (angular.isDefined(intervalWatcher) || $scope.horses.length == 0) {
                return;
            };

            intervalWatcher = $interval(onRun, 50);
        };

        $scope.maxValue = 500;
        $scope.horses = [];

    };

    module.controller("horseController", horseController);

}());