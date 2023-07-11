import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    maxHeight: '20rem',
    overflow: 'auto',
  },
   subheader: {
    backgroundColor: '#bebebe'
 },
}));

function FilterableDropdown({ 
  options, 
  onOptionSelected, 
  labelKey, 
  dropdownDirection, 
  isNested = false, 
  nameType = "",
  defaultValue = null 
}) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const anchorRef = useRef(null);
  const placement = dropdownDirection === 'top' ? 'top-start' : 'bottom-start';
  
// Group options by nameType
const groupedOptions = options.reduce((groups, option) => {
  const groupKeys = Array.isArray(option[nameType]) ? option[nameType] : [option[nameType]];
  groupKeys.forEach(group => {
    if (!groups[group]) groups[group] = [];
    groups[group].push(option);
  });
  return groups;
}, {});

  useEffect(() => {
    setValue(defaultValue ? defaultValue : '');
  }, [defaultValue]);

  useEffect(() => {
    if(hasTyped) {
      if(options[0] && typeof options[0] === 'object') {
        setFilteredOptions(
          options.filter((option) => option[labelKey].toLowerCase().includes(value.toLowerCase()))
        );
      } else {
        setFilteredOptions(
          options.filter((option) => option.toString().toLowerCase().includes(value.toLowerCase()))
        );
      }
    } else {
      setFilteredOptions(options);
    }
  }, [value, options, labelKey, hasTyped]);

  const handleOptionClick = (option) => {
    if(typeof option === 'object') {
      setValue(option[labelKey]);
    } else {
      setValue(option.toString());
    }
    setOpen(false);
    onOptionSelected(option);
  }

const filteredGroupedOptions = Object.fromEntries(
  Object.entries(groupedOptions).map(([group, items]) => [
    group,
    items.filter((option) =>
      (typeof option === 'object' ? option[labelKey] : option.toString()).toLowerCase().includes(value.toLowerCase())
    ),
  ])
);

return (
  <ClickAwayListener onClickAway={() => setOpen(false)}>
    <div>
      <TextField
        value={value}
        onClick={() => setOpen(true)}
        onChange={(e) => {
          setValue(e.target.value);
          setHasTyped(true);
        }}
        ref={anchorRef}
          InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        {open ? 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg> 
          : 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        }
      </InputAdornment>
    ),
  }}placeholder="Choose an option"
      />
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement={placement} style={{ width: anchorRef?.current?.offsetWidth }}>
        <Paper className={classes.dropdown}>
                  <MenuItem
                    key={value}
                    onClick={() => handleOptionClick({name:'all'})}
                  >
                    All
                    </MenuItem>
          {isNested ? 
            Object.entries(filteredGroupedOptions).map(([group, items]) => (
              <React.Fragment key={group}>
                {items.length > 0 && <ListSubheader className={classes.subheader}>{group}</ListSubheader>}
                {items.map((option, index) => (
                  <MenuItem
                    key={typeof option === 'object' ? option.id : index}
                    onClick={() => handleOptionClick(option)}
                  >
                    {typeof option === 'object' ? option[labelKey] : option.toString()}
                  </MenuItem>
                ))}
              </React.Fragment>
            ))
            :
            filteredOptions.map((option, index) => (
              <MenuItem
                key={typeof option === 'object' ? option.id : index}
                onClick={() => handleOptionClick(option)}
              >
                {typeof option === 'object' ? option[labelKey] : option.toString()}
              </MenuItem>
            ))
          }
        </Paper>
      </Popper>
    </div>
  </ClickAwayListener>
);

        }
        export default FilterableDropdown