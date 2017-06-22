(function () {
    'use strict';

    angular
        .module('app.modules', ['ui.router', 'app.modules.cities.controllers'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('modules', {
                    idRoute: 'modules',
                    parent: '',
                    url: "",
                    views: {
                        'app.body': {
                            templateUrl: 'app/modules/modules-body.html'
                        }
                    },
                    abstract: true
                });
        }]);
}());