const DUMMY_DATA = [
    {id: 'd1', value: 10, region: "USA"},
    {id: 'd2  ', value: 11, region: "India"},
    {id: 'd3', value: 12, region: "China"},
    {id: 'd4', value: 6, region: "Germany"}
]

const xScale = d3.scaleBand()
    .domain(DUMMY_DATA.map(dataPoint => dataPoint.region)) // let the scale funciton to know how many point of data it has
    .rangeRound([0, 250]) //tells d3 how much space is avialable
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, 15]) // our way o f letting d3 min and max values that it has to map around
    .range([200, 0]) 

const container = d3.select('svg')
    .style('border', '1px solid red')
    .classed('container', true)

    

const bars = container
    .selectAll('div')
    .data(DUMMY_DATA)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => 200 - yScale(data.value))
    .attr('x', data => xScale(data.region))
    .attr('y', data => yScale(data.value))
