import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    maxHeight: '20rem',
    overflow: 'auto',
  },
}));

function FilterableDropdown({ options, onOptionSelected, labelKey }) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const anchorRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) => option[labelKey].toLowerCase().includes(value.toLowerCase()))
    );
  }, [value, options, labelKey]);

  const handleOptionClick = (option) => {
    setValue(option[labelKey]);
    setOpen(false);
    onOptionSelected(option);
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <TextField
          value={value}
          onClick={() => setOpen(true)}
          onChange={(e) => setValue(e.target.value)}
          ref={anchorRef}
          placeholder="Options"
        />
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start">
          <Paper className={classes.dropdown}>
            {filteredOptions.map((option) => (
              <MenuItem
                key={option.id}
                onClick={() => handleOptionClick(option)}
              >
                {option[labelKey]}
              </MenuItem>
            ))}
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}

export default FilterableDropdown;
