/**
 * Created by asma on 03-Mar-16.
 */
angular.module("controllers").controller('explorerController',['$scope','$rootScope','dataService',function($scope,$rootScope,dataService){

    $scope.map=undefined;
    $scope.showLoader=true;

    $scope.finishLoading = function() {
        $scope.showLoader=false;
    };
    $scope.loadUsMapData= function(){
        console.log( $rootScope.usMapData)
if(typeof $rootScope.usMapData=='undefined'){
    dataService.getUsMapData().success(function(res){
        console.log(res.status)
        $rootScope.usMapData=JSON.parse(res.data)
    })
}

    }
    console.log(exploration.GetExplorationData);

    $rootScope.BorrowersPerState = exploration.BorrowersPerState.data;
    $rootScope.IncomeRange = exploration.IncomeRange.data;
    $rootScope.DebtToIncomeRatio = exploration.DebtToIncomeRatio.data;
    $rootScope.BorrowerRating = exploration.BorrowerRating.data;
    $rootScope.ListingCategory = exploration.ListingCategory.data;
    $rootScope.BorrowerRate = exploration.BorrowerRate.data;
    $rootScope.LengthOfLoan = exploration.LengthOfLoan.data;
    $rootScope.statsData = exploration.GetExplorationData;
    
   /* dataService.BorrowersPerState().success(function (res) {
        $rootScope.BorrowersPerState = exploration.BorrowersPerState;
    });
    if(_.contains(Object.keys($rootScope.statsData),'schema') == false && $rootScope.statsData.length == 0){
        dataService.GetExplorationData().success(function (res) {
            $rootScope.statsData = res.data;
        });
    }
    if(_.contains(Object.keys($rootScope.IncomeRange),'schema') == false &&  $rootScope.IncomeRange.length == 0){
        dataService.IncomeRange().success(function (res) {
            $rootScope.IncomeRange = res.data;
        });
    }
    if(_.contains(Object.keys($rootScope.DebtToIncomeRatio),'schema') == false && $rootScope.DebtToIncomeRatio.length == 0){
        dataService.DebtToIncomeRatio().success(function (res) {
            $rootScope.DebtToIncomeRatio = res.data;
        });
    }
    if(_.contains(Object.keys($rootScope.BorrowerRating),'schema') == false &&  $rootScope.BorrowerRating.length == 0){
        dataService.BorrowerRating().success(function (res) {
            $rootScope.BorrowerRating = res.data;
        });
    }
    if(_.contains(Object.keys($rootScope.ListingCategory),'schema') == false &&  $rootScope.ListingCategory.length == 0){
        dataService.ListingCategory().success(function (res) {
            $rootScope.ListingCategory = res.data;
        });
    }
    if(_.contains(Object.keys($rootScope.BorrowerRate),'schema') == false &&  $rootScope.BorrowerRate.length == 0){
        dataService.BorrowerRate().success(function (res) {
            $rootScope.BorrowerRate = res.data;
        });
    }
    if(_.contains(Object.keys($rootScope.LengthOfLoan),'schema') == false &&  $rootScope.LengthOfLoan.length == 0){
        dataService.LengthOfLoan().success(function (res) {
            $rootScope.LengthOfLoan = res.data;
        });
    }*/

}])
    .filter('singleDecimal', function ($filter) {
        return function (input) {
            if (isNaN(input)) return input;
            return Math.round(input * 100) / 100;
        };
    });