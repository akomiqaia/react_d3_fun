import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

// import {drawChart, initChart} from '../utils/drawChart'

const Chart = ({ width, height, dataSet }) => {
  const timeData = dataSet.map((x) => new Date(x.usageDate));
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
      

    const line = d3.line()
        .defined(d => !isNaN(d.percentage))
        .x(d => x(new Date(d.usageDate)))
        .y(d => y(d.percentage))
        
    svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("width", width - margin.right)
      .attr("height", height);
   

    svg.append("path")
        .datum(dataSet)
        .attr("class", "path")
        .attr("fill", "none")
        .attr("clip-path", "url(#clip)")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
    svg.call(zoom)
    svg.call(hover)
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

      function hover() {
      let bisect = d3.bisector(d => d.date).left,
			format = d3.format("+.0%"),
			dateFormat = d3.timeFormat("%Y-%b-%d")

		var focus = svg.append("g")
			.attr("class", "focus")
			.style("display", "none");

		focus.append("line")
			.attr("stroke", "#666")
			.attr("stroke-width", 1)
			.attr("y1", -height + margin.top)
			.attr("y2", -margin.bottom);

		focus.append("circle")
			.attr("class", "circle")
			.attr("r", 5)
			.attr("dy", 5)
			.attr("stroke", "steelblue")
			.attr("fill", "#fff");

		focus.append("text")
			.attr("text-anchor", "middle")
			.attr("dy", ".35em");

		let overlay = svg.append("rect")
			.attr("class", "overlay")
			.attr("x", margin.left)
			.attr("y", margin.top)
			.attr("width", width - margin.right - margin.left - 1)
			.attr("height", height - margin.bottom - margin.top)
			.on("mouseover", () => focus.style("display", null))
			.on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", mousemove);
      
      function mousemove() {

        var x0 = x.invert(d3.mouse(this)[0]);
  
        var i = bisect(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  
        focus.select("line")
          .attr("transform", 
            "translate(" + x(d.date) + "," + height + ")");
  
        focus.selectAll(".circle")
          .attr("transform", 
            "translate(" + x(d.date) + "," + y(d.value) + ")");
  
        focus.select("text")
          .attr("transform", 
            "translate(" + x(d.date) + "," + (height + margin.bottom) + ")")
          .text(dateFormat(d.date));
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
