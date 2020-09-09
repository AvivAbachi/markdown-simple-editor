import React from 'react';
import {ButtonGroup, Dropdown} from 'rsuite';
import {FaHeading, FaAngleDown} from 'react-icons/fa';
import {actionT} from '../../libs/Types';
import DropdownItem from './DropdownItem';
import Btn from '../basic/Btn';

interface props {
  useClick: (action: actionT) => void;
}

const ToolBarDropDown: React.FC<props> = ({useClick}) => {
  return (
    <ButtonGroup>
      <Btn onClick={() => useClick('h1')} children={<FaHeading />} />
      <Dropdown placement='bottomStart' renderTitle={() => <Btn children={<FaAngleDown />} />}>
        <DropdownItem size={1} useClick={useClick} />
        <DropdownItem size={2} useClick={useClick} />
        <DropdownItem size={3} useClick={useClick} />
        <DropdownItem size={4} useClick={useClick} />
        <DropdownItem size={5} useClick={useClick} />
        <DropdownItem size={6} useClick={useClick} />
      </Dropdown>
    </ButtonGroup>
  );
};
export default React.memo(ToolBarDropDown);
