import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

// import {drawChart, initChart} from '../utils/drawChart'

const Chart = ({ width, height, dataSet, dimensions }) => {
  const percentageData = dataSet.map((x) => x.percentage);
  const timeData = dataSet.map((x) => x.usageDate);
  const ref = useRef();
  useEffect(() => {
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
    
    const svg = d3
      .select(ref.current)
      .attr("viewBox", [0, 0, width, height])

    const bounds = svg.append("g")
      .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)
      
    const background = bounds.append("g")

    // init static elements
    bounds.append("g")
      .attr("class", "bins")
  bounds.append("line")
      .attr("class", "mean")
  bounds.append("g")
      .attr("class", "x-axis")
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .append("text")
      .attr("class", "x-axis-label")
  })

  // useEffect(() => {
  //   let margin = ({top: 20, right: 30, bottom: 30, left: 40})
  //   let x = d3.scaleUtc()
  //   .domain(d3.extent(dataSet, d => d.usageDate))
  //   .range([margin.left, width - margin.right])

  // let y = d3.scaleLinear()
  //   .domain([0, d3.max(dataSet, d => d.percentage)]).nice()
  //   .range([height - margin.bottom, margin.top])

  //   let xAxis = g => g
  //   .attr("transform", `translate(0,${height - margin.bottom})`)
  //   .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    
  //   let yAxis = g => g
  //   .attr("transform", `translate(${margin.left},0)`)
  //   .call(d3.axisLeft(y))
  //   .call(g => g.select(".domain").remove())
  //   .call(g => g.select(".tick:last-of-type text").clone()
  //   .attr("x", 3)
  //   .attr("text-anchor", "start")
  //   .attr("font-weight", "bold")
  //   .text(dataSet.y))
    
  //   const line = d3.line()
  //     .defined(d => !isNaN(d.percentage))
  //     .x(d => x(d.usageDate))
  //     .y(d => y(d.percentage))
      
  //   const svg = d3
  //     .select(ref.current)
  //     .attr("viewBox", [0, 0, width, height])

  //     svg.append("g")
  //       .call(xAxis)

  //     svg.append("g")
  //       .call(yAxis)

  //     svg.append("path")
  //       .datum(dataSet)
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", 1.5)
  //       .attr("stroke-linejoin", "round")
  //       .attr("stroke-linecap", "round")
  //       .attr("d", line);

  // }, [dataSet, height, width]);


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
