import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useKeys } from "../CustomListComponent/components/keyStore";
import KeypadButton from "./KeypadButton";

export const createHeaders = (value) => {
  return( <TableCell key={value.name}>{value.name}</TableCell>
  ) 
}

export const createRows = (match) => (
    <TableRow key={match.name}>
      <TableCell>{match.name}</TableCell>
      {match.values.map((value, idx) => (
        <TableCell>
          <KeypadButton data={match} index={idx} value={value.value ? "win" : "lose"} />
        </TableCell>
      ))}
    </TableRow>
  );

const KeypadTable = () => {

  const { keys, createTable, keyComps, updatedKeys, updateKeys } = useKeys();

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