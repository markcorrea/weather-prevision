(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngResource',
            'app.modules',
            'app.modules.cities',
            'app.services',
            'ui.bootstrap',
            'chart.js'
        ]);

    //angular.module('app.services', []);
}());