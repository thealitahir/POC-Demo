/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'semiDonutChart',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result.data);
                var true_status = _.find(result,{INCOMEVERIFIABLE : 'True'})
                var false_status = _.find(result,{INCOMEVERIFIABLE : 'False'})

                var total =  parseFloat(false_status.COUNT) +  parseFloat(true_status.COUNT);
                var obj1 = {
                    name: 'Verified',
                    y: (parseFloat(true_status.COUNT)/total)*100,
                    color : 'green'

                };
                var obj2 = {
                    name: 'Not Verified',
                    y: (parseFloat(false_status.COUNT)/total)*100,
                    color : 'green'

                };
                var config = {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    title: {
                        text: 'Income Verifiable',
                        align: 'center',
                        //verticalAlign: 'middle',
                        y: 60
                    },
                    credits : {
                        enabled : false
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: -50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'white',
                                    textShadow: '0px 1px 2px black'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['50%', '75%']
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Percentage',
                        innerSize: '50%',
                        data: [obj1,obj2]
                    }]
                };

                $('#semiDountGraph').highcharts(config);
            };
            $scope.drawGraph();
            $timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='semiDountGraph' class='graph-block'></div>"
    };
}]);
