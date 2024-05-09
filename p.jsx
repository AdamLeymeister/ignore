import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, CircularProgress } from '@mui/material';
import axios from 'axios';

function ApiSelect() {
    const [objectOptions, setObjectOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setSelectedValue(`${items[0].id}-${items[0].version}`)
    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <Select
                value={selectedValue}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    const [id, version] = selected.split('-');
                    const option = objectOptions.find(opt => `${opt.id}-${opt.version}` === selected);
                    return option ? option.name : 'Select an option';
                }}
            >
                {objectOptions.map(option => (
                    <MenuItem key={`${option.id}-${option.version}`} value={`${option.id}-${option.version}`}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
