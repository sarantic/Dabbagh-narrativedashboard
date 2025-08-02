let sceneIndex = 0;
const scenes = [scene1, scene2]; //defined below

function init() {
  d3.csv("data/median_average_wages.csv").then(function(data) {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Median = +d.Median;
      d.Average = +d.Average;
    });

    window.wageData = data;
    scenes[sceneIndex]();
  });
}


function nextScene() {
  sceneIndex = (sceneIndex + 1) % scenes.length;
  scenes[sceneIndex]();
}

function prevScene() {
  sceneIndex = (sceneIndex - 1 + scenes.length) % scenes.length;
  scenes[sceneIndex]();

}
function scene1() {
  d3.select("#vis").html(""); // clear

  d3.select("#vis")
    .append("div")
    .attr("class", "intro-text")
    .html(`
      <h2>Wage Growth in the United States</h2>
      <p>Over the past five decades, how have average and median wages changed?</p>
      <p>Let's explore how this affects everyday workers, starting in 1973.</p>
    `);
}
function scene2() {
  d3.select("#vis").html(""); // clear container

  const svg = d3.select("#vis").append("svg")
                .attr("width", 700)
                .attr("height", 400);

  const data = window.wageData;

  const x = d3.scaleLinear().domain(d3.extent(data, d => d.Year)).range([50, 650]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Average)]).range([350, 50]);

  const line = d3.line()
                 .x(d => x(d.Year))
                 .y(d => y(d.Average));
  const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(y);

  svg.append("g")
   .attr("transform", "translate(0,350)")
   .call(xAxis);

  svg.append("g")
   .attr("transform", "translate(50,0)")
   .call(yAxis);


  svg.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "orange")
     .attr("stroke-width", 2)
     .attr("d", line);

  svg.append("text")
     .attr("x", 50)
     .attr("y", 30)
     .text("Average Hourly Wages Over Time");
}




