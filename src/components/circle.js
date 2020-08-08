import React, {useRef, useEffect, useState} from 'react'

import * as d3 from 'd3'

import d3Utils from '../utils/d3Utils'
import d3Config from '../utils/d3Config'


const Circle = ({timeSeriesData}) => {
    const ref = useRef()
    useEffect(() => {
      d3Utils.initializeChart(timeSeriesData, 'monthToDate');
      const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([10, 290])
      const svgElement = d3.select(ref.current)
      const axisGenerator = d3.axisBottom(xScale)
      svgElement.append("g")
        .call(axisGenerator)
    }, [])
    return (
        <svg className="line-chart" width="100%" height={d3Config.svgHeight} />

    )
  }
export default Circle
