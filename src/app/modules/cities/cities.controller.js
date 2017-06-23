(function () {
    'use strict';

    function citiesViewCtrl($scope, $stateParams, CitiesService, WeatherService) {
        $scope.dailyForecast = [];

        CitiesService.getCityById({"id": "1"}).then(function (result) {
            $scope.city = result.data;
        });

        $scope.getForecast = function () {
            WeatherService.getWeatherByCityName({"city": "blumenau"}).then(function (result) {
                $scope.dailyForecast = getNextSixDays(result.list);
                $scope.maxmin = getMaximumAndMinimumTemperature($scope.dailyForecast);
                $scope.beachRecommendation = getNextWeekendBeachPrevision($scope.dailyForecast);
                initChart($scope.dailyForecast);
                console.log($scope.dailyForecast);
            });
        };

        $scope.getForecast();

        var initChart = function (list) {
            $scope.labels = [];
            $scope.series = ['Temperatura'];
            $scope.data = [];

            for (var i = 0; i < list.length; i++) {
                $scope.labels.push($scope.getDayOfTheWeek(list[i].dt).short);
                $scope.data.push(list[i].temp.day);
            }

            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{yAxisID: 'y-axis-1'}];
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
        };


        //
        //Formata a lista das previsões dos próximos dias para exibir apenas seis;
        //
        var getNextSixDays = function (list) {
            var resultList = [];
            for (var i = 0; i < 6; i++) {
                resultList.push(list[i]);
            }
            return resultList;
        };

        //
        //Verifica temperatura máxima e mínima para o período exibido;
        //
        var getMaximumAndMinimumTemperature = function (list) {
            var temp = {max: 0, min: 0, daymax: "", daymin: ""};
            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    //console.log(1, list[i]);
                    if (i == 0) {
                        temp.max = list[i].temp.max;
                        temp.min = list[i].temp.min;
                        temp.daymax = list[i].dt;
                        temp.daymin = list[i].dt;
                    }

                    if (list[i].temp.max > temp.max) {
                        temp.max = list[i].temp.max;
                        temp.daymax = list[i].dt;
                    }

                    if (list[i].temp.min < temp.min) {
                        temp.min = list[i].temp.min;
                        temp.daymin = list[i].dt;
                    }
                }
            }
            return temp;
        };

        //
        // Recebe a data em formato timestamp e verifica o dia da semana correspondente;
        // Ao chamar a função, à frente do retorno deve ser informado formato .short (curto) ou .long(longo);
        // Exemplo: etc = $scope.getDayOfTheWeek(12345678).short;
        //
        $scope.getDayOfTheWeek = function (timestamp) {
            var weekDays = [
                {short: "Dom", long: "domingo"},
                {short: "Seg", long: "segunda-feira"},
                {short: "Ter", long: "terça-feira"},
                {short: "Qua", long: "quarta-feira"},
                {short: "Qui", long: "quinta-feira"},
                {short: "Sex", long: "sexta-feira"},
                {short: "Sab", long: "sábado"}
            ];
            var d = new Date(timestamp * 1000);
            return weekDays[d.getDay()];
        };


        var getNextWeekendBeachPrevision = function (list) {
            var prevision = {};
            for (var i = 0; i < list.length; i++) {
                var d = new Date((list[i].dt) * 1000);
                if (d.getDay() == 6) {
                    prevision = list[i];
                    prevision.isGood = (prevision.temp.day > 25 && prevision.weather[0].id == 800);
                }
            }

            return prevision;
        };

        $scope.setWeatherIcon = function (code) {
            return "http://openweathermap.org/img/w/" + code + ".png";
        };
    }

    angular.module('app.modules.cities.controllers', [])
        .controller("citiesViewCtrl", citiesViewCtrl);
}());