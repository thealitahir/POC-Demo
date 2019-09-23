/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive('continuousHistogramForModelStats',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result);
                var categories = _.pluck(result.data,'ESTIMATEDEFFECTIVEYIELD');
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
                        text: 'Lenders Yield'
                    },
                    credits: {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: true,
                        title: {
                            text: 'Yield'
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
                                s.push('<tr><th>Effective Yield : </th><td>' + result.data[point.point.x]['ESTIMATEDEFFECTIVEYIELD']+'</td></tr>'+
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
                        borderColor: '#800080',
                        pointPadding: -0.33,
                        color: '#ffb3ff'
                    }]
                };
                $('#continuousHistogramGraph').highcharts(config);
            };
            $scope.drawGraph();
            //$timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='continuousHistogramGraph' class='graph-block'></div>"
    };
}]);
