import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };
const BUCKET_NUMBER = 21;
const BUCKET_PADDING = 1;


export const Histogram = ({ width, height, data, title }) => {
    data = data.map(e => Number(e))
    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const xScale = useMemo(() => {
        const min = d3.min(data);
        const max = Math.max(...data);
        return d3
            .scaleLinear()
            .domain([min < 0 ? min : 0, Math.max(...data) + 5])
            .range([10, boundsWidth]);
    }, [data, width]);

    const buckets = useMemo(() => {
        const bucketGenerator = d3
            .bin()
            .value((d) => d)
            .domain(xScale.domain())
            .thresholds(xScale.ticks(BUCKET_NUMBER));
        return bucketGenerator(data);
    }, [xScale]);

    const yScale = useMemo(() => {
        const max = Math.max(...buckets.map((bucket) => bucket?.length));
        return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]).nice();
    }, [data, height]);

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();

        let xAxisGenerator = null
        if (title !== "Points" && title !== "+/-")
            xAxisGenerator = d3.axisBottom(xScale);
        else {
            xAxisGenerator = d3.axisBottom(xScale)
                .ticks(boundsWidth / 20);
        }

        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator);

        svgElement.append("text")
            .attr("x", boundsWidth - 15)
            .attr("y", boundsHeight + MARGIN.bottom - 10)
            .style("text-anchor", "middle")
            .style("font-size", "9px")
            .text(title);

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);

        svgElement.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -MARGIN.left * 0.8)
            .attr("x", -(boundsHeight / 10))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "11px")
            .text("Season Freq.");
    }, [xScale, yScale, boundsHeight]);

    const allRects = buckets.map((bucket, i) => {
        return (
            <rect
                key={i}
                fill="#69b3a2"
                x={xScale(bucket.x0) + BUCKET_PADDING / 2}
                width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
                y={yScale(bucket.length)}
                height={boundsHeight - yScale(bucket.length)}
            />
        );
    });

    return (
        <svg width={width} height={height}>
            <text
                transform={`translate(${width / 2},${MARGIN.top / 2})`}
                textAnchor="middle"
                style={{ fontSize: '16px', fill: '#333' }}
            >
                {title ? title : "title"}
            </text>
            <g
                width={boundsWidth}
                height={boundsHeight}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
            >
                {allRects}
            </g>
            <g
                width={boundsWidth}
                height={boundsHeight}
                ref={axesRef}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
            />
        </svg>
    );
};