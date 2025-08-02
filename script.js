let sceneIndex = 0;
const scenes = [scene1, scene2, scene3]; //defined below

function init() {
  d3.csv("data/median_average_wages.csv").then(function(data) {
    data.forEach(d => {
      d.date = new Date(d.date);
      d.Year = +d.Year;
      d.Median = +d.Median;
      d.Average = +d.Average;
    });

    // Save data for use in all scenes
    window.wageData = data;

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



