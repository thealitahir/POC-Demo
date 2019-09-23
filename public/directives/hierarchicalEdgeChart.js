/**
 * Created by rabia on 4/27/2015.
 */

angular.module('directives').directive('hierarchicalEdgeGraphDirective',function(){
    return {
        restrict: 'EA',
        scope: {
            graphConfig : '=',
            result : '='
        },
        link: function (scope, elem, attrs) {

            scope.class='';
            function drawGraph(){

                var attrs = scope.graphConfig.config;
                var configurations = {
                    data : angular.copy(scope.result),
                    div : 'canvas-svg-hierarchicalEdge',
                    tooltip_class : 'canvas-svg-hierarchicalEdge-data',
                    keyValue1 : attrs.keyValue1,
                    keyValue2 : attrs.keyValue2,
                    mapping : attrs.mapping

                }
                console.log(configurations);

                if(attrs.keyValue1!='' && attrs.keyValue2!=''){

                    hierarchicalEdgeGraph(configurations);
                }
            }
            drawGraph();
        },

        templateUrl: "../DirectiveTemplates/hierarchicalEdge.html"
    };
});