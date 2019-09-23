/**
 * Created by rabia on 3/1/2016.
 */

angular.module('directives').directive( 'histogramGraph',['$timeout',function($timeout) {
    return {
        restrict: 'E',
        scope:{
            diAttr : "=",
            config : "=",
            result : "="
        },
        controller: ['$scope', function($scope) {

            var categories = _.uniq(_.pluck($scope.result.data, 'REGION'));
            var constructionType = _.uniq(_.pluck($scope.result.data, 'CONSTRUCTIONTYPE'));
            var series = [];
            for(var i=0;i<constructionType.length;i++){
                var find = _.where($scope.result.data,{'CONSTRUCTIONTYPE' : constructionType[i]});
                var series_data = _.pluck(find,'MANPOWER_AVERAGE');
                var arr = [];
                for(var j=0;j<series_data.length;j++){
                    arr.push(parseFloat(series_data[j]));
                }
                series.push({
                    name : constructionType[i],
                    data : arr
                });
            }
            console.log(series);


            var config = {
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: 'Building Types per State'
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'MANPOWER'
                    }
                },
                credits: {
                    enabled: false
                },
                series: series
            };

            console.log(config);
            $('#histogramGraph').highcharts(config);
        }],
        template : "<div id='histogramGraph' class='graph-container-full'></div>"
    };
}]);
