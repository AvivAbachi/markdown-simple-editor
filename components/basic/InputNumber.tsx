import React from 'react';
import {ControlLabel, FormGroup, InputNumber as Number} from 'rsuite';

interface InputNumberControlProps {
  label?: string;
  defaultValue?: React.ReactText;
  min?: number;
  max?: number;
  onChange?: (value: React.ReactText, event?: React.SyntheticEvent<any, Event>) => void;
}

const InputNumber: React.FC<InputNumberControlProps> = ({label, defaultValue, min, max, onChange}) => {
  return (
    <FormGroup style={{display: 'inline-block', width: '50%'}}>
      <ControlLabel children={label} />
      <Number style={{width: '50%'}} defaultValue={defaultValue as string} min={min} max={max} onChange={onChange} />
    </FormGroup>
  );
};

export default React.memo(InputNumber);
