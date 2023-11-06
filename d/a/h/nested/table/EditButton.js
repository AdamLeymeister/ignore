import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import useTabulator from "./useTabulator";
import usePeople from "../useGetPeople";

const EditButton = () => {
  const columns = [
    { title: "Status", field: "completed", width: 200 },
    { title: "Id", field: "id", width: 50 },
    { title: "Title", field: "title" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [tableOneData, setTableOneData] = useState([]);
  const [tableTwoData, setTableTwoData] = useState([]);

  const selected = { name: "Jack" };
  const { data: people, isLoading } = usePeople(selected, isOpen);

  useEffect(() => {
    if (!isLoading && isOpen) {
      setTableOneData(people);
    }
  }, [people, isLoading, isOpen]);

  const [tableOneRef, tableOne] = useTabulator({
    columns,
    data: tableOneData,
    isOpen,
  });
  const [tableTwoRef, tableTwo] = useTabulator({
    columns,
    data: tableTwoData,
    isOpen,
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const moveRows = (fromTable, toTable, setFromTableData, setToTableData) => {
    const selectedRows = fromTable.getSelectedRows();
    const selectedData = selectedRows.map((row) => row.getData());

    // Add selected rows to the destination table
    toTable.updateOrAddData(selectedData).then(() => {
      // Update state for the destination table to trigger a refresh
      setToTableData((prevData) => [...prevData, ...selectedData]);
    });

    // Remove selected rows from the source table
    selectedRows.forEach((row) => row.delete());

    // Remove the selected data from the source state as well
    setFromTableData((prevData) =>
      prevData.filter((data) => !selectedData.includes(data))
    );
  };

  const handleAddClick = () => {
    if (tableOne.current && tableTwo.current) {
      moveRows(
        tableOne.current,
        tableTwo.current,
        setTableOneData,
        setTableTwoData
      );
    }
  };

  const handleRemoveClick = () => {
    if (tableOne.current && tableTwo.current) {
      moveRows(
        tableTwo.current,
        tableOne.current,
        setTableTwoData,
        setTableOneData
      );
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Edit People</DialogTitle>
        <DialogContent dividers>
          <Button onClick={handleAddClick}>Add</Button>
          <div ref={tableOneRef} style={{ marginBottom: "20px" }} />
          <Button onClick={handleRemoveClick}>Remove</Button>
          <div ref={tableTwoRef} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
