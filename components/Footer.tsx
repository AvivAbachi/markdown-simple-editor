import React from 'react';
import Btn from './basic/Btn';

interface props {
  show: boolean;
}

const Footer: React.FC<props> = ({show}) => {
  return (
    <footer className='footer' style={{transform: `translateY(${show ? '100%' : 0})`}}>
      <Btn size='md' href='https://github.com/AvivAbachi/' target='_blank'>
        Code and Design by AvivAbachi@gmail.com
      </Btn>
    </footer>
  );
};

export default React.memo(Footer);
