function drawMap(data){
    var mapGroup;
    var path;
    var svg;
    Width=700;
    Height=600;
    //For first time load
    if ((typeof svg == 'undefined') ){
        svg= d3.select("body").append("svg")
        .attr("width",Width)
        .attr("height",Height);
     }  else {
         //Do Nothing
     }
     var projection = d3.geoNaturalEarth1().translate([Width/2, Height/2])
     .scale(3000)
     .center([-5, 53]);
 
     path = d3.geoPath(projection);
 
     mapGroup = svg.append('g');
 
     mapGroup.selectAll('.country')
     .data(data.features)
     .enter().append('path')
     .attr('class', 'country')
     .attr('d', path);

     loadDataForTowns(svg, mapGroup, path);

}

function drawTowns(data, svg, mapGroup, path){
    // console.log(data);

}

function loadDataForTowns(svg, mapGroup, path){
    d3.json("http://34.38.72.236/Circles/Towns/5", function(error, data){
        if(error){
            console.log("Error in loading Town Populations:: ", error);
        }
        else{
            drawTowns(data,svg, mapGroup, path);
        }
    });
}

function loadDataForMap(){
    // d3.select("p").on("click", function(){
    //     // updateData();
    // });
    d3.json("https://yamu.pro/gb.json", function(error, data){
        if(error){
            console.log("Error in Map Import:: ",error)
        }else{
            drawMap(data);
        }
    })
}

window.onload = loadDataForMap;