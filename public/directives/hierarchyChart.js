/**
 * Created by rabia on 4/27/2015.
 */

angular.module('directives').directive('hierarchyGraphDirective',function() {
    return {
        restrict: 'EA',
        scope: {
            graphConfig : '=',
            result : '='
        },
        link: function (scope, elem, attrs) {

            console.log(scope.graphConfig)
            console.log(scope.result)
            scope.class='';
            function drawGraph(){

                var fields = scope.graphConfig.config.fields;
                var attrs = scope.graphConfig.config;
                var configurations = {
                    data : angular.copy(scope.result),
                    div : 'canvas-svg-hierarchy',
                    fields : fields

                }
                console.log("configurations")
                console.log(configurations)
                hierarchyGraph(configurations);
            };

            drawGraph();

            scope.$watchCollection(function(){return scope.result.data}, function(obj2) {
                drawGraph();});
            scope.$watch(function(){return scope.graphConfig.config.fields[0].fieldA}, function(obj2) {
                drawGraph();});
            scope.$watch(function(){return scope.graphConfig.config.fields[0].fieldB}, function(obj2) {
                drawGraph();});
        },
        templateUrl: "../DirectiveTemplates/hierarchy.html"
    };
});