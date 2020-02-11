const svg = d3.select("svg");

let DATA;

d3.json("indie_playlist.json").then(data => {
    console.log("Data loaded...");
    console.log(data);

    DATA = JSON.stringify(data);

    // Create the table of data
    d3.select('#data-table-body')
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr");

    // Plot the attributes
    let atts_to_plot = [
        "duration_ms",
        "popularity",
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "key",
        "liveness",
        "loudness",
        "mode",
        "speechiness",
        "tempo",
        "time_signature",
        "valence"
    ];

    function make_attr_plot(container, attr) {

    }

    console.log("Plotting playlist energy...");
    let playlist_length = data.length;
    let max_energy = data[0].energy;
    let min_energy = data[0].energy;
    for (let i = 1; i < data.length; i++) {
        let e = data[i].energy;
        if (e > max_energy) max_energy = e;
        if (e < min_energy) min_energy = e;
    }

    function map(v,in_min,in_max,out_min,out_max) {
        let p = (v - in_min) / (in_max - in_min);
        return p * (out_max - out_min) + out_min;
    }

    function mapX(v) {
        return map(v,0,playlist_length,25,1200-25);
    }

    function mapY(v) {
        return map(v,min_energy,max_energy,375,25);
    }

    let energyData = [];
    for (let i = 0; i < data.length; i++) {
        energyData.push([mapX(i), mapY(data[i].energy)]);
    }
    let lineGenerator = d3.line()
        .curve(d3.curveCardinal);
    let energyPath = lineGenerator(energyData);

    svg.select("path")
        .attr("d", energyPath)
        .attr('fill-opacity',0)
        .attr("stroke",'black')
        .attr('stroke-width',2)

    svg.select("#points")
        .selectAll("circle")
        .data(JSON.parse(DATA))
        .enter()
        .append("circle")
        .attr("r",4)
        .attr('fill','black')
        .attr("cx", (d, i) => {
            return mapX(i);
        }).attr("cy", (d) => {
            return mapY(d.energy);
        });

    const table_columns = [
        "artist",
        "name",
        "duration_ms",
        "popularity",
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "key",
        "liveness",
        "loudness",
        "mode",
        "speechiness",
        "tempo",
        "time_signature",
        "valence"
    ];

    const table_data = JSON.parse(DATA);

    d3.select("thead")
        .selectAll("th")
        .data(table_columns)
        .enter()
        .append("th")
        .text((d,i) => {
            return d.replace("_"," ").split(" ").map(w => w[0].toUpperCase() + w.substring(1)).reduce((a,b) => a + " " + b);
        })


    d3.select("tbody")
        .selectAll("tr")


});
