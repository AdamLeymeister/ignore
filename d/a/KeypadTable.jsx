import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useKeys } from "../CustomListComponent/components/keyStore";
import KeypadButton from "./KeypadButton";

export const createHeaders = (column) => {
  return( <TableCell key={column.id}>{column.columnHeader}</TableCell>
  ) 
}
export const createRows = (data) => {
    return data[0].values.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.name}</TableCell>
        {data.map((column,) => (
          <TableCell key={Math.floor(Math.random() * 1000)}>
            <KeypadButton data={column} index={index} value={column.values[index].value ? "win" : "lose"} />
          </TableCell>
        ))}
      </TableRow>
    ));
  }

const KeypadTable = () => {

  const { keys, createTable, keyComps, updateKeys } = useKeys();

 const onMatchClicked = (match) => {
  updateKeys(match)
}
  React.useEffect(() => {
    if(keys){
      createTable(keys);
    }
  }, [keys])
    
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <TableHead></TableHead>
          {keyComps?.tableHeaders}
        </TableRow>
      </TableHead>
      <TableBody>
        {keyComps?.tableRows}
      </TableBody>
    </TableContainer>
  );
};
export default KeypadTable;