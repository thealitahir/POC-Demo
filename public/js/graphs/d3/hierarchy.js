/**
 * @param configurations
 * @returns {jQuery}
 */

window.hierarchyGraph = function (configurations) {

    function groupByLevel( source, levels,percentageArray, config ){

        config = ( typeof config == "object" && config ) || {};

        var internalConfig = {
            keyName: config.keyName || "name",
            collectionName: config.collectionName || "children"
        };

        var hierarchy = {};
        hierarchy[internalConfig.keyName] = "Chicago";
        hierarchy[internalConfig.collectionName] = source;

        var sourceArray = [hierarchy];

        for(var i = 0; i < levels.length; i++){

            var newSourceArray = [];

            for(var j = 0; j < sourceArray.length; j++){

                var testObj=sourceArray[i];
                var oldArray = sourceArray[j][internalConfig.collectionName];

                if(oldArray){
                    var newArray = groupBy(oldArray, levels[i], internalConfig,percentageArray[i],levels);
                    sourceArray[j][internalConfig.collectionName] = newArray;
                    for(var l = 0; l < newArray.length; l++){
                        newSourceArray.push(newArray[l]);
                    }
                }
            }
            sourceArray = newSourceArray;
        }
        return hierarchy;
    }
    function duplicate(obj){
        var newObj = {};
        for(var i in obj) newObj[i] = obj[i];
        return newObj;
    }
    function objlength(obj){
        var length = 0;
        for(var i in obj) length++;
        return length
    }
    function groupBy(array, key, config,percentageKey,levels){
        var group = {};

        for(var i = 0; i < array.length; i++){
            var item = array[i];
            var currentKey = item[key];
            if( ! group[currentKey] ) group[currentKey] = [];
            var clone = duplicate(item);
            delete clone[key];
            if( objlength(clone) ) group[currentKey].push( clone );

        }
        var returnGroup = [];
        for(var i in group){
            var groupItem = {};
            groupItem[config.keyName] = i;
            if(percentageKey && percentageKey!='')
                groupItem["percentage"]=group[i][0][percentageKey];

            if( group[i].length  && checkKeyToBeConsidered(group[i],levels)){
                groupItem[config.collectionName] = group[i];
            }
            returnGroup.push( groupItem );
        }

        return returnGroup;
    }
    function checkKeyToBeConsidered(group,levels){

        var flag1=false;
        for(var key in group[0]){
            var index=levels.indexOf(key);
            if(index>-1){
                flag1=true;
                break;
            }
        }
        return flag1;
    }

    console.log(configurations);
    var div = configurations.div;
    var data = configurations.data.data;
    var fields = configurations.fields;
    var fieldsArray=[];
    var mappedArray=[];
    for(var i=0;i<fields.length;i++){
        fieldsArray.push(fields[i].fieldA);
        mappedArray.push(fields[i].fieldB);
    }

    var flare1 =  groupByLevel(data, fieldsArray,mappedArray);

    var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = $('#' + div).width() - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;


    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    $('#'+ div).empty();
    var svg = d3.select("#" + div).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //d3.json(json, function(error, flare) {
    root = flare1;
    root.x0 = height / 2;
    root.y0 = 0;

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    console.log(root.children);
    root.children.forEach(collapse);
    console.log(root.children);
    update(root);
    //});

    //d3.select(self.frameElement).style("height", "800px");

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
            .append("svg:title")
            .text(function(d) {
                if(d.percentage)
                {
                    return "Crime Rate :"+d.percentage;
                }
                else{
                    return " ";
                }

            });

        nodeEnter.append("text")
            .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

}