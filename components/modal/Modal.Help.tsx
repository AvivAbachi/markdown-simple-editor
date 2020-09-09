import React, {useState} from 'react';
import {Nav} from 'rsuite';
import {getMarkdown} from '../../libs/Utilty';
import {tabT} from '../../libs/Types';
import Markdown from '../Markdown';
import {NavBtn} from '../basic/NavBtn';

const Help: React.FC = () => {
  const [active, setActive] = useState<tabT>('help');
  return (
    <>
      <Nav appearance='subtle' active={active} onSelect={(tab: tabT) => setActive(tab)}>
        <NavBtn eventKey='help' active={active === 'help'} label={'Help'} />
        <NavBtn eventKey='hotkeys' active={active === 'hotkeys'} label={'Hotkeys'} />
      </Nav>
      <Markdown sourceText={getMarkdown(active)} />
    </>
  );
};

export default React.memo(Help);
