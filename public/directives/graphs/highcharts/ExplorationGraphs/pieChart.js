/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'pieChart',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result.data);
                var series = [];
                series.push({
                    name: result[0]['TERM'],
                    y: parseFloat(result[0]['COUNT']),
                    sliced : true,
                    selected : true
                });
                series.push({
                    name: result[1]['TERM'],
                    y: parseFloat(result[1]['COUNT'])
                });
                series.push({
                    name: result[2]['TERM'],
                    y: parseFloat(result[2]['COUNT'])
                });

                var config  = {
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Length of Loan'
                    },
                    tooltip: {
                        formatter: function() {

                            var s = '<tr><th>Loan Duration : </th><td>' + this.point.name+' months</td></tr>'+
                                '<tr><th>Count : </th><td> ' + this.point.y+'</td></tr>';

                            return "<table class='table table-striped noMargins'>" + s + "</table>";

                        },
                        shared: true,
                        useHTML: true
                    },
                    credits : {
                        enabled : false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'No. of Months',
                        data: series
                    }]
                };

                $('#pieGraph').highcharts(config);
            };
            $scope.drawGraph();
            $timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='pieGraph' class='graph-block'></div>"
    };
}]);
