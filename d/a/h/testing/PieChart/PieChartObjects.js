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
        { name: "John", chart: [{ value: 3, label: "Apples", status: 1}, { value: 1, label: "Bananas", status: 2 }, { value: 4, label: "Cherries", status: 3}] },
        { name: "Jane", chart: [{ value: 5, label: "Apples", status: 3 }, { value: 2, label: "Bananas", status: 2}, { value: 1, label: "Cherries", status: 1 }] },
        { name: "Doe", chart: [{ value: 2, label: "Apples", status: 1}, { value: 3, label: "Bananas", status: 2 }, { value: 4, label: "Cherries", status: 3 }] },
        { name: "Doe", chart: [{value:4}] },
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

  // Status-based colors
  const statusColors = {
    1: "green", // status 1 will be green
    2: "blue",  // status 2 will be blue
    3: "red"    // status 3 will be red
  };

  // Loop over each data object to draw each slice
  for (let i = 0; i < data.length; i++) {
    // Get the color based on the 'status' property of the data object
    const sliceColor = statusColors[data[i].status] || "gray";  // Default to "gray" if status is not in [1, 2, 3]

    // Set the fill color for the current slice
    ctx.fillStyle = sliceColor;

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
