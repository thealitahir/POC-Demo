/**
 * Created by rabia on 3/5/2016.
 */

angular.module('directives').directive('multipleContinuousHistogramForModelStats',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result1 = angular.copy($scope.result.data1);
                var result2 = angular.copy($scope.result.data2);
                var result3 = angular.copy($scope.result.data3);

                var categories1 = _.pluck(result1.data,'ESTIMATEDEFFECTIVEYIELD');
                var series1 = _.pluck(result1.data,'COUNT');
                for(var i=0;i<series1.length;i++){
                    series1[i] = parseFloat(series1[i]);
                }

                var categories2 = _.pluck(result2.data,'ESTIMATEDEFFECTIVEYIELD');
                var series2 = _.pluck(result1.data,'COUNT');
                for(var i=0;i<series2.length;i++){
                    series2[i] = parseFloat(series2[i]);
                }


                var categories3 = _.pluck(result3.data,'ESTIMATEDEFFECTIVEYIELD');
                var series3 = _.pluck(result3.data,'COUNT');
                for(var i=0;i<series3.length;i++){
                    series3[i] = parseFloat(series3[i]);
                }


                var config1 = {
                    chart: {
                        type: 'column',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Lenders Yield for 60 Months'
                    },
                    credits: {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories1,
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
                                s.push('<tr><th>Effective Yield : </th><td>' + result1.data[point.point.x]['ESTIMATEDEFFECTIVEYIELD']+'</td></tr>'+
                                    '<tr><th>Count : </th><td>' + result1.data[point.point.x]['COUNT']+'</td></tr>'
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
                        data: series1,
                        borderWidth: .5,
                        borderColor: '#4d0028',
                        pointPadding: -0.33,
                        color: '#ff3399'
                    }]
                };
                var config2 = {
                    chart: {
                        type: 'column',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Lenders Yield for 36 Months'
                    },
                    credits: {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories2,
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
                                s.push('<tr><th>Effective Yield : </th><td>' + result2.data[point.point.x]['ESTIMATEDEFFECTIVEYIELD']+'</td></tr>'+
                                    '<tr><th>Count : </th><td>' + result2.data[point.point.x]['COUNT']+'</td></tr>'
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
                        data: series2,
                        borderWidth: .5,
                        borderColor: '#000080',
                        pointPadding: -0.33,
                        color: '#75ffe8'
                    }]
                };
                var config3 = {
                    chart: {
                        type: 'column',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Lenders Yield for 12 Months'
                    },
                    credits: {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories3,
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
                                s.push('<tr><th>Effective Yield : </th><td>' + result3.data[point.point.x]['ESTIMATEDEFFECTIVEYIELD']+'</td></tr>'+
                                    '<tr><th>Count : </th><td>' + result3.data[point.point.x]['COUNT']+'</td></tr>'
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
                        data: series3,
                        borderWidth: .5,
                        borderColor: '#666600',
                        pointPadding: -0.33,
                        color: '#ffff00'
                    }]
                };

                $('#continuousHistogramGraph1').highcharts(config1);
                $('#continuousHistogramGraph2').highcharts(config2);
                $('#continuousHistogramGraph3').highcharts(config3);
            };
            $scope.drawGraph();
            //$timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div class='graph-block-stats-sm'><div id='continuousHistogramGraph1' class='graph-block'></div></div>"+
        "<div class='graph-block-stats-sm'><div id='continuousHistogramGraph2' class='graph-block'></div></div>"+
        "<div class='graph-block-stats-sm'><div id='continuousHistogramGraph3' class='graph-block'></div></div>"
    };
}]);
