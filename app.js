const DUMMY_DATA = [
    {id: 'd1', value: 10, region: "USA"},
    {id: 'd2  ', value: 11, region: "India"},
    {id: 'd3', value: 12, region: "China"},
    {id: 'd4', value: 6, region: "Germany"}
]


const container = d3.select('svg')
    .style('border', '1px solid red')
    .classed('container', true)

    

const bars = container
    .selectAll('div')
    .data(DUMMY_DATA)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', '50px')
    .attr('height', data => data.value * 15)
    .text(data => `This is ${data.region}`)
