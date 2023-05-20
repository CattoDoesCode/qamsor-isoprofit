// dimensions
const margin = { top: 16, right: 16, bottom: 16, left: 24 };
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// max scales for x and y
const scaleMax = getScaleMax();

// x and y scales
const x = d3.scaleLinear().domain([0, scaleMax]).range([0, width]);

const y = d3.scaleLinear().domain([0, scaleMax]).range([height, 0]);

// SVG element
const svg = d3
  .select("#d3-line-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// x and y axes
svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

svg.append("g").call(d3.axisLeft(y));

// =========================================================================

// main line dataset
const mainline_dataset = getCoordinates_maineLine(constraint_1);

// main line generator
const main_line = d3
  .line()
  .x((d) => x(d.x))
  .y((d) => y(d.y));

// Add the main line path to the SVG element
svg
  .append("path")
  .datum(mainline_dataset)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", main_line);

// =========================================================================

// x1 dataset
const x1 = getCoordinates_x1(scaleMax);

// x1 line generator
const x1_line = d3
  .line()
  .x((d) => x(d.x))
  .y((d) => y(d.y));

// Add the main line path to the SVG element
svg
  .append("path")
  .datum(x1)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", x1_line);

// =========================================================================

// y1 dataset
const y1 = getCoordinates_y1(scaleMax);

// x1 line generator
const y1_line = d3
  .line()
  .x((d) => x(d.x))
  .y((d) => y(d.y));

// Add the main line path to the SVG element
svg
  .append("path")
  .datum(y1)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1)
  .attr("d", y1_line);

// =========================================================================

// intersection points dataset
const points = [
  [getCoordinates_y1(scaleMax)[0].x, getCoordinates_y1(scaleMax)[0].y],
  calculateIntersectionPoints(constraints)[1],
  calculateIntersectionPoints(constraints)[0],
  [getCoordinates_x1(scaleMax)[0].x, getCoordinates_x1(scaleMax)[0].y],
];

// Append circles representing the intersection points
svg
  .selectAll("circle")
  .data(points)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(d[0]))
  .attr("cy", (d) => y(d[1]))
  .attr("r", 5)
  .attr("fill", "black");

// Append text labels beside the circles
svg
  .selectAll(null)
  .data(points)
  .enter()
  .append("text")
  .attr("x", (d) => x(d[0]) + 10)
  .attr("y", (d) => y(d[1]) - 10)
  .text((d) => `(${d[0]}, ${d[1]})`)
  .attr("fill", "black")
  .attr("font-size", "12px");

// =========================================================================

// feasible region dataset
const feasibleRegionCoordinates = [
  getCoordinates_feasibleRegion(
    calculateIntersectionPoints(constraints)[0],
    calculateIntersectionPoints(constraints)[1]
  ),
];

// Append feasible region text
svg
  .selectAll(null)
  .data(feasibleRegionCoordinates)
  .enter()
  .append("text")
  .attr("x", (d) => x(d[0]) - 25)
  .attr("y", (d) => y(d[1]))
  .text("feasible region")
  .attr("fill", "black")
  .attr("font-size", "12px");

// =========================================================================

// feasible region highlight dataset
var feasible_region = [
  [0, 0],
  [getCoordinates_y1(scaleMax)[0].x, getCoordinates_y1(scaleMax)[0].y],
  calculateIntersectionPoints(constraints)[1],
  calculateIntersectionPoints(constraints)[0],
  [getCoordinates_x1(scaleMax)[0].x, getCoordinates_x1(scaleMax)[0].y],
];

// Create a path generator
var lineFunction = d3
  .line()
  .x(function (d) {
    return x(d[0]);
  })
  .y(function (d) {
    return y(d[1]);
  })
  .curve(d3.curveLinearClosed);

// Create a path element and set its attributes
var path = svg
  .append("path")
  .attr("d", lineFunction(feasible_region))
  .attr("fill", "cyan")
  .attr("opacity", 0.1)
  .lower();
