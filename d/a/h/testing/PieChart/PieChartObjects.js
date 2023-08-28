import React, { useEffect, useRef } from "react";
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const PieChartTable2 = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Tabulator Configuration
    const table = new Tabulator(tableRef.current, {
      columns: [
        { title: "Name", field: "name", width: 200 },
        { title: "Chart", field: "chart", formatter: pieChartFormatter, width: 200 }
      ],
      data: [
        { name: "John", chart: [{ value: 3, label: "Apples" }, { value: 1, label: "Bananas" }, { value: 4, label: "Cherries" }] },
        { name: "Jane", chart: [{ value: 5, label: "Apples" }, { value: 2, label: "Bananas" }, { value: 1, label: "Cherries" }] },
        { name: "Doe", chart: [{ value: 2, label: "Apples" }, { value: 3, label: "Bananas" }, { value: 4, label: "Cherries" }] },
      ],
    });
  }, []);

const pieChartFormatter = (cell) => {
  const canvas = document.createElement("canvas");
  canvas.height = 100;
  canvas.width = 100;
  const ctx = canvas.getContext("2d");

  // Get data from the cell (array of objects now)
  const data = cell.getValue();

  // Calculate the total value for the pie chart, accessing the 'value' property of each object
  const total = data.reduce((acc, val) => acc + val.value, 0);

  // Initialize the start angle
  let startAngle = 0;

  // Predefined list of colors
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 255, 0, 0.2)",
    "rgba(0, 0, 255, 0.2)",
    // ... (add more colors here)
  ];

  // Loop over each data object to draw each slice
  for (let i = 0; i < data.length; i++) {
    // Use the color based on the position in the array
    ctx.fillStyle = colors[i % colors.length];

    // Begin a new path
    ctx.beginPath();

    // Move to the center of the pie
    ctx.moveTo(50, 50);

    // Draw the arc, accessing the 'value' property of each object
    ctx.arc(
      50,
      50,
      50,
      startAngle,
      startAngle + Math.PI * 2 * (data[i].value / total)
    );

    // Move back to the center
    ctx.lineTo(50, 50);

    // Fill the slice
    ctx.fill();

    // Update the start angle for the next slice
    startAngle += Math.PI * 2 * (data[i].value / total);
  }

  // Return the canvas element to be rendered in the cell
  return canvas;
};



  return <div ref={tableRef}></div>;
};

export default PieChartTable2;
