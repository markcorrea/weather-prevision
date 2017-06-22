(function () {
    'use strict';

    function citiesCtrl($scope, CitiesService) {

        $scope.cities = [];
        $scope.selectedCities = [];

        CitiesService.getStates().then(function (result) {
            $scope.states = result.data;
        });

        CitiesService.getSelectedCities().then(function (result) {
            $scope.selectedCities = result.data;
        });

        $scope.setCity = function (state) {
            if (state) {
                CitiesService.getCitiesByStateId({"id": state.id}).then(function (result) {
                    var cities = result.data;

                    for (var j = 0; j < $scope.selectedCities.length; j++) {
                        for (var i = 0; i < cities.length; i++) {
                            if (cities[i].id === $scope.selectedCities[j].id) {
                                cities.splice(i, 1);
                            }
                        }
                    }

                    $scope.cities = cities;
                });
            }
        };

        $scope.addCity = function (city) {
            var exists = false;
            for (var i = 0; i < $scope.selectedCities.length; i++) {
                if (city.id === $scope.selectedCities[i].id) {
                    exists = true;
                }
            }

            if (!exists) {
                $scope.selectedCities.push(city);
                $scope.state = null;
                $scope.city = null;
            }
        };

        $scope.removeCity = function (selectedCities, index) {
            selectedCities.splice(index, 1);
            $scope.state = null;
            $scope.city = null;
        };
    }

    function citiesViewCtrl($scope, $stateParams, CitiesService) {
        CitiesService.getCityById({"id": $stateParams.id}).then(function (result) {
            $scope.city = result.data;
        });

        $scope.labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
        $scope.series = ['Temperatura'];
        $scope.data = [
            [20, 19, 21, 18, 22, 17]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };
    }

    angular.module('app.modules.cities.controllers', [])
        .controller("citiesCtrl", citiesCtrl)
        .controller("citiesViewCtrl", citiesViewCtrl);
}());