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
});
