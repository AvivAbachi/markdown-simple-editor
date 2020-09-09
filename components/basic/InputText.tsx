import React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'rsuite';

interface InputTextProps {
  label?: React.ReactText;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const InputText: React.FC<InputTextProps> = ({label, name, placeholder, required}) => {
  return (
    <FormGroup>
      <ControlLabel children={label} />
      <FormControl name={name} placeholder={placeholder} required={required} />
    </FormGroup>
  );
};

export default React.memo(InputText);
