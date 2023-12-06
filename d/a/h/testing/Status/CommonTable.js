import React, { useState, useEffect } from "react";
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
import TableSortLabel from "@mui/material/TableSortLabel";
import "./StatusTable.css";

const CommonTable = ({ data, columns, selectable, multiSelect }) => {
  const [filterTexts, setFilterTexts] = useState({});
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    // When data changes, reset filters, sorting, and selected rows
    setFilterTexts({});
    setOrderBy("");
    setOrder("asc");
    setSelectedRows([]);
  }, [data]);

  const handleFilterChange = (event, field) => {
    setFilterTexts((prevFilterTexts) => ({
      ...prevFilterTexts,
      [field]: event.target.value,
    }));
  };

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
      setOrderBy(column);
    }
  };

  const handleRowClick = (rowName) => {
    if (!selectable) {
      return; // Do nothing if not selectable
    }

    let updatedSelectedRows = [];

    if (multiSelect) {
      // Toggle selection for multiple rows
      if (selectedRows.includes(rowName)) {
        updatedSelectedRows = selectedRows.filter(
          (selectedRow) => selectedRow !== rowName
        );
      } else {
        updatedSelectedRows = [...selectedRows, rowName];
      }
    } else {
      // Select only one row if not in multi-select mode
      updatedSelectedRows = [rowName];
    }

    setSelectedRows(updatedSelectedRows);
  };

  const isRowSelected = (rowName) => selectedRows.includes(rowName);

  const filteredRows = data
    .filter((row) => {
      return Object.keys(filterTexts).every((columnFilter) => {
        if (filterTexts[columnFilter]) {
          return String(row[columnFilter])
            .toLowerCase()
            .includes(filterTexts[columnFilter].toLowerCase());
        }
        return true;
      });
    })
    .sort((a, b) => {
      if (orderBy) {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === "asc") {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      }
      return 0;
    });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="custom-styled table">
          <TableHead>
            <TableRow hover>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : "asc"}
                      onClick={() => handleSort(column.field)}>
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    <span>{column.label}</span>
                  )}
                  <TextField
                    fullWidth
                    label={`Filter ${column.label}`}
                    value={filterTexts[column.field] || ""}
                    onChange={(event) =>
                      handleFilterChange(event, column.field)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                hover
                className={
                  selectable && isRowSelected(row.name) ? "selected-row" : ""
                }
                onClick={() => handleRowClick(row.name)}>
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align || "left"}>
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommonTable;
