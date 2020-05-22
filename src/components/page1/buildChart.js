import React, { useRef, useEffect, useState } from 'react'
import { select, 
        scaleLinear,
        curveCardinal,
        line,
        axisBottom,
        axisRight,
    } from 'd3'

    
const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver(enteries => {
            enteries.forEach(entry => {
                setDimensions(entry.contentRect)
            })
        });
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget)
        };
    },[ref])
    return dimensions;
}

function LineChart({ data }) {

 
    const myPath = data.map(d => d.measures[0].value)
    const labels = data.map(d => d.dimensions[0].value) // xAxis labels

    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)
 


    useEffect(() => {
        const svg = select(svgRef.current)

        if(!dimensions) return;

        const xScale = scaleLinear()
            .domain([0, data.length - 1]) // scale of peices of data (ticks)
            .range([0, dimensions.width]) // width of the SVG

        const yScale = scaleLinear()
            .domain([50, 240000]) // scale of data
            .range([dimensions.height, 0]) //height of the SVG

        const xAxis = axisBottom(xScale)
            .ticks(data.length - 1)
            .tickFormat((d,i) => labels[i]) // xAis labels used
            
         
        svg.select('.x-axis')
            .style('transform', `translateY(${dimensions.height}px)`)
            .call(xAxis)
            .selectAll('text')  // rotate xAxis labels 60 degrees 
            .attr('transform', 'rotate(40)')
            .attr("y", 5)
            .attr("x", 50)


        const yAxis = axisRight(yScale)
        svg.select('.y-axis')
            .style('transform', `translateX(${dimensions.width}px)`)
            .call(yAxis)



        const myLine = line()
            .x((value, index) =>xScale(index)) 
            .y(value => yScale(value))
            .curve(curveCardinal)


        svg.selectAll('.line')
            .data([myPath]) 
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine) 
            .attr('fill', 'none')
            .attr('stroke', 'blue') 


    }, [data, dimensions])


    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
            <svg ref={svgRef} width="600" height="400">
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
        </div>
    )
}

export default LineChart


