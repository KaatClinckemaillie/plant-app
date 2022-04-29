import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

export default function BasicSelect({label, options, field, error}) {





  return (
      <FormControl error={!!error} required fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          {...field}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
        >
        {options.map ( ({id, name}) => (
          <MenuItem
            key={id}
            value={id}

          >
            {name}
          </MenuItem>
        ))}  
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
  );
} 


