import React, { useEffect, useRef } from "react";
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const PieChartTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Tabulator Configuration
    const table = new Tabulator(tableRef.current, {
      columns: [
        { title: "Name", field: "name", width: 200 },
        { title: "Chart", field: "chart", formatter: pieChartFormatter, width: 200 },
      ],
      data: [
        { name: "John", chart: [3, 1, 4, 1, 3,2,2,3,5,2] },
        { name: "Jane", chart: [5, 2, 1] },
        { name: "Doe", chart: [2, 3, 4] },
      ],
    });
  }, []);

const pieChartFormatter = (cell) => {
  const canvas = document.createElement("canvas");
  canvas.height = 100;
  canvas.width = 100;
  const ctx = canvas.getContext("2d");

  // Get data from the cell
  const data = cell.getValue();

  // Calculate the total value for the pie chart
  const total = data.reduce((acc, val) => acc + val, 0);

  // Initialize the start angle
  let startAngle = 0;

  // Predefined list of colors (add more if needed)
  const colors = [
    "rgba(255, 99, 132, 0.2)",  // Color for the first value
    "rgba(255, 255, 0, 0.2)",   // Color for the second value
    "rgba(0, 0, 255, 0.2)",     // Color for the third value
    // ... (add more colors here)
  ];

  // Loop over each data point to draw each slice
  for (let i = 0; i < data.length; i++) {
    // Use the color based on the position in the array
    ctx.fillStyle = colors[i % colors.length];
    
    // Begin a new path
    ctx.beginPath();
    
    // Move to the center of the pie
    ctx.moveTo(50, 50);
    
    // Draw the arc
    ctx.arc(
      50,
      50,
      50,
      startAngle,
      startAngle + Math.PI * 2 * (data[i] / total)
    );
    
    // Move back to the center
    ctx.lineTo(50, 50);
    
    // Fill the slice
    ctx.fill();
    
    // Update the start angle for the next slice
    startAngle += Math.PI * 2 * (data[i] / total);
  }

  // Return the canvas element to be rendered in the cell
  return canvas;
};


  return <div ref={tableRef}></div>;
};

export default PieChartTable;
