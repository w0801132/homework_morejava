function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

d3.json(`./metadata/${sample}`).then(data) => {
  var panelThing = d3.select("#sample-metadata");
  panelThing.html("");
  Object.entries(data).forEach([key, value]) => {
    panelThing.append("h6").text(`${key}: ${value}`);
  });
});
}



function buildCharts(sample) {
  d3.json(`./samples/${sample}`).then(data) => {
    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;
    var sample_values = data.sample_values;

    var bubbleCrap = {
      margin: {t:0},
      hovermode: "closest"
      // the documentation says the default is closest?
      xaxis: {title: "They Made Me Do This"}
    };

    var bubbleInfo = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids
      }
    }];

    Plotly.plot("bubble", bubbleInfo, bubbleCrap);




    var pieJunk = [{
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      hovertext: otu_labels.slice(0,10),
      hoverinfo: otu_labels.slice(0.10),
      type: "pie"
    }];

    var pieWhatever = {
      margin: {t:0, l:0}
    };

    Plotly.plot("pie", pieJunk, pieWhatever);
  });
}

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).



    d3.json(data).then(function(response) {

        console.log(response);
        var trace = {
          type: "scatter",
          mode: "markers",
          name: "Bellybutton Crap? I don't know.",
          x: response.map(data => data.year),
          y: response.map(data => data.sightings),
          line: {
            color: "#17BECF"
          }
        };

        var data = [trace];

        var layout = {
          title: "Something About Nasty Stuff",
          xaxis: {
            type: "date"
          },
          yaxis: {
            autorange: true,
            type: "bubble"
          }
        };

        Plotly.newPlot("plot", data, layout);
      });
    }



}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
