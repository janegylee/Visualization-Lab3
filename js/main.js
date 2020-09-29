/* main JS file */

// 1. Scatter plot
var rowConverter = function(d) {
    return {
      city: d.city,
      country: d.country,
      eu: d.eu,
      population: +d.population,
      x: +d.x,
      y: +d.y
    };
  };

// Displaying number of European cities
  var numCountries = x => {
    d3
      .select(".city-count")
      .append("p")
      .text("Number of Cities: " + x );
  };
  
  // Processing & Rendering from .csv
  var dataset;
  d3.csv("cities.csv")
    .then(function(data) {
      data.map(rowConverter);
      dataset = data.filter(d => {
        if (d.eu == "true") {
          return d;
        }
      });
  
      numCountries(dataset.length);
      var drawingArea = d3
        .select(".population-plot")
        .append("svg")
        .attr("width", "700")
        .attr("height", "550");
      circles(dataset);
      labels(dataset);
    })
    .catch(function(error) {});
  

  
  // Circles for cities
  var circles = cities => {
    d3
      .select("svg")
      .selectAll("circle")
      .data(cities)
      .enter()
      .append("circle")
  
      .attr("cx", d => {
        return d.x;
      })
      .attr("cy", d => {
        return d.y;
      })
      .attr("r", d => {
        return d.population >= 1000000 ? "8" : "4";
      })
      .attr("fill", "dodgerblue")

  };
  
  // Labels for large cities
  var labels = cities => {
    d3
      .select("svg")
      .selectAll("text")
      .data(cities)
      .enter()
      .append("text")
      .text(d => {
        return d.country;
      })
      .attr("class", "city-label")
      .attr("fill", "black")
      .attr("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("x", d => {
        return d.x;
      })
      .attr("y", d => {
        return d.y - 12;
      })
      .attr("opacity", d => {
        return d.population >= 1000000 ? 1 : 0;
        
      });
  };

 


//2. Bar chart

//Processing & Rendering
  d3.csv("buildings.csv", d3.autoType)
    .then(data => {    
      data.sort((a,b) => b.height_m-a.height_m);
      
      var drawingArea = d3
        .select(".building-height")
        .append("svg")
        .attr("width", "500")
        .attr("height", "500"); 

//Rectangles
      drawingArea
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","bar")
        .attr("width",d => d.height_px)
        .attr("height", 30)
        .attr("y", function(d,i){
          var barHeight = (i*34);
          return barHeight + "px";
        })
        .attr("x",230)
        .attr("fill", "orange")

//Onclick-Building details
        .on("click", function(d) {
          d3.selectAll(".image")
            .attr("src","img/" + d.image)
            .attr("height", 340)
            .attr("width", 230) 
                
          d3.selectAll(".building-name")
            .text(() => {
              return (d.building);
            })
          d3.selectAll(".height")
            .text(() => {
              return (d.height_ft);
            })       
          d3.selectAll(".city")
            .text(() => {
              return (d.city);
            })       
          d3.selectAll(".country")
            .text(() => {
             return (d.country);
            })        
          d3.selectAll(".floors")
            .text(() => {
             return (d.floors);
            })
          d3.selectAll(".completed")
            .text(() => {
             return (d.completed);
            });
          
        })       
    
//Text
      drawingArea
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y",function(d,i){
        var barHeight = (i*34 +19);
        return barHeight + "px";
        })
        .text(d => {
        return d.building;
        })
        .attr("font-size", "14")
        .attr("font-family", "Arial")

      drawingArea
        .selectAll("text.height")
        .data(data)
        .enter()
        .append("text")
        .attr("x",d => d.height_px +213)
        .attr("y",function(d,i){
          var barHeight = (i*34 +19);
          return barHeight + "px";
          })
        .text(d => {
          return d.height_ft + " ft"
        })
        .attr("font-size", "13")
        .attr("font-family", "Arial")
        .attr("fill", "white")
        .attr("text-anchor","end")

    }); 
      
   
  







