import React from 'react';
import {actionT} from '../../libs/Types';
import {Dropdown} from 'rsuite';

interface HeadlineItemProps {
  size: number;
  useClick: (action: actionT) => void;
}

const HeadlineItem: React.FC<HeadlineItemProps> = ({size, useClick}) => {
  return (
    <Dropdown.Item onClick={() => useClick(('h' + size) as actionT)} children={React.createElement('h' + size, null, 'Headline' + size)} />
  );
};

export default React.memo(HeadlineItem);
