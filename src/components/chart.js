import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

// import {drawChart, initChart} from '../utils/drawChart'

const Chart = ({ width, height, dataSet }) => {
  const timeData = dataSet.map((x) => x.usageDate);
  dataSet = dataSet.map(
    ({ usageDate, percentage }) => ({ usageDate, percentage }),
    { y: " %" }
  );
  const ref = useRef();

  useEffect(() => {
    let margin = { top: 20, right: 30, bottom: 30, left: 40 };
    let x = d3
      .scaleBand()
      .domain(timeData)
      .range([margin.left, width - margin.right])
      .padding(0.1)

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(dataSet, (d) => d.percentage)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    let xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3
          .axisBottom(x)
          .tickSizeOuter(0)
      );

    let yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("percentage")
        );

     
        function zoom(svg) {
          const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
        
          svg.call(d3.zoom()
              .scaleExtent([1, 8])
              .translateExtent(extent)
              .extent(extent)
              .on("zoom", zoomed));
        
          function zoomed() {
            x.range([margin.left, width - margin.right].map(d => d3.event.transform.applyX(d)));
            svg.selectAll(".bars rect").attr("x", d => x(d.usageDate)).attr("width", x.bandwidth());
            svg.selectAll(".x-axis").call(xAxis);
          }
        }

    const svg = d3
      .select(ref.current)
      .attr("viewBox", [0, 0, width, height])
      .call(zoom)

        // ucoment this to get bar graph
    svg
      .append("g")
        .attr("class", "bars")
        .attr("fill", "steelblue")
      .selectAll("rect")
      .data(dataSet)
      .join("rect")
        .attr("x", (d) => x(d.usageDate))
        .attr("y", (d) => y(d.percentage))
        .attr("height", (d) => y(0) - y(d.percentage))
        .attr("width", x.bandwidth());
   
             //uncomment this to get line graph
    // svg.append("path")
    //     .datum(dataSet)
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", 1.5)
    //     .attr("stroke-linejoin", "round")
    //     .attr("stroke-linecap", "round")
    //     .attr("d", line);

    svg.append("g")
      .attr("class", "x-axis")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);
  
  }, [dataSet, height, timeData, width]);

  return (
    <div>
      <h2>Graphs with React</h2>
      <div className="chart">
        <svg ref={ref}></svg>
      </div>
    </div>
  );
};
export default Chart;
