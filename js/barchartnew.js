/*
s
In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 


// This creates an svg elemennt that is based off the width and height margin values

const svg3 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// barchart data
d3.csv("data/barchart.csv").then((data) => { 

    // d3.csv parses a csv file and passes the data
    // to an anonymous function. Note how we build
    // our visual inside of this anonymous function 
  
    // let's check our data
    console.log(data);   
  
/*

  Axes

*/ 
// This gets the max of the data2 points
let maxY2 = d3.max(data, function(d) { return d.score; });


// This scales the y values linearly so they all fit inside the page  
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

// This scales the x values similar to how the y values does
let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// This changes the graph to scale and transform to the y scale variable
svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

// This changes the graph to scale and transform to the x scale variable 
svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// This changes the opactity of the bar 
const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// This is the mouse over function that displays sthe name and data value
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// This creates a mouse move function
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// This creates the mouse leave function
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}

/* 

  Bars 

*/

// This creates the graph and adds the event listeners to it, the main functioning of this script
svg3.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) 
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);
})
