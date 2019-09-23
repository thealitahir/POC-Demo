/**
 * Created by rabia on 3/4/2016.
 */

angular.module('directives').directive( 'heatmapChart',['$timeout','$rootScope',function($timeout,$rootScope) {
    return {
        restrict: 'E',
        scope:{
            result : "="
        },
        controller: ['$scope', function($scope) {

            $scope.BorrowersPerState = angular.copy($scope.result);
            $scope.explorationTab = 2;
            if(!$scope.map && $scope.explorationTab == 2){
                $scope.map = L.map('explorationMap', {
                    center: [39.73, -104.99],
                    zoom: 4,
                    maxZoom: 22,
                    zoomControl: false
                });
                L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
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

                $scope.geojson=  L.geoJson($rootScope.usMapData,{
                    onEachFeature: onEachFeature,
                    style: style
                }).addTo($scope.map);
                //$scope.map.fitBounds($scope.geojson.getBounds());

                var info = L.control();

                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    return this._div;
                };
                // method that we will use to update the control based on feature properties passed
                info.update = function (props) {

                    if(props){
                        var data=_.find($scope.BorrowersPerState.data,{BORROWERSTATE:props.STUSPS});
                        if(data){
                            this._div.innerHTML = (props ?
                            '<div class="state-name">' + props.NAME + '</div><div class="state-value">' + data.COUNT + ' borrowers<div>' : 'Hover over a state');
                        }else{
                            this._div.innerHTML = (props ?
                            '<div class="state-name">' + props.NAME + '</div><div class="state-value">' : 'Hover over a state');
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
                    var data=_.find($scope.BorrowersPerState.data,{BORROWERSTATE:feature.properties.STUSPS});
                    var popup='<table class="table table-striped table-responsive noMargins">' +
                        '<tr><th>NAME</th><td>'+feature.properties.NAME+'</td></tr>'
                    if(data){
                        popup+= '<tr><th>Borrowers per State</th><td>'+data.COUNT+'</td></tr>' +
                        '</table>'
                    }
                    if (feature.properties ) {
                        layer.bindPopup(popup);
                    }
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight
                        //click: zoomToFeature
                    });
                }
                function getColor(d) {

                    return d > 1000 ? '#800026' :
                        d > 500  ? '#BD0026' :
                            d > 200  ? '#E31A1C' :
                                d > 100  ? '#FC4E2A' :
                                    d > 50   ? '#FD8D3C' :
                                        d > 20   ? '#FEB24C' :
                                            d > 10   ? '#FED976' :
                                                '#FFEDA0';
                }
                function style(feature) {
                    var data=_.find($scope.BorrowersPerState.data,{BORROWERSTATE:feature.properties.STUSPS});
                    var color='white';
                    if(data){
                        color=getColor(data.COUNT)
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

            }
        }],
        templateUrl: "../partials/exploration/map.html"
    };
}]);
