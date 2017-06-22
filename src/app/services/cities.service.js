(function () {
   'use strict';

    function getAPIURL() {
        return 'mocks/';
    }

    function defaultOptionsResource() {
        return {
            'update': {method: 'PUT'}
        }
    }

    function CitiesService($resource, $q) {

        var $public = {};
        var $private = {};

        $private.setUrlAPIDefault = function (afterURL) {
            afterURL = afterURL || '';
            $private.API = $resource(getAPIURL() + afterURL, {}, defaultOptionsResource());
        };

        $public.getStates = function () {
            var deferred = $q.defer();

            $private.setUrlAPIDefault('states.json');

            $private.API.get().$promise.then(function (result) {
                if (result.status === 'success') {
                    deferred.resolve(result);
                } else {
                    deferred.reject(result);
                }
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        $public.getCitiesByStateId = function (options) {
            var deferred = $q.defer();

            $private.setUrlAPIDefault('states/' + options.id + '.json');

            $private.API.get().$promise.then(function (result) {
               if (result.status === 'success') {
                   deferred.resolve(result);
               } else {
                   deferred.reject(result);
               }
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        $public.getSelectedCities = function (options) {
            var deferred = $q.defer();

            $private.setUrlAPIDefault('selected-cities.json');

            $private.API.get().$promise.then(function (result) {
                if (result.status === 'success') {
                    deferred.resolve(result);
                } else {
                    deferred.reject(result);
                }
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        $public.getCityById = function (options) {
            var deferred = $q.defer();

            $private.setUrlAPIDefault('cities/' + options.id + '.json');

            $private.API.get().$promise.then(function (result) {
                if (result.status === 'success') {
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

    angular.module('app.services', []).factory('CitiesService', CitiesService);
}());