// var svg;

// var map = svg.append("g").attr("class", "map");
// var projection = d3.geo.albers()
//     .origin([3.4,46.8])
//     .scale(12000)
//     .translate([590, 570]);

// var path = d3.geo.path().projection(projection);

// function d3Draw(dataset){
//     Width=1060;
//     Height=1060;
//     if ((typeof svg == 'undefined') ){
//     svg= d3.select("body").append("path")
//     .attr("width",Width)
//     .attr("Height",Height);
//     }  else {

//     }
//     var circles=svg.selectAll("circle")
//     .data(dataset)
//     .enter()
//     .append("circle");

//     circles.attr("cx", function(d){
//         return d.lng;
//     } )
//     .attr("cy",function(d){
//         return d.lat;
//     } )
//     .attr("r", function(d){
//         return d.Population/1000;
//     } );  
   
// }


// function d3Update(dataset){

// 	var circles=svg.selectAll("circle")
// 	.data(dataset)
// 	.transition()
// 	.duration(500)
// 	.ease("bounce");

// 	circles.attr("cx", function(d){
// 	    return d.lng;
// 	} )
// 	.attr("cy",function(d){
// 	    return d.lat;
// 	} )
// 	.attr("r", function(d){
// 	    return d.Population/1000;
// 	} );  
	   
// 	}

// var svg;

// function loadData(){

//     Width = 700;
//     Height = 700
//     svg= d3.select("body").append("svg")
//     .attr("width",Width)
//     .attr("Height",Height);

// 	d3.select(".imageDivision")
// 	.on("click",function(){
		
// 		updateData();
// 	});
//    d3.json("http://34.38.72.236/Circles/Towns/20",function(error,data){
//    if (error){
//       console.log(error)
//    }else{
//       d3Draw(data);
//       }
//    }
//    );
// }
 
// function updateData(){
  
//    d3.json("http://34.38.72.236/Circles/Towns/20",function(error,data){
//    if (error){
//       console.log(error)
//    }else{
//       d3Update(data);
//       }
//    }
//    );
// }

// window.onload= loadData;

// function d3Draw(data){
//     var map = svg.append("g").attr("class", "map");
//     var projection = d3.geo.albers()
//         .origin([3.4,46.8])
//         .scale(12000)
//         .translate([590, 570]);
//     var path = d3.geo.path().projection(projection);
//     d3.json('http://34.38.72.236/Circles/Towns/20', function(json) {
//         map.selectAll('path')
//             .data(json.features)
//         .enter().append('path').attr('d', path);
//         // now use the projection to project your coords
//         var coordinates = projection([mylon, mylat]);
//         map.append('svg:circle')
//             .attr('cx', coordinates[0])
//             .attr('cy', coordinates[1])
//             .attr('r', 5);
//     });
// }

function loadData(){
    var width = 900;
      var height = 600;

      var projection = d3.geo.mercator();
      
      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);
      var path = d3.geo.path()
          .projection(projection);
      var g = svg.append("g");
      
      d3.json("world-110m2.json", function(error, topology) {
          g.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries)
                .geometries)
          .enter()
            .append("path")
            .attr("d", path)
      });
}

window.onload = loadData;
    