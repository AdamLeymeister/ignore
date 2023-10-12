import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function ObjectDropdown() {
  const [selectedValue, setSelectedValue] = useState(null);

  const items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];

  const defaultValue = { id: 0, name: 'Please select an option' };

  return (
    <FormControl fullWidth>
      <InputLabel>Options</InputLabel>
      <Select
        value={selectedValue || defaultValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        renderValue={(value) => value.name}
      >
        {items.map(item => (
          <MenuItem key={item.id} value={item}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ObjectDropdown;
