/**
 *
 * @param configurations
 * @returns {jQuery}
 */
window.hierarchicalEdgeGraph = function (configurations) {

    console.log(configurations)
    function makeHierarchichalEdgeJson(data,keyName,importKey,keysToMap){

        var edgeJson=[];
        for(var i=0;i<data.length;i++){
            var doc=data[i];
            var index=-1;
            var importKeyIndex=-1;
            console.log(doc)
            console.log(keyName)


            for(var j=0;j<edgeJson.length;j++){
                if(edgeJson[j].name==doc[keyName]){
                    index=j;
                }
            }
            console.log(index);
            if(index>-1){
                var kIndex=-1;
                kIndex=edgeJson[index].imports.indexOf(doc[importKey]);
                if(kIndex==-1){
                    edgeJson[index].imports.push(doc[importKey]);
                    var objToInsert = {};
                    var obj={}
                    for(var map=0;map<keysToMap.length;map++)
                    {
                        var kName=doc[importKey];
                        var kvalue=doc[keysToMap[map]];
                        // edgeDoc.mapingKeys.push({kName:kvalue})
                        objToInsert[keysToMap[map]] = doc[keysToMap[map]];
                        //edgeDoc.mapingKeys[0][kName]=kvalue;
                        ;
                    }
                    obj[doc[importKey]]=objToInsert;
                    edgeJson[index].mapingKeys.push(obj);

                }
            }
            else{
                // edgeJson.push({name:doc[keyName],imports:[doc[importKey]]});

                console.log(keyName)
                console.log(doc)
                console.log(doc[keyName])
                var edgeDoc={name:doc[keyName],imports:[doc[importKey]],mapingKeys:[], keySequence:1};
                var objToInsert = {};
                var obj={}
                for(var map=0;map<keysToMap.length;map++)
                {
                    var kName=doc[importKey];;
                    var kvalue=doc[keysToMap[map]]

                    // edgeDoc.mapingKeys.push({kName:kvalue})
                    objToInsert[keysToMap[map]] = doc[keysToMap[map]];
                    //edgeDoc.mapingKeys[0][kName]=kvalue;

                }
                obj[doc[importKey]]=objToInsert;
                edgeDoc.mapingKeys.push(obj);
                edgeJson.push(edgeDoc);
            }
        }

        for(var i=0;i<data.length;i++){
            var doc=data[i];
            var index=-1;
            var importKeyIndex=-1;
            for(var j=0;j<edgeJson.length;j++){
                if(edgeJson[j].name==doc[importKey]){
                    index=j;
                }

            }
            if(index>-1){

                var kIndex=-1;
                kIndex=edgeJson[index].imports.indexOf(doc[keyName]);
                if(kIndex==-1){
                    edgeJson[index].imports.push(doc[keyName]);

////////////////////////////////////////////////////
                    var objToInsert = {};
                    var obj={}
                    for(var map=0;map<keysToMap.length;map++)
                    {
                        var kName=doc[keyName];
                        var kvalue=doc[keysToMap[map]];
                        // edgeDoc.mapingKeys.push({kName:kvalue})
                        objToInsert[keysToMap[map]] = doc[keysToMap[map]];
                        //edgeDoc.mapingKeys[0][kName]=kvalue;
                        ;
                    }
                    obj[doc[keyName]]=objToInsert;
                    edgeJson[index].mapingKeys.push(obj);
                    //////////////////////////////////////////

                }


            }
            else{
                // edgeJson.push({name:doc[importKey],imports:[doc[keyName]]});
                var edgeDoc={name:doc[importKey],imports:[doc[keyName]],mapingKeys:[],keySequence:2};
                /*for(var map=0;map<keysToMap.length;map++)
                 {
                 edgeDoc[keysToMap[map]]=doc[keysToMap[map]]
                 }*/
                ///////////////////////////////////

                var objToInsert = {};
                var obj={}
                for(var map=0;map<keysToMap.length;map++)
                {
                    var kName=doc[keyName];;
                    var kvalue=doc[keysToMap[map]]

                    // edgeDoc.mapingKeys.push({kName:kvalue})
                    objToInsert[keysToMap[map]] = doc[keysToMap[map]];
                    //edgeDoc.mapingKeys[0][kName]=kvalue;

                }
                obj[doc[keyName]]=objToInsert;
                edgeDoc.mapingKeys.push(obj);
                //////////////////////////////////

                edgeJson.push(edgeDoc);
            }
        }
        return edgeJson;
    }

        var div = configurations.div;
        var tooltip_class = configurations.tooltip_class;
        var data = configurations.data.data;
        var keyValue1 = configurations.keyValue1;
        var keyValue2 = configurations.keyValue2;
        var mapping = configurations.mapping;
        $('#' + div).empty();
        var d= makeHierarchichalEdgeJson(data,keyValue1,keyValue2,mapping);
        d=_.sortBy(d, 'keySequence');

    console.log(d)

        //var initWid =  document.getElementById("queryDataChartBlock").offsetWidth;
        var initWid =  $('#' + div).width();
        //var wid = initWid / 2;
        var wid = 371;

        var w = wid,
            h = wid,
            rx = w / 2,
            ry = h / 2,
            m0,
            rotate = 0;

        var splines = [];

        var cluster = d3.layout.cluster()
            .size([360, ry - 120])
            .sort(function(a, b) { return d3.ascending(a.keySequence, b.keySequence);});

        var bundle = d3.layout.bundle();
        var line = d3.svg.line.radial()
            .interpolate("bundle")
            .tension(.85)
            .radius(function(d) { return d.y; })
            .angle(function(d) { return d.x / 180 * Math.PI; });

        var div = d3.select("#" + div).insert("div", "h2")
            //.style("left", "100px")
            .style("width", w + "px")
            .style("height", w + "px")
            .style("position", "relative")
            .style("-webkit-backface-visibility", "hidden");

        var svg = div.append("svg:svg")
            .attr("width", w)
            .attr("height", w)
            .append("svg:g")
            .attr("transform", "translate(" + rx + "," + ry + ")");

        svg.append("svg:path")
            .attr("class", "arc")
            .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
            .on("mousedown", mousedown);

        var classes=d;
    console.log(classes);
        var nodes = cluster.nodes(packages.root(classes)),
            links = packages.imports(nodes),
            splines = bundle(links);

        var path = svg.selectAll("path.link")
            .data(links)
            .enter().append("svg:path")
            .attr("class", function(d) {
                return "link source-" + d.source.key + " target-" + d.target.key;
            })
            .attr("d", function(d, i) { return line(splines[i]); });

        svg.selectAll("g.node")
            .data(nodes.filter(function(n) { return !n.children; }))
            .enter().append("svg:g")
            .attr("class", "node")
            .attr("id", function(d) { return "node-" + d.key; })
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
            .append("svg:text")
            .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
            .attr("dy", ".31em")
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
            .text(function(d) { return d.key; })
            .attr("class",function(d){
                if(d.keySequence==1){
                    return "key1"
                }
                else if(d.keySequence==2){
                    return "key2"
                }
            })
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        d3.select("input[type=range]").on("change", function() {
            line.tension(this.value / 100);
            path.attr("d", function(d, i) { return line(splines[i]); });
        });

        d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);



        function mouse(e) {
            return [e.pageX - rx, e.pageY - ry];
        }

        function mousedown() {
            m0 = mouse(d3.event);
            d3.event.preventDefault();
        }

        function mousemove() {
            if (m0) {
                var m1 = mouse(d3.event),
                    dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
                div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
            }
        }

        function mouseup() {
            if (m0) {
                var m1 = mouse(d3.event),
                    dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

                rotate += dm;
                if (rotate > 360) rotate -= 360;
                else if (rotate < 0) rotate += 360;
                m0 = null;

                div.style("-webkit-transform", null);

                svg
                    .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
                    .selectAll("g.node text")
                    .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
                    .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
                    .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
            }
        }

        function mouseover(d) {
            svg.selectAll("path.link.target-" + d.key)
                .classed("target", true)
                .each(updateNodes("source", true));

            svg.selectAll("path.link.source-" + d.key)
                .classed("source", true)
                .each(updateNodes("target", true));

            var ele = $(this);
            var myindex =  $(this).parent().index();
            var offset = ele.offset();
            //   console.log("offset");
            //console.log(offset);
            var tooltipHtml=''
            for(var i=0;i<d.mapingKeys.length;i++){
                // console.log(Object.keys(d.mapingKeys[i]));
                var name=Object.keys(d.mapingKeys[i]);
                tooltipHtml+='<p style="color: #006dcc"><strong>'+name+'</strong><p>';
                for(key in d.mapingKeys[i][name]){
                    tooltipHtml+= '<p>' + key +' : '+d.mapingKeys[i][name][key]+'</p>';
                }
            }
            $('.'+ tooltip_class).html(tooltipHtml);
        }

        function mouseout(d) {

            svg.selectAll("path.link.source-" + d.key)
                .classed("source", false)
                .each(updateNodes("target", false));

            svg.selectAll("path.link.target-" + d.key)
                .classed("target", false)
                .each(updateNodes("source", false));


            $('.'+ tooltip_class).html('');
            //nvtooltip.cleanup();
        }

        function updateNodes(name, value) {
            return function(d) {
                if (value) this.parentNode.appendChild(this);
                svg.select("#node-" + d[name].key).classed(name, value);
            };
        }

        function cross(a, b) {
            return a[0] * b[1] - a[1] * b[0];
        }

        function dot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }
    }