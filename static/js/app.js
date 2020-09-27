function getGraphs(id) {
  // Use the d3 library to read in samples.json
  d3.json("./samples.json").then(function (data) {
    console.log(data);

    var ids = data.samples[0].otu_ids;
    console.log(ids);
    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    console.log(sampleValues);
    var labels = data.samples[0].otu_labels.slice(0, 10);
    console.log(labels);
    // get only top 10 otu ids in reverse
    var otuTop = data.samples[0].otu_ids.slice(0, 10).reverse();
    // get the otu ids for tick marks
    var otuID = otuTop.map((d) => "OTU " + d);
    console.log(`OTU IDS: ${otuID}`);

    var trace1 = {
      type: "bar",
      x: sampleValues,
      y: otuID,
      text: labels,
      orientation: "h",
    };
    var plotData = [trace1];

    var layout = {
      yaxis: {
        tickmode: "linear",
      },
    };

    Plotly.newPlot("bar", plotData, layout);

    // create the bubble chart
    var trace2 = {
      x: data.samples[0].otu_ids,
      y: data.samples[0].sample_values,
      mode: "markers",
      marker: {
        size: data.samples[0].sample_values,
        color: data.samples[0].otu_ids,
      },
      text: data.samples[0].otu_labels,
    };

    // set the layout for the bubble plot
    var layout2 = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000,
    };

    // creating data variable
    var data2 = [trace2];

    // create the bubble plot
    Plotly.newPlot("bubble", data2, layout2);
  });
}

// create the function for the metadata
function getMeta(id) {
  // read in the data from the json
  d3.json("./samples.json").then((data) => {
    // get the metadata info
    var metadata = data.metadata;

    console.log(metadata);

    // filter meta data info by id
    var result = metadata.filter((meta) => meta.id.toString() === id)[0];
    // select demographic panel
    var demographicInfo = d3.select("#sample-metadata");

    // clear the panel each time its ran
    demographicInfo.html("");

    // grab the necessary demographic data and append
    Object.entries(result).forEach((key) => {
      demographicInfo
        .append("h5")
        .text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
  });
}
// create the function for the change event
function changeHandler(id) {
  getGraphs(id);
  getMeta(id);
}

// create the function for the initial data rendering
function init() {
  // select dropdown menu
  var dropdown = d3.select("#selDataset");

  // read the data
  d3.json("samples.json").then((data) => {
    console.log(data);

    // create dropdown menu with data
    data.names.forEach(function (name) {
      dropdown.append("option").text(name).property("value");
    });

    // display plots
    getGraphs(data.names[0]);
    getMeta(data.names[0]);
  });
}

init();
