(function () {
    'use strict';

    angular
        .module('app.modules.cities', ['ui.router', 'app.modules.cities.controllers', 'app.services'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('modules.cities', {
                    url: '/cities',
                    views: {
                        'app.modules.content': {
                            templateUrl: 'app/modules/cities/views/list.html',
                            controller: 'citiesCtrl'
                        }
                    }
                })
                .state('modules.view', {
                    url: '/details/:id',
                    views: {
                        'app.modules.content': {
                            templateUrl: 'app/modules/cities/views/view.html',
                            controller: 'citiesViewCtrl'
                        }
                    }
                });
        }]);
}());