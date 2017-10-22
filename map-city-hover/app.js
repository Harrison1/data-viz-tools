d3.select(window)
        .on("resize", sizeChange);

var projection = d3.geo.albersUsa()
    .scale(1100);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map")
    .append("svg")
    .attr("width", "100%")
        .append("g");

d3.json("us-states.json", function(error, us) {
    svg.selectAll(".states")
    .data(topojson.object(us, us.objects.states).geometries)
    .enter().append("path")
    .attr("class", "states")
    .attr("d", path);
});
    

function sizeChange() {
    d3.select("g").attr("transform", "scale(" + $("#map").width()/900 + ")");
    $("svg").height($("#map").width()*0.618);
}

// Append Div for tooltip to SVG
var div = d3.select("body")
            .append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);

    // d3.csv("cities-lived.csv", function(data) {
    setTimeout(function() {
    d3.json("cities-lived.json", function(data) {
        data.forEach(function(d) {
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return projection([d.lng, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lng, d.lat])[1];
                })
                .attr("r", function(d) {
                    return Math.sqrt(d.price) * 4;
                })
                    .style("fill", "rgb(217,91,67)")	
                    .style("opacity", 0.85)	
            
                .on("mouseover", function(d) {      
                    div.transition()        
                        .duration(200)      
                    .style("opacity", .9);      
                    div.html('<p>City:'+d.city+'</p><p>Price: $'+d.price.toFixed(2)+'</p>')
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY - 28) + "px");    
                })   
            
                // fade out tooltip on mouse out               
                .on("mouseout", function(d) {       
                    div.transition()        
                    .duration(500)      
                    .style("opacity", 0);
                });
        });
        
    })
}, 1000)
    

    

$( document ).ready(function() {
    

    function populateMap(val) {
        $('#map').html('');

        projection = d3.geo.albersUsa()
        .scale(1100);

        path = d3.geo.path()
            .projection(projection);
    
        svg = d3.select("#map")
            .append("svg")
            .attr("width", "100%")
                .append("g");
        
        d3.json("us-states.json", function(error, us) {
            svg.selectAll(".states")
            .data(topojson.object(us, us.objects.states).geometries)
            .enter().append("path")
            .attr("class", "states")
            .attr("d", path);
        });

        // Append Div for tooltip to SVG
        div = d3.select("body")
        .append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

        sizeChange();

        axios.get('https://api.mlab.com/api/1/databases/data-items/collections/datas?q={"item": "' + val +'"}&apiKey=i1JBzVTUX-8jEq_wjl9gGQjuvj2MthLo').then(function(res) {
            console.log(res.data)
            
            drawCities(res.data[0].values)
        }).catch(function(err) {
            console.log(err)
        })
    }
});