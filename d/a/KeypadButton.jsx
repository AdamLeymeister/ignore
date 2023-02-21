import { Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import "./keypadbutton.css";

const KeypadButton = ({ data, value, index}) => {
  const [rowData, setRowData] = useState(data);

  const style = {
    backgroundColor: rowData?.values[index].value ? "blue" : "white",
    color: rowData?.values[index].value ? "white" : "black",
  };

  useEffect(() => {
    console.log(data)
    console.log(rowData.values[index].value)
  }, [rowData.values[index].value]);
  
  const onButtonClick = (e) => {
    //call keypadtable 
    setRowData((ps) => {
      let ns = { ...ps }
      ns.values[index].value = !ps.values[index].value;
      return ns
    });
  };

  return (
    <Button onClick={onButtonClick} style={style}>
      {value}
    </Button>
  );
};
export default KeypadButton;
