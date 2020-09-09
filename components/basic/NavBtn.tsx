import React from 'react';
import {Nav} from 'rsuite';

interface props {
  icon?: React.ReactElement;
  label?: React.ReactText;
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
  eventKey?: string;
  active?: boolean;
}

export const NavBtn: React.FC<props> = ({icon, label, ...props}) => {
  return (
    <Nav.Item {...props}>
      {icon} {label}
    </Nav.Item>
  );
};
