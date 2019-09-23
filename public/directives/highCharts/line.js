/**
 * Created by rabia on 11/24/2015.
 */

angular.module('directives').directive( 'lineGraph',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            diAttr : "=",
            config : "="

        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){

                var attr = $scope.config.config;
                if(attr.x_axis != '' && attr.y_axis.length >0){
                    var configurations = {
                        data : $scope.diAttr.data,
                        div : 'lineGraph',
                        x_axis : attr.x_axis,
                        y_axis : attr.y_axis,
                        label : attr.label
                    };
                    console.log(configurations)
                    lineGraph(configurations);
                }
            };
            $scope.drawGraph();

        }],
        template : "<div id='lineGraph' class='graph-container-full'></div>"
    };
}]);
