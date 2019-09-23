/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'donutGraph',['$timeout',function($timeout) {
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
                    series.push([result[i].BORROWER_RATING,parseFloat(result[i].COUNT)])
                }
                var config  = {

                    chart: {
                        type: 'pie',
                        zoomType: 'xy',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Borrowers Rating'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            innerSize: 90,
                            depth: 45,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'BORROWER_RATING'
                        }
                    },
                    yAxis : [
                        {
                            title: {
                                text: 'COUNT'
                            }
                        }
                    ],
                    tooltip: {
                        formatter: function() {
                            //return '<b>Count '+ this.point.name+' : '+ this.point.y +'</b>'
                            return '<b>Count : '+ this.point.y +'</b>'
                        },
                        shared: true
                    },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top'
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        data: series,
                        name : 'Count'
                    }]
                };


                $('#donutGraph').highcharts(config);
            };
            $scope.drawGraph();
            $timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='donutGraph' class='graph-block'></div>"
    };
}]);
