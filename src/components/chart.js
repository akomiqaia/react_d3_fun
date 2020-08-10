import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

// import {drawChart, initChart} from '../utils/drawChart'

const Chart = ({ width, height, dataSet }) => {
  const timeData = dataSet.map((x) => x.usageDate);
  console.log(timeData.map(x => new Date(x)))
  dataSet = dataSet.map(
    ({ usageDate, percentage }) => ({ usageDate, percentage }),
    { y: " %" }
  );
  const ref = useRef();

  useEffect(() => {
    let margin = { top: 20, right: 30, bottom: 30, left: 40 };
    let x = d3
      .scaleUtc()
      .domain(d3.extent(dataSet, d => new Date(d.usageDate)))
      .range([margin.left, width - margin.right])

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(dataSet, (d) => d.percentage)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    let xAxis = (g) =>
      g
      .attr("class", "x-axis")
      .attr("clip-path", "url(#clip)")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3
        .axisBottom(x)
        .tickSizeOuter(0)
        );
        
    let yAxis = (g) =>
    g
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
        
      
        

    const svg = d3
      .select(ref.current)
      .attr("viewBox", [0, 0, width, height])
      .call(zoom)

    svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("width", width - margin.right)
      .attr("height", height);
   
    const line = d3.line()
        .defined(d => !isNaN(d.percentage))
        .x(d => x(d.usageDate))
        .y(d => y(d.percentage))

    svg.append("path")
        .datum(dataSet)
        .attr("class", "path")
        .attr("fill", "none")
        .attr("clip-path", "url(#clip)")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    function zoom(svg) {
        const extent = [
          [margin.left, margin.top], 
          [width - margin.right, height - margin.top]
        ];
      
        svg.call(d3.zoom()
            .scaleExtent([1, 3])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", zoomed));
      
        function zoomed() {
          x.range([margin.left, width - margin.right].map(d => d3.event.transform.applyX(d)));
          svg.select("path").attr("d", line)
          svg.select(".x-axis").call(d3.axisBottom(x).tickSizeOuter(0));
        }
      }
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
