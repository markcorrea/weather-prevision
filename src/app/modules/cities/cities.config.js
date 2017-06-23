(function () {
    'use strict';

    angular
        .module('app.modules.cities', ['ui.router', 'app.modules.cities.controllers', 'app.services.weather', 'app.services.cities'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('modules.cities', {
                    url: '',
                    views: {
                        'app.modules.content': {
                            templateUrl: 'app/modules/cities/views/view.html',
                            controller: 'citiesViewCtrl'
                        }
                    }
                });
        }]);
}());