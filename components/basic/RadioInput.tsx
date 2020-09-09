import React from 'react';
import {ControlLabel, FormGroup, Radio, RadioGroup} from 'rsuite';
import {FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight} from 'react-icons/fa';
import {formT} from '../../libs/Types';

interface RadioAlignProps {
  value: formT;
  setFormValue: React.Dispatch<React.SetStateAction<formT>>;
}

const RadioAlign: React.FC<RadioAlignProps> = ({value, setFormValue}) => {
  return (
    <FormGroup controlId='align'>
      <ControlLabel>Text align</ControlLabel>
      <RadioGroup
        defaultValue='justify'
        inline
        name='align'
        appearance='picker'
        value={value.align}
        onChange={(value) => setFormValue((prev) => ({...prev, align: value}))}>
        <Radio name='align' value='justify' children={<FaAlignJustify />} />
        <Radio name='align' value='left' children={<FaAlignLeft />} />
        <Radio name='align' value='center' children={<FaAlignCenter />} />
        <Radio name='align' value='right' children={<FaAlignRight />} />
      </RadioGroup>
    </FormGroup>
  );
};

export default React.memo(RadioAlign);
