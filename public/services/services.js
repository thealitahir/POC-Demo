/**
 * Created by Tahir on 10/24/2015.
 */
angular.module('services').factory('dataService',['$http', function ($http) {
    return{
        /*--------------Explorer-------------------*/
        IncomeRange : function () {
            var url='graphs/IncomeRange/';
            return $http.get(url);
        },
        IncomeVerifiable : function () {
            var url='graphs/IncomeVerifiable/';
            return $http.get(url);
        },
        DebtToIncomeRatio : function () {
            var url='graphs/DebtToIncomeRatio/';
            return $http.get(url);
        },
        BorrowerRating : function () {
            var url='graphs/BorrowerRating/';
            return $http.get(url);
        },
        ListingCategory : function () {
            var url='graphs/ListingCategory/';
            return $http.get(url);
        },
        BorrowerRate : function () {
            var url='graphs/BorrowerRate/';
            return $http.get(url);
        },
        LengthOfLoan : function () {
            var url='graphs/LengthOfLoan/';
            return $http.get(url);
        },
        BorrowersPerState : function () {
            var url='graphs/BorrowersPerState/';
            return $http.get(url);
        },
        GetExplorationData : function(){
            var url='graphs/GetExplorationData/';
            return $http.get(url);
        },
        GetBorrowerDetails : function(){
            var url='graphs/GetBorrowerDetails/';
            return $http.get(url);
        },
        averageYield: function () {
            var url='averageYield/';
            return $http.get(url);
        },
        YieldPredictor:function(){
            var url='/YieldPredictor';
            return $http.get(url)
        },
        RatingPredictor:function() {
            var url = '/RatingPredictor';
            return $http.get(url)
        },

        /*--------------Stats-------------------*/
        LendersYield: function () {
            var url='stats/LendersYield/';
            return $http.get(url);
        },
        LendersYieldForDifferentTerms: function () {
            var url='stats/LendersYieldForDifferentTerms/';
            return $http.get(url);
        },
        YieldVsDebt_to_Income: function () {
            var url='stats/YieldVsDebt_to_Income/';
            return $http.get(url);
        },
        YieldVsRating: function () {
            var url='stats/YieldVsRating/';
            return $http.get(url);
        },

        ///////////////////////////////////////////portfolio servicec/////////////////////////////////////
        getPortfolio: function () {
            var url='stats/getPortfolio/';
            return $http.get(url);
        }
        ,
        getPortfolioWithInput: function (amount, range) {
            var url='stats/getPortfolioWithInput?amount='+amount+'&range='+range;
            return $http.get(url);
        },
        getUsMapData: function () {
            var url='graphs/getUsMapData';
            return $http.get(url);
        }
    }
}]);
