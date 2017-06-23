(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngResource',
            'app.directive.loader',
            'app.modules',
            'app.modules.cities',
            'app.services',
            'app.filters',
            'ui.bootstrap',
            'chart.js'
        ]);

    angular
        .module('app')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('InterceptorService');
        }]);

    angular.module('app.services', []);
    angular.module('app.filters', []);
}());