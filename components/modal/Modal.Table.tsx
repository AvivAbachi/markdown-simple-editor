import React from 'react';
import {formT} from '../../libs/Types';
import InputNumber from '../basic/InputNumber';
import RadioAlign from '../basic/RadioInput';

interface props {
  FormValue: formT;
  setFormValue: React.Dispatch<React.SetStateAction<formT>>;
}

const Table: React.FC<props> = ({FormValue, setFormValue}) => {
  return (
    <>
      <InputNumber
        label={'Col'}
        defaultValue={FormValue.col}
        min={1}
        max={10}
        onChange={(value: React.ReactText) => setFormValue((prev: formT) => ({...prev, col: value as number}))}
      />
      <InputNumber
        label={'Row'}
        defaultValue={FormValue.row}
        min={1}
        max={10}
        onChange={(value: React.ReactText) => setFormValue((prev: formT) => ({...prev, row: value as number}))}
      />
      <RadioAlign value={FormValue} setFormValue={setFormValue} />
    </>
  );
};

export default React.memo(Table);
