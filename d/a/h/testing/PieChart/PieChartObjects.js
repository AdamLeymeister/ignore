import React, { useEffect, useRef } from "react";
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const PieChartTable2 = () => {
  const tableRef = useRef(null);

  const newMockData = [
    { name: 'John', chart: {goodCount: 50, badCount: 50, neutralCount: 0, extra: 3} },
    { name: 'Jane', chart: {goodCount: 50, badCount: 25, neutralCount: 25} },
    { name: 'Doe', chart: {goodCount: 90, badCount: 5, neutralCount: 5} },
  ];

  useEffect(() => {
    const table = new Tabulator(tableRef.current, {
      columns: [
        { title: "Name", field: "name", width: 200 },
        { title: "Chart", field: "chart", formatter: pieChartFormatter, width: 200 }
      ],
      data: newMockData
    });
  }, []);

const pieChartFormatter = (cell) => {
  const canvas = document.createElement("canvas");
  canvas.height = 100;
  canvas.width = 100;
  const ctx = canvas.getContext("2d");

  const data = [
    {value: cell.getValue().goodCount, label: "Good", status: 1},
    {value: cell.getValue().badCount, label: "Bad", status: 2},
    {value: cell.getValue().neutralCount, label: "Neutral", status: 3}
  ];

  const total = data.reduce((acc, val) => acc + val.value, 0);

  // Initially set the start angle to Math.PI, which is the 9 o'clock position
  let startAngle = Math.PI;
  
  const statusColors = {
    1: "green",
    2: "blue",
    3: "red"
  };

  for (let i = 0; i < data.length; i++) {
    const sliceColor = statusColors[data[i].status] || "gray";
    ctx.fillStyle = sliceColor;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.arc(50, 50, 50, startAngle, startAngle + Math.PI * 2 * (data[i].value / total));
    ctx.lineTo(50, 50);
    ctx.fill();

    // Calculate the next start angle based on the previous slice's end angle
    startAngle += Math.PI * 2 * (data[i].value / total);

    // Make sure the start angle remains between 0 and 2 * Math.PI
    if (startAngle > 2 * Math.PI) {
      startAngle -= 2 * Math.PI;
    }
  }

  return canvas;
};


  return <div ref={tableRef}></div>;
};

export default PieChartTable2;
