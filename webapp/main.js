const svg = d3.select("svg");

let DATA;

d3.json("indie_playlist.json").then(data => {
    console.log("Data loaded...");
    // console.log(data);

    // Create the table of data
    // d3.select('#data-table-body')
    //   .selectAll("tr")
    //   .data(data)
    //   .enter()
    //   .append("tr");

    DATA = data;

    // Plot the attributes
    let attrs_to_plot = [
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
    ];  // 14 categories

    const svg_width = 1200;
    const svg_height = 500;

    d3.select("#data-plots")
        .selectAll("svg")
        .data(attrs_to_plot)
        .enter()
        .append("svg")
        .attr("width", svg_width)
        .attr("height", svg_height)
        .attr("id", d => "plot_" + d)
        .append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width","100%")
        .attr("height","100%")
        .attr("fill","#ebebeb");

    const x_buffer = 25;
    const y_buffer = 25;

    const x_range = [
        0+x_buffer,
        svg_width-x_buffer
    ];
    const y_range = [
        svg_height-y_buffer,
        0+y_buffer
    ];

    for (let i = 0; i < attrs_to_plot.length; i++) {
        // Grab the attribute being plotted
        let attr = attrs_to_plot[i];

        // Grab the svg element
        let svg = d3.select("#plot_"+attr);

        // Create the scalers
        const scX = d3.scaleLinear()
                    .domain(d3.extent(data, (d, i) => i))
                    .range(x_range)
                    .nice();
        const scY = d3.scaleLinear()
                    .domain(d3.extent(data, d => d[attr]))
                    .range(y_range)
                    .nice();

        // Create the line generator
        let lineGenerator = d3.line()
            .curve(d3.curveCatmullRom)
            .x((d, i) => scX(i))
            .y((d, i) => scY(d[attr]));

        let path = lineGenerator(data);

        // Add the path
        svg.append("g")
            .attr("class","curve")
            .append("path")
            .attr("d", path)
            .attr('fill-opacity',0)
            .attr("stroke",'black')
            .attr('stroke-width',2)

        // Add the points
        svg.append("g")
            .attr("id", "points")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r",3)
            .attr('fill','black')
            .attr("cx", (d, i) => scX(i))
            .attr("cy", d => scY(d[attr]));



        // Add the title
        // svg.append("rect")
        //     .attr("x",x_buffer/2)
        //     .attr("y",y_buffer/2)
        //     .attr("width",x_buffer*10)
        //     .attr("height",y_buffer*5)
        //     .attr("fill","#525252");

        function format_title(t) {
            return t.split("_")
                .map(w => w[0].toUpperCase()+w.substring(1))
                .reduce((a,b) => a+" "+b);
        }

        svg.append("text")
            .text(format_title(attr))
            .attr("fill","#525252") // .attr("fill","#6bf23a")
            .style("font", "bold 30px sans-serif")
            .attr("x",20)
            .attr("y",40)
            .attr("width");


    }


});
