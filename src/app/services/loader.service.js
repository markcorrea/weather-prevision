(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('LoaderService', LoaderService);

    LoaderService.$inject = ['$rootScope'];

    function LoaderService ($rootScope) {

        var $public = {};
        var $private = {};

        $public.showLoader = function (){
            $rootScope.classLoader = 'show';
        };

        $public.hideLoader = function (){
            $rootScope.classLoader = '';
        };

        return $public;
    }
})();
