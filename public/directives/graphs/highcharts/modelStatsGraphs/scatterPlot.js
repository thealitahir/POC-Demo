/**
 * Created by rabia on 3/5/2016.
 */

angular.module('directives').directive('scatteredGraph',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result.data);
                var series = [];
                for(var i=0;i<result.length;i++){
                    series.push([parseFloat(result[i]['DEBTTOINCOMERATIO']),parseFloat(result[i]['ESTIMATEDEFFECTIVEYIELD'])])
                }

                var config = {
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Yield Vs. Debt to Income'
                    },
                    credits : {
                        enabled : false
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Debt to Income Ratio'
                        },
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Estimated Effective Yield'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 100,
                        y: 70,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>Debt to Income Ratio : {point.x}</b><br><b>Estimated Effective Yield : {point.y}</b><br>'
                            }
                        }
                    },
                    series: [{
                        showInLegend: false,
                        name: 'Estimated Effective Yield',
                        color: 'rgba(100, 200, 300, .9)',
                        data: series,
                        tooltip: {
                            crosshairs: true,
                            headerFormat: '<b></b>',
                            pointFormat: '<b>Debt to Income Ratio : {point.x}</b><br><b>Estimated Effective Yield : {point.y}</b><br>'
                        }
                    }]
                };
                $('#scatterPlot').highcharts(config);
            };
            $scope.drawGraph();
           // $timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='scatterPlot' class='graph-block'></div>"
    };
}]);
