(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('InterceptorService', InterceptorService);

    InterceptorService.$inject = ['$q', '$injector', 'LoaderService'];

    function InterceptorService($q, $injector, LoaderService) {

        var $http, $state;

        return {
            // optional method
            'request': function (config) {

                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');

                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    LoaderService.showLoader();
                }

                return config;
            },

            // optional method
            'requestError': function () {
                // do something on error
                //console.log('interceptor request error');
                return $q.reject({});
            },

            // optional method
            'response': function (response) {

                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                $state = $state || $injector.get('$state');

                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    LoaderService.hideLoader();
                }

                // do something on success
                return response;
            },

            // optional method
            'responseError': function (a) {

                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');

                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    LoaderService.hideLoader();
                }

                //console.log('interceptor response error');

                return $q.reject({});
            }
        };
    }
})();

