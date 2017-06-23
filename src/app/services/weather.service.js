(function () {
   'use strict';

    function getAPIURL(city) {
        return 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',br&units=metric&cnt=7&APPID=1dbf8be518c9378dab4765d100499d6c';
    }

    function defaultOptionsResource() {
        return {
            'update': {method: 'PUT'}
        }
    }

    function WeatherService($resource, $q) {

        var $public = {};
        var $private = {};

        $private.setUrlAPIDefault = function (city) {
            $private.API = $resource(getAPIURL(city), {}, defaultOptionsResource());
        };

        $public.getWeatherByCityName = function (options) {
            var deferred = $q.defer();

            $private.setUrlAPIDefault(options.city);

            $private.API.get().$promise.then(function (result) {
                if (result.cod === '200') {
                    deferred.resolve(result);
                } else {
                    deferred.reject(result);
                }
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        return $public;
    }

    angular.module('app.services.weather', []).factory('WeatherService', WeatherService);
}());