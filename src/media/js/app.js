(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngResource',
            'app.modules',
            'app.modules.cities',
            'app.services.cities',
            'app.services.weather',
            'app.filters',
            'ui.bootstrap',
            'chart.js'
        ]);

    //angular.module('app.services', []);
    angular.module('app.filters', []);
}());