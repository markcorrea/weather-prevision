(function () {
    'use strict';

    function citiesViewCtrl($scope, CitiesService, WeatherService, $timeout, $window) {
        $scope.dailyForecast = [];
        $scope.selectedState = "sc";
        $scope.selectedCity = "Blumenau";
        $scope.showDesktopCityList = false;
        $scope.favouriteCity = "";

        //
        // Verifica se já exite um favorito cadastrado. Caso haja, certifica-se que seja
        // o primeiro carregamento na tela.
        //
        if ($window.localStorage.getItem("city")) {
            $scope.favouriteCity = $window.localStorage.getItem("city");
            $scope.selectedState = "";
            $scope.selectedCity = $window.localStorage.getItem("city");
        }

        //
        // Serviço que retorna os estados e vincula à variável que preencherá o SELECT de estados.
        //
        CitiesService.getStates().then(function (result) {
            $scope.states = result.data;
        });

        //
        // Ao alterar o combo de estados, o helper de cidades é atualizado.
        //
        $scope.stateChange = function (state) {
            $scope.selectedCity = "";
            $scope.getCities(state);
        };

        //
        // Recebe o valor do estado e carrega o helper de cidades.
        //
        $scope.getCities = function (state) {
            CitiesService.getCitiesByStateValue({"state": state}).then(function (result) {
                $scope.cities = result.data;
            });
        };

        //
        // Recebe a cidade em formato String e acessa a API, retornando a previsão dos próximos dias.
        // Os valores para cada box apresentado na tela são tratados e atribuídos separadamente em variáveis
        // distintas.
        //
        $scope.getForecast = function (city) {
            WeatherService.getWeatherByCityName({"city": formatCityString(city)}).then(function (result) {
                $scope.cityForecast = result;
                $scope.dailyForecast = getNextSixDays(result.list);
                $scope.maxmin = getMaximumAndMinimumTemperature($scope.dailyForecast);
                $scope.beachRecommendation = getNextWeekendBeachPrevision($scope.dailyForecast);
                initChart($scope.dailyForecast);
            });
        };

        //
        // Ao clicar no ícone de favorito, verifica se a cidade já não é o favorito atual. Caso seja,
        // remove esta cidade. Caso contrário, determina esta como a nova cidade favorita.
        //
        $scope.setAsFavourite = function (city) {
            if ($scope.favouriteCity == $scope.cityForecast.city.name) {
                $window.localStorage.removeItem("city");
                $scope.favouriteCity = "";
            } else {
                $window.localStorage.setItem("city", city);
                $scope.favouriteCity = $window.localStorage.getItem("city");
            }
        };

        //
        // Formata a String de entrada da cidade, substituindo espaços por traços longos e letras minúsculas.
        //
        var formatCityString = function (city) {
            return city.replace(" ", "_").toLowerCase();
        };

        //
        // Determina valor no textbox como sendo o valor passado no parâmetro.
        //
        $scope.setCity = function (city) {
          $scope.selectedCity = city;
        };

        //
        // Ao clicar no textbox de cidades, o helper com a listagem das cidades aparece.
        //
        $scope.cityFocus = function () {
            $scope.showDesktopCityList = true;
        };

        //
        // Ao retirar o foco do textbox de cidades, o helper é oculto novamente.
        //
        $scope.cityBlur = function () {
            $timeout(function () {
                $scope.showDesktopCityList = false;
            }, 160);
        };

        $scope.getCities($scope.selectedState);
        $scope.getForecast($scope.selectedCity);

        //
        // Recebe o parâmetro da lista dos próximos dias e insere os dados no gráfico para exibição.
        //
        var initChart = function (list) {
            $scope.labels = [];
            $scope.series = ['Temperatura'];
            $scope.data = [];

            for (var i = 0; i < list.length; i++) {
                $scope.labels.push($scope.getDayOfTheWeek(list[i].dt).short);
                $scope.data.push(list[i].temp.day);
            }

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
        // Formata a lista das previsões dos próximos dias para exibir apenas seis.
        //
        var getNextSixDays = function (list) {
            var resultList = [];
            for (var i = 0; i < 6; i++) {
                resultList.push(list[i]);
            }
            return resultList;
        };

        //
        // Verifica temperatura máxima e mínima para o período exibido.
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
        // Recebe a data em formato timestamp e verifica o dia da semana correspondente.
        // Ao chamar a função, à frente do retorno deve ser informado formato .short (curto) ou .long(longo).
        // Exemplo: etc = $scope.getDayOfTheWeek(12345678).short.
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

        //
        // Localiza o próximo final de semana e avalia se o tempo será favorável para praia.
        //
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

        //
        // Recebe o código do ícone por parâmetro e retorna a URL da API com o ícone.
        //
        $scope.setWeatherIcon = function (code) {
            return "http://openweathermap.org/img/w/" + code + ".png";
        };
    }

    angular.module('app.modules.cities.controllers', [])
        .controller("citiesViewCtrl", citiesViewCtrl);
}());