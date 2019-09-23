/**
 * Created by rabia on 3/5/2016.
 */
angular.module('directives').directive('columnGraphForModelStats',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){

                var result = angular.copy($scope.result.data);
                var series = [];

                var categories = ['AA','A','B','C','D','E','HR'];

                var obj1 = _.findWhere(result,{'RATING' : 'AA'});
                series.push(parseFloat(obj1['YIELD']));

                var obj2 = _.findWhere(result,{'RATING' : 'A'});
                series.push(parseFloat(obj2['YIELD']));

                var obj3 = _.findWhere(result,{'RATING' : 'B'});
                series.push(parseFloat(obj3['YIELD']));

                var obj4 = _.findWhere(result,{'RATING' : 'C'});
                series.push(parseFloat(obj4['YIELD']));

                var obj5 = _.findWhere(result,{'RATING' : 'D'});
                series.push(parseFloat(obj5['YIELD']));

                var obj6 = _.findWhere(result,{'RATING' : 'E'});
                series.push(parseFloat(obj6['YIELD']));

                var obj7 = _.findWhere(result,{'RATING' : 'HR'});
                series.push(parseFloat(obj7['YIELD']));

                var config  = {
                    chart: {
                        type: 'column',
                        zoomType : 'xy'
                        /*options3d: {
                         enabled: true,
                         alpha: 45,
                         beta: 0
                         }*/
                    },
                    title: {
                        text: 'Average Yield Per Rating'
                    },
                    credits : {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: 'Rating'
                        },
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Average Yield'
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var s = [];
                            var index = 0;
                            $.each(this.points, function(i, point) {
                                s.push('<tr><th>Category : </th><td>' + result[point.point.x]['RATING']+'</td></tr>'+
                                    '<tr><th>Avg. Yield : </th><td>' + result[point.point.x]['YIELD']+'</td></tr>'
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
                        data: series
                    }]
                }
                $('#columnGraph').highcharts(config);

            };
            $scope.drawGraph();
            //$timeout(function () {$scope.drawGraph();},500);
        }],
        template : "<div id='columnGraph' class='graph-block'></div>"
    };
}]);
