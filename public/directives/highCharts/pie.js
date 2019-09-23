/**
 * Created by rabia on 11/25/2015.
 */

angular.module('directives').directive( 'pieGraph',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            diAttr : "=",
            config : "=",
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){

                var attr = $scope.config.config;
                if(attr.x_axis != '' && attr.y_axis != ''){
                    var configurations = {
                        data : $scope.result,
                        div : 'pieGraph',
                        x_axis : attr.x_axis,
                        y_axis : attr.y_axis,
                        label : attr.label
                    };
                    pieGraph(configurations);
                }
            };
            $scope.drawGraph();



        }],
        template : "<div id='pieGraph' class='graph-container-half'></div>"
    };
}]);
