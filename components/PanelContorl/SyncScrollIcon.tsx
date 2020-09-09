import React from 'react';
import {FaArrowsAltV, FaLongArrowAltDown, FaLongArrowAltUp} from 'react-icons/fa';

interface props {
  isSync: boolean;
}

const SyncScrollIcon: React.FC<props> = ({isSync}) => {
  return (
    <span className='preview__sync-scroll-icon'>
      {isSync ? <FaArrowsAltV /> : <FaLongArrowAltDown />}
      {isSync ? <FaArrowsAltV /> : <FaLongArrowAltUp />}
    </span>
  );
};
export default SyncScrollIcon;
