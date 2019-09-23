/**
 * Created by Tahir on 10/20/2015.
 */
'use strict';
var webApp = angular.module('webApp',[
    'ui.router',
    'controllers',
    'directives',
    'services',
    'filters',
    'ui.bootstrap.datetimepicker',
    'easypiechart',
    'ui-rangeSlider'


]) .run(['$rootScope','dataService',
    function ($rootScope,dataService) {

        $rootScope.borrowerDetails = [];
       // dataService.GetBorrowerDetails().success(function (res) {
            $rootScope.borrowerDetails = exploration.GetBorrowerDetails.data.data;

        // });

        $rootScope.BorrowersPerState = [];
        $rootScope.statsData = [];
        $rootScope.debt_to_income_ratio_data = [];
        $rootScope.IncomeRange = [];
        $rootScope.DebtToIncomeRatio = [];
        $rootScope.ListingCategory = [];
        $rootScope.BorrowerRate = [];
        $rootScope.BorrowerRating = [];
        $rootScope.LengthOfLoan = [];



        $rootScope.LendersYield = [];
        $rootScope.LendersYieldForDifferentTerms = [];
        $rootScope.YieldVsDebt_to_Income = [];
        $rootScope.YieldVsRating = [];

        /*-----------Exploration Services------------*/
        /*dataService.GetExplorationData().success(function (res) {

            $rootScope.statsData = res.data;
        });

        dataService.IncomeRange().success(function (res) {

            $rootScope.IncomeRange = res.data;
        });

        dataService.DebtToIncomeRatio().success(function (res) {

            $rootScope.DebtToIncomeRatio = res.data;
        });

        dataService.BorrowerRating().success(function (res) {

            $rootScope.BorrowerRating = res.data;
        });

        dataService.ListingCategory().success(function (res) {

            $rootScope.ListingCategory = res.data;
        });

        dataService.BorrowerRate().success(function (res) {

            $rootScope.BorrowerRate = res.data;
        });

        dataService.LengthOfLoan().success(function (res) {

            $rootScope.LengthOfLoan = res.data;
        });
*/


        /*-----------Stats Services------------*/

        /*dataService.LendersYield().success(function (res) {

            $rootScope.LendersYield = res.data;
        });

        dataService.LendersYieldForDifferentTerms().success(function (res) {

            $rootScope.LendersYieldForDifferentTerms = res;
        });

        dataService.YieldVsDebt_to_Income().success(function (res) {

            $rootScope.YieldVsDebt_to_Income = res.data;
        });

        dataService.YieldVsRating().success(function (res) {

            $rootScope.YieldVsRating = res.data;
        });*/


       // dataService.IncomeVerifiable().success(function (res) {

            var IncomeVerifiable = exploration.IncomeVerifiable.data;
            var true_status = _.find(IncomeVerifiable.data,{INCOMEVERIFIABLE : 'True'});
            var false_status = _.find(IncomeVerifiable.data,{INCOMEVERIFIABLE : 'False'});
            var total =  parseFloat(false_status.COUNT) +  parseFloat(true_status.COUNT);

            $rootScope.non_risky = (parseFloat(true_status.COUNT)/total)*100;
            $rootScope.risky = (parseFloat(false_status.COUNT)/total)*100;
      //  });

    }])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider ) {
            $urlRouterProvider.otherwise("/exploration");
            $stateProvider

                .state("exploration",{
                    url : "/exploration",
                    templateUrl : "/partials/exploration/exploration.html",
                    controller:'explorerController'
                })
                .state("stats",{
                    url : "/stats",
                    templateUrl : "/partials/stats.html",
                    controller:'statsController'
                })
                .state("portfolio",{
                    url : "/portfolio",
                    templateUrl : "/partials/portfolio.html",
                    controller:'portfolioController'
                })
        }]);

angular.module('services',[]);
angular.module('directives',[]);
angular.module('filters',[]);
angular.module('controllers',[]);