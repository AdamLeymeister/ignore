import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { Popper } from '@mui/base';

const PieChart = ({ data, width = 200, height = 200 }) => {
  const [arcs, setArcs] = useState([]);
  const [tooltip, setTooltip] = useState({ show: false, anchorEl: null, text: '' });

useEffect(() => {
    const pie = d3.pie()
        .value(d => d.value)
        .sort((a, b) => a.status - b.status) 
        .startAngle(-Math.PI / 2)  
        .endAngle(Math.PI * 1.5);   

    setArcs(pie(data));
}, [data]);



  const radius = Math.min(width, height) / 2;
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

const color = d3.scaleOrdinal()
    .domain(data.map(d => d.status))
    .range(["green", "red", "yellow"]); 


  const handleMouseOver = (arc, event) => {
    event.currentTarget.setAttribute('opacity', 0.7);
    setTooltip({
      show: true,
      anchorEl: event.currentTarget,
      text: `${arc.data.label}`
    });
  };

  const handleMouseOut = (event) => {
    event.currentTarget.setAttribute('opacity', 1);
    setTooltip({ show: false, anchorEl: null, text: '' });
  };

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
        {arcs.map((arc, index) => (
            <g key={index}>
                <path 
                    d={arcGenerator(arc)} 
                    fill={color(arc.data.status)}
                    onMouseOver={(e) => handleMouseOver(arc, e)}
                    onMouseOut={(e) => handleMouseOut(e)}
                />
                {/* Only display the label if the value isn't 0 */}
                {arc.data.value !== 0 && (
                    <text 
                        transform={`translate(${arcGenerator.centroid(arc)})`} 
                        dy="0.35em" 
                        textAnchor="middle"
                        fontSize={(radius / 5)}
                    >
                        {arc.data.label}
                    </text>
                )}
            </g>
        ))}
        </g>
      </svg>
      <Popper open={tooltip.show} anchorEl={tooltip.anchorEl}>
        <div style={{ padding: '10px', backgroundColor: 'white', border: '1px solid black' }}>
          {tooltip.text}
        </div>
      </Popper>
    </>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
    })
  ),
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PieChart;
