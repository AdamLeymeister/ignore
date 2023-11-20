import React from "react";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./TableStatus.css";

const TableStatus = () => {
  const apiData = [
    { type: "wrench", count: 1, status: "one" },
    { type: "wrench", count: 2, status: "two" },
    { type: "wrench", count: 3, status: "one" },
    { type: "hammer", count: 1, status: "one" },
    { type: "screwdriver", count: 1, status: "two" },
    { type: "drill", count: 1, status: "three" },
    { type: "drill", count: 1, status: "three" },
    { type: "drill", count: 1, status: "three" },
    { type: "drill", count: 1, status: "three" },
    { type: "drill", count: 1, status: "three" },
  ];
  const getIcon = (status) => {
    switch (status) {
      case "one":
        return (
          <CheckCircleIcon style={{ color: "#5cc85c", marginRight: "5px" }} />
        );
      case "two":
        return <CancelIcon style={{ color: "#6d1111", marginRight: "5px" }} />;
      case "three":
        return (
          <HelpOutlineIcon style={{ color: "black", marginRight: "5px" }} />
        );
      default:
        return null;
    }
  };
  const renderButtons = (status, bgColor) =>
    apiData
      .filter((tool) => tool.status === status)
      .map((tool) => (
        <Button
          key={`${tool.type}-${tool.count}`}
          style={{
            backgroundColor: bgColor,
            height: "2rem",
            display: "flex",
            color: "black",
          }}>
          {getIcon(tool.status)}
          {tool.type} {tool.count}
        </Button>
      ));

  return (
    <div className="tableStatusGrid">
      <div className="column">
        Bad
        {renderButtons("two", "red")}
      </div>
      <div className="column">
        Good
        {renderButtons("one", "green")}
      </div>
      <div className="column">
        Eh
        {renderButtons("three", "gray")}
      </div>
    </div>
  );
};

export default TableStatus;
