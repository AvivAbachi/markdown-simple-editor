import React, {useEffect} from 'react';
import {keyT, keyMapT} from '../libs/Types';

interface props {
  keyMap: keyMapT;
  children: React.ReactNode;
}

const HotKeys: React.FC<props> = ({children, keyMap}) => {
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => hotkeys(e, keyMap));
    return () => {
      document.removeEventListener('keydown', (e: KeyboardEvent) => hotkeys(e, keyMap));
    };
  }, []);

  const hotkeys = (e: KeyboardEvent, keyMap: keyMapT) => {
    const {ctrlKey, altKey, shiftKey, key} = e;
    keyMap.map((hotkey: keyT) => {
      if (
        (hotkey.ctrlKey ?? false) === ctrlKey &&
        (hotkey.altKey ?? false) === altKey &&
        (hotkey.shiftKey ?? false) === shiftKey &&
        (hotkey.key ?? '') === key.toLowerCase()
      ) {
        hotkey.callback();
        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
      }
    });
  };

  return <React.Fragment children={children} />;
};
export default React.memo(HotKeys);
