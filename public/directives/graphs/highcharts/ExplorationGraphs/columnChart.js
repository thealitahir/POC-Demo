/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'columnChart',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.drawGraph = function(){
                var result = angular.copy($scope.result.data);

                var series = [];
                var categories = _.pluck(result, 'LISTINGCATEGORY');
                for(var i=0;i<result.length;i++){
                    series.push(parseFloat(result[i].COUNT))
                }
                var config  = {
                    chart: {
                        type: 'column',
                        zoomType : 'xy',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Purpose of Loan Listing'
                    },
                    credits : {
                        enabled : false
                    },
                    xAxis: {
                        categories: categories,
                        title: {
                            text: 'Loan Listing'
                        },
                        crosshair: true
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
                                s.push('<tr><th>Category : </th><td>' + result[point.point.x]['LISTINGCATEGORY']+'</td></tr>'+
                                    '<tr><th>Count : </th><td>' + result[point.point.x]['COUNT']+'</td></tr>'
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
            $timeout(function () {$scope.drawGraph();},500);

        }],
        template : "<div id='columnGraph' class='graph-block'></div>"
    };
}]);
