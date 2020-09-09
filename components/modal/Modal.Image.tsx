import React from 'react';
import InputText from '../basic/InputText';

const Table: React.FC = () => {
  return (
    <>
      <InputText label='URL' name='url' placeholder='https://' required />
      <InputText label='Alt' name='alt' />
      <InputText label='Title' name='title' />
    </>
  );
};

export default React.memo(Table);

// Custom Image Size (Not Working)
// if (!customSize || newDispatch.size.width === undefined || newDispatch.size.height === undefined) delete newDispatch.size;

// <FormGroup>
// <Checkbox onChange={(_, checked) => setCustomSize(checked)}>Custom image size</Checkbox>
// <InputNumberControl disabled={!customSize} label={'width'} min={0} onChange={(value) => setFormValue((prev) => ({...prev, size: {...prev.size, width: value}}))} />
// <InputNumberControl disabled={!customSize} label={'height'} min={0} onChange={(value) => setFormValue((prev) => ({...prev, size: {...prev.size, height: value}}))} />
// </FormGroup>
