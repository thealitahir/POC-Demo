/**
 * Created by asma on 30-Mar-15.
 */
var fs = require("fs");
var waterT=[];
var time=[];
var watrL=[]
var noOfRecords=''
var linesChanged=[]



fs.readFile('life_expectancy.csv',{encoding : "utf8"}, function (err, data) {

    var lines = data.split("\n");

    // var linesChanged = lines[0] + "\n";

    for (var index = 0; index < lines.length - 1; index++) {
        var columns = lines[index].split(",");


        waterT.push(columns[1])


    }
    fs.readFile('CO-OPS__9414764__wl.csv',{encoding : "utf8"}, function (err, data) {

        var lines = data.split("\n");

        // var linesChanged = lines[0] + "\n";

        for (var index = 0; index < lines.length - 1; index++) {
            var columns = lines[index].split(",");


            time.push(columns[0])
            watrL.push(columns[1])

        }


   console.log(time[2]+','+waterT[2]+','+watrL[2] + "\n")

        noOfRecords += 'StationID,Date_Time,Water_Temperature,Water_Level'+ "\n";
     for(var x= 1;x<time.length-1;x++){
         if(waterT[x]=='' || watrL[x]==''|| time[x]==''  ){

              continue;

         }
         else
         {
             noOfRecords += '9414764,'+time[x]+','+waterT[x]+','+watrL[x] + "\n";
         }

     }


     fs.writeFile("9414764.csv",noOfRecords, function (err) {
     if(!err){
     console.log("File saved.")
     }
     });


     });


});

    /*fs.readFile('space_inspection.csv',{encoding : "utf8"}, function (err, data) {

        var lines = data.split("\n");


        for(var i=0;i<lines.length;i++){
            for(var j=0;j<lineNo.length;j++){
                if(i==lineNo[j]){
                    lines[i] = 'record to delete';
                }
            }


        }
        var abc =lines;



        console.log(lines[285]);
        // var linesChanged = lines[0] + "\n";

        for(var index = 0; index < abc.length; index++){

            if(abc[index]=='record to delete'){
                abc[index]="1532381,WENDY'S #000981,WENDY'S,6780,Restaurant,Risk 1 (High),5456 N HARLEM AVE ,CHICAGO,IL,60656,Canvass,Fail,19. OUTSIDE GARBAGE WASTE GREASE AND STORAGE AREA; CLEAN, RODENT PROOF, ALL CONTAINERS COVERED - Comments: OUTSIDE GARBAGE AREA NOT RODENT PROOF OR ALL CONTAINERS COVERED. OBSERVED ONE OF THE OUTSIDE GARBAGE DUMPSTER WITH TRASH AND FOOD DEBRIS INSIDE, DUMPSTER NOT PROVIDED WITH LID. LID IS COMPLETELY MISSING FROM DUMPSTER CREATING RODENT NUISANCE. INSTRUCTED TO REPLACE MISSING DUMPSTER LID AND HAVE ALL LIDS RODENT PROOF, CLOSED AND TIGHT FITTING. SERIOUS CITATION ISSUED 7-38-020. | 34. FLOORS: CONSTRUCTED PER CODE, CLEANED, GOOD REPAIR, COVING INSTALLED, DUST-LESS CLEANING METHODS USED - Comments: FLOOR IN CORNERS BEHIND EQUIPMENT NOT CLEAN. INSTRUCTED TO DETAIL CLEAN. | 35. WALLS, CEILINGS, ATTACHED EQUIPMENT CONSTRUCTED PER CODE: GOOD REPAIR, SURFACES CLEAN AND DUST-LESS CLEANING METHODS - Comments: VENTILATION COVERS ABOVE PREP SINK NOT CLEAN. INSTRUCTED TO REMOVE DUST AND DETAIL CLEAN.,41.97989246,-87.80712701,(41.979892458487015, -87.80712701444871)"

            }
        }
        console.log(abc[285])
        for(var x= 0;x<abc.length;x++){
            noOfRecords += abc[x] + "\n";
        }

        fs.writeFile("space_inspection_modified.csv",noOfRecords, function (err) {
         if(!err){
         console.log("File saved.")
         }
         });


    });*/


//