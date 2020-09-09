import React, {useEffect, useState, useCallback} from 'react';
import {Modal, Form} from 'rsuite';
import {getSelectText, modalCommand} from '../../libs/Utilty';
import {actionT, formT, modalDispatchT, modalT} from '../../libs/Types';
import Help from './Modal.Help';
import Table from './Modal.Table';
import Image from './Modal.Image';
import Link from './Modal.Link';
import Btn from '../basic/Btn';

interface props {
  action: actionT;
  setModal: React.Dispatch<React.SetStateAction<modalT>>;
  editorRef: React.MutableRefObject<HTMLTextAreaElement>;
  useEditText: ({start, text, end, startSelect, endSelect, offset}: any) => void;
}

const ModalBox: React.FC<props> = ({action, setModal, editorRef, useEditText}) => {
  const select = getSelectText(editorRef.current);
  const [FormValue, setFormValue] = useState<formT>({});
  const [modalTitle, setModalTitle] = useState<string>('');
  // const [customSize, setCustomSize] = useState(false); Not Working

  // Default Value
  useEffect(() => {
    if (action === 'table') {
      setFormValue({col: 3, row: 2, align: 'justify'});
      setModalTitle('Table');
    }
    if (action === 'img') {
      setFormValue({url: '', alt: select.selectText, title: ''});
      setModalTitle('Image');
    }
    if (action === 'link') {
      setFormValue({url: '', link: select.selectText, title: ''});
      setModalTitle('link');
    }
    if (action === 'help') {
      setModalTitle('Help');
    }
  }, []);

  const handelSubmit = useCallback(() => {
    const newDispatch: modalDispatchT = {action, ...FormValue};
    useEditText(modalCommand(newDispatch, select));
    closeModal();
  }, [FormValue, action]);

  const closeModal = useCallback(() => setModal({isOpen: false, action: ''}), []);

  return (
    <Modal size='xs' show onHide={closeModal} backdrop>
      <Modal.Header>
        <Modal.Title>{(action !== 'help' ? 'New ' : '') + modalTitle}</Modal.Title>
      </Modal.Header>
      <Form onChange={(value) => setFormValue(value)} formValue={FormValue} onSubmit={() => handelSubmit()} fluid>
        <Modal.Body>
          {action === 'table' && <Table setFormValue={setFormValue} FormValue={FormValue} />}
          {action === 'img' && <Image />}
          {action === 'link' && <Link />}
          {action === 'help' && <Help />}
        </Modal.Body>
        <Modal.Footer>
          <Btn onClick={closeModal} children={'Close'} />
          {action !== 'help' && <Btn type='submit' appearance='primary' children={'Add ' + modalTitle} />}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default React.memo(ModalBox);
