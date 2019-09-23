/**
 * @param configurations
 * @returns {jQuery}
 */

window.columnGraph = function (configurations) {

    function getSeriesAndCategories(data,x_axis,y_axis,label){

        var series = [];
        var categories = [];

        for(var i=0;i<y_axis.length;i++){
            series.push({name : y_axis[i], data :[]})
        }

        for(var i=0 ; i< data.length; i++) {

            var keys = Object.keys(data[i]);

            for (var j = 0; j < keys.length; j++) {

                if(keys[j].toLowerCase() == x_axis.toLowerCase()){
                    categories.push(data[i][keys[j]]);
                }

                for(var k=0;k<y_axis.length;k++){

                    if(keys[j].toLowerCase() == y_axis[k].toLowerCase()){

                        var value = data[i][keys[j]];
                        if(typeof data[i][keys[j]] == 'string'){

                            value = parseFloat(data[i][keys[j]]);
                        }
                        if(label!= ''){
                            series[k].data.push({y: value , name : ''});
                        }
                        else{
                            series[k].data.push({y: value, name : ''});
                        }
                    }
                }
            }
        }

        var obj = {
            categories : categories,
            series : series
        };
        return obj;
    }

    var label = configurations.label;
    var div = configurations.div;
    var x_axis = configurations.x_axis;
    var y_axis = configurations.y_axis;
    var schema = configurations.data.schema;
    var data = configurations.data.data;

    var chartConfig = {
        chart: {
            type: 'column',
            zoomType: 'xy',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Construction Site Vs. Manpower'
        },
        yAxis : [
            {
                title: {
                    text: y_axis
                }
            }
        ],
        //exporting: { enabled: false },
        credits: {
            enabled: false
        },
        plotOptions:
        {
            series:{
                turboThreshold:10002

            }
        },
        tooltip: {
            formatter: function() {
                var s = [];
                var index = 0;

                $.each(this.points, function(i, point) {
                    s.push('<tr><th>CONSTRUCTION TYPE : </th><td>' + data[point.x]['CONSTRUCTIONTYPE']+'</td></tr>'+
                        '<tr><th>MANPOWER : </th><td>' + data[point.x]['MANPOWER']+'</td></tr>'+
                        '<tr><th>REGION : </th><td>' + data[point.x]['REGION']+'</td></tr>'+
                        '<tr><th>AREA : </th><td>' + data[point.x]['AREA']+' sq meter</td></tr>'
                    );
                });

                return "<table class='table table-striped noMargins'>" + s + "</table>";
            },
            shared: true,
            useHTML: true
        },
    };

    if(configurations.hasOwnProperty('correlation')){
        chartConfig.legend.title = {
            text: 'Correlation: '+configurations.correlation,
            style: {
                color:  'black'
            }
        }
    }

    //Adjust graph size according to container
    $(window).resize();

    var graphData = getSeriesAndCategories(data,x_axis,y_axis,label);
    //console.log(graphData);

    chartConfig.xAxis = {
        title: {
            text: x_axis
        },
        categories: graphData.categories
    };
    chartConfig.series = graphData.series;
    return $('#' + div).highcharts(chartConfig);

};