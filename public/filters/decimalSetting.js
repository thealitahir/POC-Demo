
angular.module('filters').filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;

        return Math.round(input * 100) / 100;
    };
});
