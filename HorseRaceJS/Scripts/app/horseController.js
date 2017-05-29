(function () {

    var module = angular.module("horseRaceApp");

    var horseController = function ($scope, $timeout, random) {

        function Horse(horseName) {

            var name = "";
            if (horseName) {
                name = horseName;
            };

            var isWinner = false;
            var position = 0;

            var run = function () {
                var move = random.next($scope.minRandom, $scope.maxRandom);

                if (this.position + move >= $scope.maxValue) {
                    this.position = $scope.maxValue;
                    this.isWinner = true;
                }
                else {
                    this.position += move;
                }
            };

            var contestantType = function () {
                if (this.isWinner == true) {
                    return "success";
                }
                else {
                    return null;
                };
            };

            var resetHorse = function () {
                this.position = 0;
                this.isWinner = false;
            };

            return {
                name: name,
                isWinner: isWinner,
                position: position,
                run: run,
                resetHorse: resetHorse,
                contestantType: contestantType
            };
        };

        $scope.addHorse = function (horseName) {
            if (horseName) {
                $scope.horses.push(new Horse(horseName));
                $scope.horseName = "";
            }
        };

        $scope.raceInProggress = false;
        var resetRace = function () {
            var isSetup = false;
            for (var i = 0; i < $scope.horses.length; i++) {
                if ($scope.horses[i].position != 0) {
                    $scope.horses[i].resetHorse();
                    isSetup = true;
                }
            }
            return isSetup;
        };

        $scope.timeoutWatcher = undefined;
        var onRun = function () {
            var winners = [];
            for (var i = 0; i < $scope.horses.length; i++) {
                $scope.horses[i].run();

                if ($scope.horses[i].position >= $scope.maxValue) {
                    $scope.horses[i].isWinner = true;
                    winners.push($scope.horses[i]);
                };
            };

            if (winners.length != 0 && angular.isDefined($scope.timeoutWatcher)) {
                $timeout.cancel($scope.timeoutWatcher);
                $scope.timeoutWatcher = undefined;
                $scope.raceInProgress = false;
            }
            else {
                $scope.timeoutWatcher = $timeout(onRun, $scope.timeoutInterval);
            };
        };
        $scope.startRace = function () {
            $scope.raceInProgress = true;
            if (angular.isDefined($scope.timeoutWatcher) || $scope.horses.length == 0) {
                return;
            };

            if (resetRace()) {
                $timeout($scope.startRace, 1000);
                return;
            };

            $scope.timeoutWatcher = $timeout(onRun, $scope.timeoutInterval);
        };

        $scope.resetHorses = function () {
            $scope.horses = [];
        };

        $scope.minRandom = 1;
        $scope.maxRandom = 15;
        $scope.timeoutInterval = 200;
        $scope.maxValue = 500;
        $scope.horses = [];

    };

    module.controller("horseController", horseController);

}());