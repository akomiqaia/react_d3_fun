const DUMMY_DATA = [
    {id: 'd1', value: 10, region: "USA"},
    {id: 'd2  ', value: 11, region: "India"},
    {id: 'd3', value: 12, region: "China"},
    {id: 'd4', value: 6, region: "Germany"}
]


const container = d3.select('div')
    .style('border', '1px solid red')
    .classed('container', true)

    

const bars = container
    .selectAll('div')
    .data(DUMMY_DATA)
    .enter()
    .append('div')
    .classed('bar', true)
    .style('width', '50px')
    .style('height', "150px")
    .text(data => `This is ${data.region}`)
