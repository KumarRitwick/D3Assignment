function drawMap(data, townNumber){
    var mapGroup;
    var path;
    var svg = undefined;
    Width=700;
    Height=600;
    //For first time load
    if ((typeof svg == 'undefined') ){
        svg= d3.selectAll("p").append("svg")
        .attr("width",Width)
        .attr("height",Height);
     }  else {
         //Do Nothing
         debugger;
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

     loadDataForTowns(svg, mapGroup, path, projection, townNumber);

}

function drawTowns(data, svg, mapGroup, path, projection){
    console.log("Data For Towns:: ", data);
    //Drawing Cities on UK Map

    svg.selectAll('.cities')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'cities')
      .attr('r', 5)
      .attr('cx', function (d) {
        var coords = projection([d.lng, d.lat]);
        return coords[0];
      })

      .attr('cy', function (d) {
        var coords = projection([d.lng, d.lat]);
        return coords[1];
      });

    // Add city names to map
    svg.selectAll('.city_name')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'city_name')
      .attr('x', function (d) {
        var coords = projection([d.lng, d.lat]);
        return coords[0] + 10;
      })

      .attr('y', function (d) {
        var coords = projection([d.lng, d.lat]);
        return coords[1];
      })

      .text(function (d) {
        return d.Town;
      });

}

function updateTownNumber(){
    var townNumber = document.getElementById("numberOfTowns").value;
    loadDataForMap(townNumber);
    // loadDataForTowns(townNumber);
}

function loadDataForTowns(svg, mapGroup, path, projection, townNumber){
    if(townNumber == undefined)
        townNumber = 0;
    d3.json("http://34.38.72.236/Circles/Towns/"+ townNumber, function(error, data){
        if(error){
            console.log("Error in loading Town Populations:: ", error);
        }
        else{
            drawTowns(data,svg, mapGroup, path, projection);
        }
    });
}

function loadDataForMap(townNumber){
    // d3.select("p").on("click", function(){
    //     // updateData();
    // });
    d3.json("https://yamu.pro/gb.json", function(error, data){
        if(error){
            console.log("Error in Map Import:: ",error)
        }else{
            drawMap(data, townNumber);
        }
    })
}

window.onload = loadDataForMap;