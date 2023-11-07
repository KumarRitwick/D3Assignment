var mapGroup;
var path;
var svg;
var projection;
Width=1200;
Height=600;
function drawMap(data, townNumber){
    
    //For first time load
    if ((typeof svg == 'undefined') ){
        svg= d3.selectAll("p").append("svg")
        .attr("width",Width)
        .attr("height",Height);
     }  else {
         //Do Nothing
     }
     projection = d3.geoNaturalEarth1().translate([Width/2, Height/2])
     .scale(3000)
     .center([-5, 53]);
 
     path = d3.geoPath(projection);
 
     mapGroup = svg.append('g');
 
     mapGroup.selectAll('.country')
     .data(data.features)
     .enter().append('path')
     .attr('class', 'country')
     .attr('d', path);

     loadDataForTowns(townNumber);

}

function ChangeSlider(n){
	var slidervalue =  document.getElementById("SizeSlider").value;
	document.getElementById("SizeSlider").value = parseInt(slidervalue) + n;
	UpdateValue();
}

function UpdateValue(){
	var slidervalue =  document.getElementById("SizeSlider").value;
	var sliderDisplay = document.getElementById("slidernum");
	sliderDisplay.innerHTML = slidervalue;
  var slidervalue =  document.getElementById("SizeSlider").value;
  loadDataForMap(slidervalue);
}

function drawTowns(data){
    console.log("Data For Towns:: ", data);
    //Drawing Cities on UK Map
    //Remove Older Cities everytime there's an update.
    svg.selectAll("cities").transition().duration(600).style("opacity", 0).ease(d3.easeSinIn).remove();;
    svg.selectAll('.cities').remove();
    svg.selectAll('.cities')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'cities')
      .attr('r', function(d){return d.Population/16000})
      .attr('cx', function (d) {
        var coords = projection([d.lng, d.lat]);
        return coords[0];
      })

      .attr('cy', function (d) {
        var coords = projection([d.lng, d.lat]);
        return coords[1];
      })
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 0.7)
      .style("fill","#005f73");

    //Remove Older Cities everytime there's an update.
    svg.selectAll("city_name").transition().duration(600).style("opacity", 0).ease(d3.easeSinIn).remove();;
    svg.selectAll('.city_name').remove();
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
      })
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 0.7)
      .style("fill","#005f73");

}

function updateTownNumber(){
    var townNumber = document.getElementById("numberOfTowns").value;
    loadDataForMap(townNumber);
}

function loadDataForTowns(townNumber){
    if(townNumber == undefined)
        townNumber = 0;
    d3.json("http://34.38.72.236/Circles/Towns/"+ townNumber, function(error, data){
        if(error){
            console.log("Error in loading Town Populations:: ", error);
        }
        else{
          drawTowns(data);
        }
    });
}

function loadDataForMap(townNumber){
    d3.json("https://yamu.pro/gb.json", function(error, data){
        if(error){
            console.log("Error in Map Import:: ",error)
        }else{
            drawMap(data, townNumber);
        }
    })
}

window.onload = loadDataForMap;