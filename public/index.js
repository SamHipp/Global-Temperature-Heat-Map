// Fetching the data_____________________________________

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then(response => response.json())
    .then(dataRes => {

    // Variables_________________________________________
    const data = dataRes["monthlyVariance"].map((x) => {
        return [x['year'], x['month'], x['variance']];
    })
    console.log(data);
    const graphHeight = 500;
    const graphWidth = 1200;
    const hPadding = 300;
    const wPadding = 100;
    const margin = 5;
    const colors = [['hsl(200, 100%, 50%', d3.min(data, d => d[2])],
                    ['hsl(200, 50%, 50%', d3.min(data, d => d[2] / 2)],
                    ['hsl(0, 0%, 50%', 0],
                    ['hsl(0, 50%, 50%', d3.max(data, d => d[2] / 2)],
                    ['hsl(0, 100%, 50%', d3.max(data, d => d[2])]
                    ];
    const baseTemp = 8.66

        // Adding the graph svg________________________________
    const svg = d3.select('#graph')
        .append('svg')
        .attr('class', 'graph-svg')
        .attr('height', `${graphHeight + hPadding}`)
        .attr('width', `${graphWidth + wPadding + margin}`);

        // Adding the axes___________________________________
    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
        .range([wPadding, graphWidth + wPadding]);
    const yScale = d3.scaleLinear()
        .domain([d3.max(data, d => d[1]), 0])
        .range([0, graphHeight]);
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('0a'));
    const yAxis = d3.axisLeft(yScale)
        .tickFormat((month) => {
            if (month > 0) {
            let date = new Date(0);
            date.setUTCMonth(month);
            let format = d3.timeFormat('%B');
            return format(date);
            } else {return ""}
        });
    svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${graphHeight + margin})`)
        .attr('id', 'x-axis')
        .attr('class', 'x-axis');
    svg.append('g')
        .call(yAxis)
        .attr('transform', `translate(${wPadding}, ${margin})`)
        .attr('id', 'x-axis')
        .attr('class', 'x-axis');

    // Adding the graph body________________________________________________
    let graphRect = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', d => `hsl(${d[2] > 0 ? 0 : 200}, ${Math.abs(d[2]) * 20}%, 50%)`)
        .attr('height', `${graphHeight / 12}`)
        .attr('width', `${graphWidth / (d3.max(data, d => d[0]) - d3.min(data, d => d[0]))}`)
        .attr('x', e => wPadding + (graphWidth * ((e[0] - d3.min(data, d => d[0])) / (d3.max(data, d => d[0]) - d3.min(data, d => d[0])))))
        .attr('y', e => margin + graphHeight * ((e[1] - 1) / 12))
        .attr('class', 'cell')
        .attr('data-month', d => d[1])
        .attr('data-year', d => d[0])
        .attr('data-temp', d => 8.66 + d[2])
        // Adding Tooltip
        

    // Legend__________________________________________________________________
    svg.append('g')
        .attr('id', 'legend')
        .selectAll('rect')
        .data(colors)
        .enter()
        .append('rect')
        .attr('height', '20px')
        .attr('width', '20px')
        .attr('x', (d, i) => {return wPadding + graphWidth / 2 + 20 * i - 50})
        .attr('y', graphHeight + 80)
        .attr('fill', d => d[0])
        .attr('stroke', 'black')

    svg.append('g')
        .selectAll('text')
        .data(colors)
        .enter()
        .append('text')
        .attr('class', 'legend-text')
        .text(d => `${Math.floor(10 * (d[1] + baseTemp)) / 10}`)
        .attr('x', (d, i) => {return wPadding + graphWidth / 2 + 20 * i - 50})
        .attr('y', graphHeight + 75)


// ____________________________________________________________________________
    })
        // .catch(console.error('ooops'));

/*

User Story #7: Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.

User Story #8: The data-month, data-year of each cell should be within the range of the data.

User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

User Story #17: My tooltip should have a data-year property that corresponds to the data-year of the active area.

Here is the dataset you will need to complete this project: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json
*/