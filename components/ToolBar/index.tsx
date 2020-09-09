import React from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaHighlighter,
  FaListUl,
  FaListOl,
  FaTasks,
  FaQuoteRight,
  FaMinus,
  FaCode,
  FaTable,
  FaImage,
  FaLink,
} from 'react-icons/fa';
import {actionT} from '../../libs/Types';
import ToolBarDropDown from './Dropdown';
import Btn from '../basic/Btn';

interface props {
  useClick: (action: actionT) => void;
}

const ToolBar: React.FC<props> = ({useClick}) => {
  return (
    <div className='editor__toolbar'>
      <Btn onClick={() => useClick('b')} children={<FaBold />} />
      <Btn onClick={() => useClick('i')} children={<FaItalic />} />
      <Btn onClick={() => useClick('u')} children={<FaUnderline />} />
      <Btn onClick={() => useClick('s')} children={<FaStrikethrough />} />
      <ToolBarDropDown useClick={useClick} />
      <Btn onClick={() => useClick('sub')} children={<FaSubscript />} />
      <Btn onClick={() => useClick('sup')} children={<FaSuperscript />} />
      <Btn onClick={() => useClick('mark')} children={<FaHighlighter />} />
      <Btn onClick={() => useClick('ul')} children={<FaListUl />} />
      <Btn onClick={() => useClick('ol')} children={<FaListOl />} />
      <Btn onClick={() => useClick('task')} children={<FaTasks />} />
      <Btn onClick={() => useClick('quote')} children={<FaQuoteRight />} />
      <Btn onClick={() => useClick('line')} children={<FaMinus />} />
      <Btn onClick={() => useClick('code')} children={<FaCode />} />
      <Btn onClick={() => useClick('table')} children={<FaTable />} />
      <Btn onClick={() => useClick('img')} children={<FaImage />} />
      <Btn onClick={() => useClick('link')} children={<FaLink />} />
    </div>
  );
};

export default React.memo(ToolBar);
