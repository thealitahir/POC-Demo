/**
 * Created by asma on 03-Mar-16.
 */
angular.module("controllers").controller('statsController',['$scope','$rootScope','dataService',function($scope,$rootScope,dataService){

    $scope.averageYield = [];
    $rootScope.LendersYield = stats.LendersYield.data;
    $rootScope.LendersYieldForDifferentTerms = stats.terms;
    $rootScope.YieldVsDebt_to_Income = stats.YieldVsDebt_to_Income.data;
    $rootScope.YieldVsRating = stats.YieldVsRating.data;
    $rootScope.LendersYield = stats.LendersYield.data;
    $scope.averageYield = stats.averageYield.data;
    $scope.regressionMetrics = [];

    /*if(_.contains(Object.keys($rootScope.LendersYield),'schema') == false && $rootScope.LendersYield.length == 0){
        dataService.LendersYield().success(function (res) {
            $rootScope.LendersYield = res.data;
        });
    }

    if($rootScope.LendersYieldForDifferentTerms.length == 0){
        dataService.LendersYieldForDifferentTerms().success(function (res) {
            $rootScope.LendersYieldForDifferentTerms = res;
        });
    }

    if(_.contains(Object.keys($rootScope.YieldVsDebt_to_Income),'schema') == false && $rootScope.YieldVsDebt_to_Income.length == 0){
        dataService.YieldVsDebt_to_Income().success(function (res) {
            $rootScope.YieldVsDebt_to_Income = res.data;
        });
    }

    if(_.contains(Object.keys($rootScope.YieldVsRating),'schema') == false && $rootScope.YieldVsRating.length == 0){
        dataService.YieldVsRating().success(function (res) {
            $rootScope.YieldVsRating = res.data;
        });
    }

    dataService.averageYield().success(function (res) {
        $scope.averageYield = res.data;
        $scope.plotMap();
    });*/

    $scope.map = L.map('statsMap', {
        center: [39.73, -104.99],
        zoom: 4,
        maxZoom: 22,
        zoomControl: false
    });
    L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(  $scope.map);
    L.control.zoom({
        position: 'bottomright'
    }).addTo($scope.map);
    L.control.fullscreen({
        position: 'bottomright',
        title: 'Fullscreen !',
        forceSeparateButton: true,
        forcePseudoFullscreen: true
    }).addTo($scope.map);

    $scope.plotMap=function(){

        $scope.geojson=L.geoJson($rootScope.usMapData,{
            onEachFeature: onEachFeature,
            style: style
        }).addTo($scope.map);
        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        info.update = function (props) {

            if(props){
                var data=_.find($scope.averageYield.data,{STATE:props.STUSPS});

                if(data){
                    this._div.innerHTML = (props ?
                        '<div class="state-name">' + props.NAME + '</div><div class="state-value">' + data.AVERAGE_ESTIMATEDEFFECTIVEYIELD + ' Avg. Yield<div>'
                            : 'Hover over a state');
                }else{
                    this._div.innerHTML = (props ?
                    '<div class="state-name">' + props.NAME + '</div>'
                            : 'Hover over a state');
                }

            }
        };

        info.addTo($scope.map);
        function highlightFeature(e) {
            var layer = e.target;
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });


            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }
            info.update(layer.feature.properties);
        };

        function resetHighlight(e) {
            $scope.geojson.resetStyle(e.target);
            info.update();

        };
        function onEachFeature(feature, layer) {
            var data=_.find($scope.averageYield.data,{STATE:feature.properties.STUSPS});
            var popup='<table class="table table-striped table-responsive noMargins">' +
                '<tr><th>NAME</th><td>'+feature.properties.NAME+'</td></tr>';
            if(data){
                popup+= '<tr><th>Average yield</th><td>'+data.AVERAGE_ESTIMATEDEFFECTIVEYIELD+'</td></tr>' +
                    '</table>'
            }
            if (feature.properties ) {
                layer.bindPopup(popup);
            }
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }
        function getColor(d) {

            return d > 130 ? '#800026' :
                d > 135  ? '#BD0026' :
                    d > 125  ? '#E31A1C' :
                        d > 120  ? '#FC4E2A' :
                            d > 115   ? '#FD8D3C' :
                                d > 96   ? '#FEB24C' :
                                    d > 92   ? '#FED976' :
                                        '#FFEDA0';
        }
        function style(feature) {
            var data=_.find($scope.averageYield.data,{STATE:feature.properties.STUSPS});
            var color='white';
            if(data){
                color=getColor(parseFloat(data.AVERAGE_ESTIMATEDEFFECTIVEYIELD)*1000);
            }
            return {
                fillColor: color,
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
    };
    if(typeof $rootScope.usMapData=='undefined') {
        dataService.getUsMapData().success(function (res) {
            console.log(res.status)
            $rootScope.usMapData = JSON.parse(res.data)
            $scope.plotMap()
        })
    }else $scope.plotMap()

    dataService.YieldPredictor().success(function(res){
        $scope.regressionMetrics = res.data.percentage[0].regressionMetrics[0];
        dataService.RatingPredictor().success(function(res){
            var multiClassMetrics = res.data;
            $scope.multiClassAccuracy = parseFloat(multiClassMetrics.percentage[0].accuracyanderror[0].accuracy);
            $scope.label_stats = multiClassMetrics.percentage[0].labelsstats;
        });
    })

}]);