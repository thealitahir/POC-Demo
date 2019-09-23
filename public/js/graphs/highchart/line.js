/**
 *
 * @param configurations
 * @returns {jQuery}
 */
window.lineGraph = function (configurations) {

    function getSeriesAndCategories(data,x_coordinate,y_coordinate,label){

        var series = [];
        var categories = [];

        for(var i=0;i<y_coordinate.length;i++){
            series.push({name : y_coordinate[i], data :[]})
        }

        for(var i=0 ; i< data.length; i++) {

            var keys = Object.keys(data[i]);

            for (var j = 0; j < keys.length; j++) {

                if(keys[j].toLowerCase() == x_coordinate.toLowerCase()){
                    categories.push(data[i][keys[j]]);
                }

                var k;
                for(k=0;k<y_coordinate.length;k++){

                    if(keys[j].toLowerCase() == y_coordinate[k].toLowerCase()){

                        var value = data[i][keys[j]];
                        if(typeof data[i][keys[j]] == 'string'){

                            value = parseFloat(data[i][keys[j]]);
                        }
                        if(label!= ''){
                            series[k].data.push({y: value , name : label +" : "+ data[i][label]});

                        }
                        else{
                            series[k].data.push({y: value, name : ''});
                                               }
                    }
                }

            }
        }
        /*if(typeof configurations.correlation != 'undefined'){
            series[y_coordinate.length-1].data.push({y: configurations.correlation ,color:'rgb(211, 22, 79)', name : "correlation"});
        }*/


        var obj = {
            categories : categories,
            series : series
        };
        return obj;
    }
    function getSeriesForDateTime(schema,data,x_coordinate,y_coordinate){

        var series = [];
        var value_x = '';
        var findObj = _.find(schema, function (fieldObj) {
            return (fieldObj.field.toLowerCase() == x_coordinate.toLowerCase())
        });

        for(var i=0;i<y_coordinate.length;i++){
            series.push({name : y_coordinate[i], data :[]})
        }

        for(var i=0 ; i< data.length; i++) {

            var keys = Object.keys(data[i]);

            if(keys.indexOf(x_coordinate) !=-1){
                if(findObj.type.toLowerCase()== 'timestamp' || findObj.type.toLowerCase() == 'datetime') {

                    var val = '';
                    if (findObj.type.toLowerCase() == 'timestamp') {
                        val = parseInt(data[i][x_coordinate]);
                    }
                    value_x = new Date(val).getTime();
                }
                else{
                    value_x = data[i][x_coordinate];
                }
            }

            for(var k=0;k<y_coordinate.length;k++){

                if(keys.indexOf(y_coordinate[k]) != -1){

                    var value_y = data[i][y_coordinate[k]];
                    if(typeof data[i][y_coordinate[k]] == 'string'){

                        value_y = parseFloat(data[i][y_coordinate[k]]);
                    }

                    var pair = [];
                    pair.push(value_x,value_y);
                    series[k].data.push(pair);
                }
            }
        }
        return series;
    }

    var label = configurations.label;
    var div = configurations.div;
    var x_coordinate = configurations.x_axis;
    var y_coordinate = (typeof configurations.y_axis == "string" )? [configurations.y_axis]:configurations.y_axis;
    var schema = configurations.data.schema;
    var data = configurations.data.data;

    var findObj = _.find(schema, function (fieldObj) {

        return (fieldObj.field.toLowerCase() == x_coordinate.toLowerCase())
    });


    var chartConfig = {
        chart: {
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: x_coordinate + ' VS ' + y_coordinate
        },
        yAxis : [
            {
                title: {
                    text: y_coordinate
                }
            }
        ],
        exporting: { enabled: false },
        legend: {
            layout:'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            borderWidth: 1
        },
        credits: {
            enabled: false
        },
        plotOptions:
        {
            series:{
                turboThreshold:10002

            }
        }
    };


    if(configurations.hasOwnProperty('correlation')){
        chartConfig.legend.title = {
            text: 'Correlation: '+configurations.correlation,
                style: {
                color:  'black'
            }
        }
    }

    if(configurations.hasOwnProperty('AUPRC')){
        chartConfig.legend.title = {
            text: 'AUPRC: '+configurations.AUPRC,
                style: {
                color:  'black'
            }
        }
    }

    if(configurations.hasOwnProperty('AUROC')){
        chartConfig.legend.title = {
            text: 'AUROC: '+configurations.AUROC,
                style: {
                color:  'black'
            }
        }
    }
    //Adjust graph size according to container
    $(window).resize();

    if(findObj.type.toLowerCase() == 'timestamp' || findObj.type.toLowerCase() == 'datetime'){
        var graphData = getSeriesForDateTime(schema,data,x_coordinate,y_coordinate);
        chartConfig.xAxis = {
            title: {
                text: x_coordinate
            },
            type: 'datetime'
        };
        chartConfig.series = graphData;

    }
    else{
        var graphData = getSeriesAndCategories(data,x_coordinate,y_coordinate,label);
        chartConfig.xAxis = {
            title: {
                text: x_coordinate
            },
            categories: graphData.categories
        };
        chartConfig.series = graphData.series;
    }

    return $('#'+ div).highcharts(chartConfig);
};
