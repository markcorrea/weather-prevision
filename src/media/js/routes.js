(function() {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: '/',
                    onEnter: ['$state', '$timeout', function ($state, $timeout) {
                        $state.go('modules.cities');
                    }]
                });
        }]);
}());