import React from 'react';
import {IconButton} from 'rsuite';
import {FaRegWindowMaximize, FaWindowMaximize} from 'react-icons/fa';
import SyncScrollIcon from './SyncScrollIcon';

interface props {
  expend: () => void;
  collapse: () => void;
  isLock: boolean;
  toggleScroll: () => void;
}

const PanelContorl: React.FC<props> = ({expend, collapse, isLock, toggleScroll}) => {
  return (
    <div className='preview__panel-contorl'>
      <IconButton circle appearance='subtle' onClick={expend} icon={<FaWindowMaximize style={{transform: 'rotate(-90deg)'}} />} />
      <IconButton circle appearance='subtle' onClick={collapse} icon={<FaRegWindowMaximize style={{transform: 'rotate(90deg)'}} />} />
      <IconButton circle appearance='subtle' onClick={toggleScroll} icon={<SyncScrollIcon isSync={isLock} />} />
    </div>
  );
};

export default React.memo(PanelContorl);
