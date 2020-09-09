import React from 'react';
import {Button} from 'rsuite';

interface props {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  href?: string;
  type?: string;
  target?: string;
  appearance?: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Btn: React.FC<props> = ({onClick, appearance = 'subtle', ...props}) => {
  return <Button appearance={appearance} onClick={onClick} {...props} />;
};

export default React.memo(Btn);
