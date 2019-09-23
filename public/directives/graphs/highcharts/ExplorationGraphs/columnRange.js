/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'columnRangeGraph',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {


            $scope.drawGraph = function(){
                var result = angular.copy($scope.result.data);
                if(result.length % 2 != 0){
                    result.splice(-1,1);
                }

                var series = [];
                var categories = [];

                for(var i=0;i<result.length;i=i+2){
                    var avg = '';
                    var num1= parseFloat(result[i].COUNT);
                    var num2= parseFloat(result[i+1].COUNT);
                    avg = (num1 + num2)/2;
                    categories.push(avg);
                    var arr = [parseFloat(result[i].BORROWERRATE),parseFloat(result[i+1].BORROWERRATE)]
                    series.push(arr);
                }

                var config = {

                    chart: {
                        type: 'columnrange',
                        inverted: true,
                        zoomType: 'xy'
                    },

                    title: {
                        text: 'Borrowers Rate Distribution'
                    },
                    xAxis: {
                        categories: categories,
                        title : {
                            text:'Avg Count'
                        }
                    },

                    credits: {
                        enabled : false
                    },
                    yAxis: {
                        title: {
                            text: 'Rate'
                        }
                    },

                    plotOptions: {
                        columnrange: {
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return this.y;
                                }
                            }
                        }
                    },

                    legend: {
                        enabled: false
                    },

                    series: [{
                        name: 'Range',
                        data: series
                    }]

                };
                $('#columnRangeGraph').highcharts(config);
            };
            $scope.drawGraph();
            $timeout(function () {$scope.drawGraph();},500);

        }],
        template : "<div id='columnRangeGraph' class='graph-block'></div>"
    };
}]);
