/**
 * Created by asma on 03-Mar-16.
 */
angular.module("controllers").controller('portfolioController',['$scope','dataService',function($scope,dataService){
    $scope.portfolio={
        range:'2',
        amount:'',
        schema:[],
        data:[]
    };
    $scope.showLoaders=true;
    dataService.getPortfolio().success(function(res){
        $scope.showLoaders=false;

        console.log(res);
        if(res.status){

            $scope.portfolio.data=res.data.data;
            $scope.portfolio.schema=res.data.schema;
        }
        else{}
    });

    $scope.getPortfolioWithInput = function(){

        $scope.showLoaders=true;

        dataService.getPortfolioWithInput($scope.portfolio.amount, $scope.portfolio.range).success(function(res){
            $scope.showLoaders=false;

            if(res.status) {
                $scope.portfolio.data = res.data.data;
                $scope.portfolio.schema = res.data.schema;
            }
            else{

            }
        });
    }
}]);

