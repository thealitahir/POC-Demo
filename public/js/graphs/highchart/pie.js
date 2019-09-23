/**
 *
 * @param configurations
 * @returns {jQuery}
 */

window.pieGraph = function (configurations) {

    var div = configurations.div;
    var x_axis = configurations.x_axis;
    var y_axis = configurations.y_axis;
    var data = configurations.data.data;
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var x = [];
    var y = [];


    for(var i=0 ; i< data.length; i++){

        var obj = data[i];
        var keys = Object.keys(data[i]);

        for(var j=0;j<keys.length;j++){

            if(keys[j] == x_axis){
                x.push(data[i][keys[j]])
            }

            if(keys[j] == y_axis){
                y.push(data[i][keys[j]])
            }
        }
    }

    var series_data = [];
    var arr = [];
    for(var i=0;i< x.length;i++){

        if(typeof y[i] === "string"){
            y[i] =  parseFloat(y[i]);

        }
        arr.push (x[i] ,y[i]);
        series_data.push(arr);
        arr = [];
    }

    var label =' State Vs. Construction Budget';

    var chartConfig  = {

        chart: {
            type: 'pie',
            zoomType: 'xy',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: label
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: 90,
                depth: 45,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        xAxis: {
            title: {
                text: x_axis
            }
        },
        yAxis : [
            {
                title: {
                    text: y_axis
                }
            }
        ],
        tooltip: {
            formatter: function() {
                var num = numberWithCommas(this.point.y);
                return '<b>Budget For '+ this.point.name+' : $'+ num +'</b>'
            },
            shared: true
        },
        legend: {
            align: 'right',
            verticalAlign: 'top'
        },
        credits: {
            enabled: false
        },
        series: [{
            data: series_data,
            name : y_axis
        }]
    };

    //Adjust graph size according to container
    $(window).resize();

    console.log(chartConfig);

    return $('#' + div).highcharts(chartConfig);

};
