import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

// import {drawChart, initChart} from '../utils/drawChart'

const Chart = ({ width, height, dataSet }) => {
  const percentageData = dataSet.map((x) => x.percentage);
  const timeData = dataSet.map((x) => x.usageDate);
  dataSet = dataSet.map(({usageDate, percentage}) => ({usageDate, percentage}), {y: " %"})
  const ref = useRef();

  useEffect(() => {
    let margin = ({top: 20, right: 30, bottom: 30, left: 40})
    let x = d3.scaleBand()
    .domain(d3.range(timeData.length))
    .range([margin.left, width - margin.right])

    let y = d3.scaleLinear()
    .domain([0, d3.max(dataSet, d => d.percentage)]).nice()
    .range([height - margin.bottom, margin.top])

    let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => timeData[i]).tickSizeOuter(0))

    let yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      // .call(g => g.select(".tick:last-of-type text").clone()
      .call(g => g.append('text')
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("percentage"))
    
    const svg = d3
      .select(ref.current)
      .attr("viewBox", [0, 0, width, height])
      
      svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(dataSet)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.percentage))
      .attr("height", d => y(0) - y(d.percentage))
      .attr("width", x.bandwidth());
      svg.append("g")
        .call(xAxis)

      svg.append("g")
        .call(yAxis)

  }, [dataSet]);

  // useEffect(() => {
  //   // draw();
  // }, [percentageData]);

  // const draw = () => {
  //   const svg = d3.select(ref.current);
  //   var selection = svg.selectAll("rect").data(percentageData);
  //   const yScale = d3
  //     .scaleLinear()
  //     .domain([0, d3.max(percentageData)])
  //     .range([height, 0]);
  //   const xScale = d3.scaleBand().range([0, width]).padding(0);
  //   selection
  //     .transition()
  //     .duration(300)
  //     .attr("height", (d) => yScale(d))
  //     .attr("y", (d) => height - yScale(d));

  //   selection
  //     .enter()
  //     .append("rect")
  //     .attr("transform", "translate(" + 20 + "," + -20 + ")")
  //     .attr("x", (d, i) => i * 50)
  //     .attr("y", (d) => height)
  //     .attr("padding", 0.1)
  //     .attr("width", 40)
  //     .attr("height", 0)
  //     .attr("fill", "orange")
  //     .transition()
  //     .duration(300)
  //     .attr("height", (d) => yScale(d))
  //     .attr("y", (d) => height - yScale(d));

  //   selection
  //     .exit()
  //     .transition()
  //     .duration(300)
  //     .attr("y", (d) => height)
  //     .attr("height", 0)
  //     .remove();

  //   // var g = svg
  //   //   .append("g")
  //   //   .attr("transform", "translate(" + 20 + "," + -20 + ")");
  //   // xScale.domain(timeData);
  //   // g.append("g")
  //   //   .attr("transform", "translate(0," + height + ")")
  //   //   .call(d3.axisBottom(xScale));
  //   // g.append("g").call(d3.axisLeft(yScale));

  //   // let y_axis = d3.axisLeft().scale(yScale)
  // };

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
