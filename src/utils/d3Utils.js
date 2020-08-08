import {
    axisLeft,
    axisBottom,
    format,
    timeFormat,
    scaleTime,
    ScaleLinear,
} from 'd3';

const xScale = 
    scaleTime()
        .domain([dateUtils.getStartOfMonth(new Date()), new Date()])