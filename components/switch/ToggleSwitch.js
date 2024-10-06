// components/ToggleSwitch.js

import React from 'react';
import Switch from '@mui/material/Switch';

const ToggleSwitch = ({ checked, onChange, name, label }) => {
  return (
    <div>
      <Switch
        checked={checked}
        onChange={onChange}
        name={name}
        inputProps={{ 'aria-label': label }}
      />
    </div>
  );
};

export default ToggleSwitch;
