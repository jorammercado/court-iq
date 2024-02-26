import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MyGraph = () => {
    const graphRef = useRef(null);

    useEffect(() => {
        // set the dimensions and margins of the graph
        var margin = { top: 60, right: 90, bottom: 50, left: 50 },
            width = 760 - margin.left - margin.right,
            height = 375 - margin.top - margin.bottom;

        // Check if graph has already been rendered
        if (!graphRef.current) {
            // append the svg object to the body of the page
            var svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Define the data
            const data = [
                {
                    x: 1,
                    points: 38,
                    rebounds: 19,
                    assists: 9,
                    blocks: 4,
                    threePoints: 3,
                    plusMinus: 2,
                    minutes: 5
                },
                {
                    x: 2,
                    points: 16,
                    rebounds: 14,
                    assists: 96,
                    blocks: 40,
                    threePoints: 7,
                    plusMinus: 9,
                    minutes: 10
                },
                {
                    x: 3,
                    points: 64,
                    rebounds: 96,
                    assists: 64,
                    blocks: 40,
                    threePoints: 23,
                    plusMinus: 1,
                    minutes: 8
                },
                {
                    x: 4,
                    points: 32,
                    rebounds: 48,
                    assists: 64,
                    blocks: 40,
                    threePoints: 2,
                    plusMinus: 20,
                    minutes: 11
                },
                {
                    x: 5,
                    points: 12,
                    rebounds: 18,
                    assists: 14,
                    blocks: 10,
                    threePoints: 2,
                    plusMinus: 4,
                    minutes: 13
                },
            ];

            //////////
            // GENERAL //
            //////////

            // List of groups
            var keys = Object.keys(data[0]).filter(key => key !== 'x');

            // Color palette
            var color = d3.scaleOrdinal()
                .domain(keys)
                .range(d3.schemeSet2);

            // Store visibility status of each group
            var visible = {
                points: true,
                rebounds: true,
                assists: true,
                blocks: true,
                threePoints: true,
                plusMinus: true,
                minutes: true
            };

            //////////
            // AXIS //
            //////////

            // Add X axis
            var x = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return d.x; }))
                .range([0, width]);
            var xAxis = svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5));

            // Add X axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + 40)
                .text("Games");

            // Add Y axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", 0)
                .attr("y", -20)
                .text("#")
                .attr("text-anchor", "start");

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y).ticks(5));

            //////////
            // CHART //
            //////////

            // Create clip path
            // var clipPath = svg.append("defs")
            //   .append("clipPath")
            //   .attr("id", "clip")
            //   .append("rect")
            //   .attr("width", width)
            //   .attr("height", height);

            // Area generator with curve interpolation
            var area = d3.area()
                .x(function (d) { return x(d.x); })
                .y0(function () { return y(0); }) // Fix y0 position
                .y1(function (d) { return y(d.value); })
                .curve(d3.curveCardinal);

            // Show the areas
            keys.forEach(key => {
                svg.append("path")
                    .datum(data)
                    .attr("fill", color(key))
                    .attr("fill-opacity", 0.5)
                    .attr("stroke", color(key))
                    .attr("stroke-width", 2)
                    .attr("class", key) // Added class for each path
                    .attr("d", area.y1(function (d) { return y(d[key]); })(data))
                    .style("opacity", visible[key] ? 1 : 0);
            });

            // Add the points
            keys.forEach(key => {
                svg.selectAll("." + key + "Point")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", key + "Point")
                    .attr("cx", function (d) { return x(d.x); })
                    .attr("cy", function (d) { return y(d[key]); })
                    .attr("r", 5)
                    .style("fill", color(key))
                    .style("opacity", visible[key] ? 1 : 0);
            });

            //////////
            // LEGEND //
            //////////

            // Add legend dots
            var legend = svg.selectAll(".legend")
                .data(keys)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width + 10)
                .attr("y", function (d, i) { return i * 20; })
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", color);

            // Add checkbox squares
            legend.append("rect")
                .attr("x", width + 10)
                .attr("y", function (d, i) { return i * 20; })
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", color)
                .style("stroke", color)
                .style("stroke-width", 2)
                .on("click", function (event, d) {
                    // Toggle visibility
                    visible[d] = !visible[d];

                    // Update path and point visibility
                    svg.selectAll("." + d)
                        .transition()
                        .duration(500)
                        .style("opacity", visible[d] ? 1 : 0);

                    svg.selectAll("." + d + "Point")
                        .transition()
                        .duration(500)
                        .style("opacity", visible[d] ? 1 : 0);

                    // Toggle checkmark
                    if (visible[d]) {
                        d3.select(this).style("fill", color);
                    } else {
                        d3.select(this).style("fill", "white");
                    }
                });

            legend.append("text")
                .attr("x", width + 30)
                .attr("y", function (d, i) { return i * 20 + 9; })
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .text(function (d) { return d; });

            //////////
            // BRUSHING AND CHART //
            //////////

            // Add brushing
            var brush = d3.brushX()
                .extent([[0, 0], [width, height]])
                .on("end", updateChart);

            svg.append("g")
                .attr("class", "brush")
                .call(brush)
                .call(brush.move, [0, width]); // Initially show the full chart

            var idleTimeout;
            function idled() { idleTimeout = null; }

            // A function that updates the chart for given boundaries
            function updateChart(event) {
                var extent = event.selection;

                // If no selection, back to initial coordinate. Otherwise, update X axis domain
                if (!extent) {
                    if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                    x.domain(d3.extent(data, function (d) { return d.x; }));
                } else {
                    x.domain([x.invert(extent[0]), x.invert(extent[1])]);
                    svg.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
                }

                // Update axis and area position
                xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));

                keys.forEach(key => {
                    svg.select("." + key)
                        .transition().duration(1000)
                        .attr("d", area.y0(y(0)).y1(function (d) { return y(d[key]); })(data));
                });

                // Update points
                keys.forEach(key => {
                    svg.selectAll("." + key + "Point")
                        .attr("cx", function (d) { return x(d.x); })
                        .attr("cy", function (d) { return y(d[key]); });
                });
            }

            // Set the graphRef to true so it won't render again
            graphRef.current = true;
        }
    }, []);

    return (
        <div id="my_dataviz"></div>
    );
};

export default MyGraph;
