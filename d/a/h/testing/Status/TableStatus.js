import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./StatusTable.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomStyledTable() {
  const [filterTexts, setFilterTexts] = useState({
    name: "",
    calories: "",
    fat: "",
    carbs: "",
    protein: "",
  });

  const handleFilterChange = (event, field) => {
    setFilterTexts((prevFilterTexts) => ({
      ...prevFilterTexts,
      [field]: event.target.value,
    }));
  };

  const filteredRows = rows.filter((row) => {
    //Filter with multiple columns; loop over all filters
    return Object.keys(filterTexts).every((columnFilter) => {
      //Check if filter is set
      if (filterTexts[columnFilter]) {
        //Return row if match is found in the current column
        return String(row[columnFilter])
          .toLowerCase()
          .includes(filterTexts[columnFilter].toLowerCase());
      }
      // If no filter is set for the current column, include the row
      return true;
    });
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="custom-styled table">
          <TableHead>
            <TableRow hover>
              <TableCell>
                <TextField
                  fullWidth
                  label="Filter Dessert"
                  value={filterTexts.name}
                  onChange={(event) => handleFilterChange(event, "name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  fullWidth
                  label="Filter Calories"
                  value={filterTexts.calories}
                  onChange={(event) => handleFilterChange(event, "calories")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  fullWidth
                  label="Filter Fat (g)"
                  value={filterTexts.fat}
                  onChange={(event) => handleFilterChange(event, "fat")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  fullWidth
                  label="Filter Carbs (g)"
                  value={filterTexts.carbs}
                  onChange={(event) => handleFilterChange(event, "carbs")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  fullWidth
                  label="Filter Protein (g)"
                  value={filterTexts.protein}
                  onChange={(event) => handleFilterChange(event, "protein")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
