(function () {
    'use strict';

    function getMockURL() {
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

        $private.setUrlMockDefault = function (afterURL) {
            afterURL = afterURL || '';
            $private.API = $resource(getMockURL() + afterURL, {}, defaultOptionsResource());
        };

        //
        // Serviço que retorna um JSON com todos os estados.
        //
        $public.getStates = function () {
            var deferred = $q.defer();

            $private.setUrlMockDefault('states.json');

            $private.API.get().$promise.then(function (result) {
                deferred.resolve(result);
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        //
        // Serviço que retorna um JSON com todas as cidades, a partir do estado selecionado.
        //
        $public.getCitiesByStateValue = function (options) {
            var deferred = $q.defer();

            $private.setUrlMockDefault('states/cities-' + options.state + '.json');

            $private.API.get().$promise.then(function (result) {
                deferred.resolve(result);
            }, function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        return $public;
    }

    angular.module('app.services').factory('CitiesService', CitiesService);
}());