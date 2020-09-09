import React from 'react';
import InputText from '../basic/InputText';

const Table: React.FC = () => {
  return (
    <>
      <InputText label='URL' name='url' placeholder='https://' required />
      <InputText label='Link' name='link' />
      <InputText label='Title' name='title' />
    </>
  );
};

export default React.memo(Table);
