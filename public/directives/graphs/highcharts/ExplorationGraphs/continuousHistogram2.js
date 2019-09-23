/**
 * Created by rabia on 3/6/2016.
 */
angular.module('directives').directive( 'continuousHistogramChart',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result);
                var categories = _.pluck(result.data,'BORROWERRATE');
                var series = _.pluck(result.data,'COUNT');
                for(var i=0;i<series.length;i++){
                    series[i] = parseFloat(series[i]);
                }

                var config = {
                    chart: {
                        type: 'column',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Loan Interest Rate Distribution'
                    },
                    credits: {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: true,
                        title: {
                            text: 'Ratio'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Count'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = [];
                            var index = 0;
                            $.each(this.points, function(i, point) {
                                s.push('<tr><th>Ratio : </th><td>' + result.data[point.point.x]['BORROWERRATE']+'</td></tr>'+
                                    '<tr><th>Count : </th><td>' + result.data[point.point.x]['COUNT']+'</td></tr>'
                                );
                            });

                            return "<table class='table table-striped noMargins'>" + s + "</table>";
                        },
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        showInLegend: false,
                        data: series,
                        borderWidth: .5,
                        borderColor: '#e60000',
                        pointPadding: -0.33,
                        color: '#ff8080'
                    }]
                }
                $('#continuousHistogramGraph2').highcharts(config);
            };
            $scope.drawGraph();
            $timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='continuousHistogramGraph2' class='graph-block'></div>"
    };
}]);
