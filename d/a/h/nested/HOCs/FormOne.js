import React from "react";
import axios from "axios";
import { MenuItem, Select, TextField } from "@mui/material";
import withFormChange from "./withFormChange";

const getFormData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  return response.data;
};

const FormOne = ({ formData, handleFormChange, formIdentifier }) => {
  const handleChange = (e) => {
    handleFormChange(e);
  };

  return (
    <div className={formIdentifier}>
      <TextField
        label="Name"
        name="name"
        value={formData?.name}
        onChange={handleChange}
      />
      <TextField
        label="Username"
        name="username"
        value={formData?.username}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        value={formData?.email}
        onChange={handleChange}
      />
      <Select
        name="fruits"
        value={formData?.fruits || ""}
        onChange={handleChange}>
        <MenuItem value="apple">Apple</MenuItem>
        <MenuItem value="orange">Orange</MenuItem>
        <MenuItem value="banana">Banana</MenuItem>
      </Select>
    </div>
  );
};

export default withFormChange(FormOne, "form-one", getFormData);
