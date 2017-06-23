/**
 * Created by marcus on 6/22/17.
 */
(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('filterTemp', ['$filter', filterTemp]);

    //
    // Recebe o formato da temperatura, dando a ele apenas um decimal, quando necessário;
    //
    function filterTemp($filter) {
        return function (temp) {
            return parseFloat(temp).toFixed(1);
        };
    }

})();
