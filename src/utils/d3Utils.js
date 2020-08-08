import {
    axisLeft,
    axisBottom,
    format,
    timeFormat,
    scaleTime,
    ScaleLinear,
} from 'd3';

/**
 * create x- and y-scales
 */

const xScale = 
    scaleTime()
        .domain([dateUtils.getStartOfMonth(new Date()), new Date()])
        .range([d3])