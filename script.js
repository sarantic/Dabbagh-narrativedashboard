let sceneIndex = 0;
const scenes = [scene1, scene2, scene3]; //defined below

function init() {
  d3.csv("data/DailyDelhiClimateTest.csv").then(function(data) {
    data.forEach(d => {
      d.date = new Date(d.date);
      d.mean_temperature = +d.mean_temperature;
      d.humidity = +d.humidity;
      d.wind_speed = +d.wind_speed;
    });

    // Save data for use in all scenes
    window.climateData = data;

    // Start with the first scene
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
  d3.select("#vis").html(""); // clear the container
  const svg = d3.select("#vis").append("svg")
                .attr("width", 600)
                .attr("height", 400);

  const data = window.climateData;

  // Temperature line chart
  const x = d3.scaleTime().range([50, 550]).domain(d3.extent(data, d => d.date));
  const y = d3.scaleLinear().range([350, 50]).domain(d3.extent(data, d => d.mean_temperature));

  const line = d3.line()
                 .x(d => x(d.date))
                 .y(d => y(d.mean_temperature));

  svg.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 2)
     .attr("d", line);

  svg.append("text")
     .attr("x", 50)
     .attr("y", 30)
     .text("Daily Mean Temperature in Delhi");
}


