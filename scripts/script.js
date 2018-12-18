// 2. Use the margin convention practice 
let margin1 = {top: 50, right: 50, bottom: 50, left: 50}
    , width1 = 800
    , height1 = 600;

// The number of datapoints
let n = 23;

// 5. X scale will use the index of our data
let xScale = d3.scaleLinear()
    .domain([0, n - 1]) // input
    .range([0, width1]); // output

// 6. Y scale will use the randomly generate number 
let yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height1, 0]); // output

// 7. d3's line generator
let line = d3.line()
    .x(function (d, i) {
        return xScale(i);
    }) // set the x values for the line generator
    .y(function (d) {
        return yScale(d.y);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX); // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
let dataset = d3.range(n).map(function (d) {
    return {"y": d3.randomUniform(1)()}
});

// 1. Add the SVG to the page and employ #2
let svg1 = d3.select("#line-chart").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

// 3. Call the x axis in a group tag
svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height1 + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg1.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg1.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg1.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function (d, i) {
        return xScale(i)
    })
    .attr("cy", function (d) {
        return yScale(d.y)
    })
    .attr("r", 5)
    .on("mouseover", function (a, b, c) {
        console.log(a);
        this.attr('class', 'focus')
    })
    .on("mouseout", function () {
    });

// TODO
// TODO
// TODO

// let margin2 = {top: 20, right: 20, bottom: 70, left: 40},
//     width2 = 600 - margin2.left - margin2.right,
//     height2 = 300 - margin2.top - margin2.bottom;
//
// // Parse the date / time
// let parseDate = d3.time.format("%Y-%m").parse;
//
// let x = d3.scale.ordinal().rangeRoundBands([0, width2], .05);
//
// let y = d3.scale.linear().range([height2, 0]);
//
// let xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .tickFormat(d3.time.format("%Y-%m"));
//
// let yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10);
//
// let svg = d3.select("#bar-chart").append("svg")
//     .attr("width", width2 + margin2.left + margin2.right)
//     .attr("height", height2 + margin2.top + margin2.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin2.left + "," + margin2.top + ")");
//
// d3.csv("bar-data.csv", function (error, data) {
//
//     data.forEach(function (d) {
//         d.date = parseDate(d.date);
//         d.value = +d.value;
//     });
//
//     x.domain(data.map(function (d) {
//         return d.date;
//     }));
//     y.domain([0, d3.max(data, function (d) {
//         return d.value;
//     })]);
//
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height2 + ")")
//         .call(xAxis)
//         .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", "-.55em")
//         .attr("transform", "rotate(-90)");
//
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("Value ($)");
//
//     svg.selectAll("bar")
//         .data(data)
//         .enter().append("rect")
//         .style("fill", "steelblue")
//         .attr("x", function (d) {
//             return x(d.date);
//         })
//         .attr("width", x.rangeBand())
//         .attr("y", function (d) {
//             return y(d.value);
//         })
//         .attr("height", function (d) {
//             return height2 - y(d.value);
//         });
//
// });


// TODO

var w = 960,
    h = 500;

var vertices = d3.range(100).map(function (d) {
    return [Math.random() * w, Math.random() * h];
});

var svg = d3.select("#voronoi")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "PiYG")
    .on("mousemove", update);

svg.selectAll("path")
    .data(d3.geom.voronoi(vertices))
    .enter().append("svg:path")
    .attr("class", function (d, i) {
        return i ? "q" + (i % 9) + "-9" : null;
    })
    .attr("d", function (d) {
        return "M" + d.join("L") + "Z";
    });

svg.selectAll("circle")
    .data(vertices.slice(1))
    .enter().append("svg:circle")
    .attr("transform", function (d) {
        return "translate(" + d + ")";
    })
    .attr("r", 2);

function update() {
    vertices[0] = d3.svg.mouse(this);
    svg.selectAll("path")
        .data(d3.geom.voronoi(vertices)
            .map(function (d) {
                return "M" + d.join("L") + "Z";
            }))
        .filter(function (d) {
            return this.getAttribute("d") != d;
        })
        .attr("d", function (d) {
            return d;
        });
}