/**
 * Created by rabia on 3/4/2016.
 */
/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'polarGraph',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result.data);
                var categories = _.pluck(result,'INCOMERANGE')
                var series = _.pluck(result,'COUNT');
                for(var i=0;i<series.length;i++){
                    series[i] = parseFloat(series[i]);
                }

                var config = {

                    chart: {
                        polar: true,
                        type: 'line',
                        zoomType: 'xy',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },

                    title: {
                        text: 'Income Range of Borrower'
                    },

                    pane: {
                        size: '80%'
                    },

                    xAxis: {
                        categories: categories,
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },

                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0
                    },

                    tooltip: {
                        shared: true,
                        valuePrefix: '$'
                    },
                    credits : {
                        enabled : false
                    },
                    tooltip: {
                        formatter: function() {
                            var s = [];
                            var index = 0;
                            $.each(this.points, function(i, point) {
                                s.push('<tr><th>Income Range : </th><td>' + result[point.point.x]['INCOMERANGE']+'</td></tr>'+
                                    '<tr><th>Count : </th><td>' + result[point.point.x]['COUNT']+'</td></tr>'
                                );
                            });

                            return "<table class='table table-striped noMargins'>" + s + "</table>";
                        },
                        shared: true,
                        useHTML: true
                    },
                    series: [{
                        showInLegend: false,
                        name: 'Count',
                        data: series,
                        pointPlacement: 'on'
                    }]

                }

                $('#polarGraph').highcharts(config);
            };
            $scope.drawGraph();
            $timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='polarGraph' class='graph-block'></div>"
    };
}]);
