import Hotkeys from './HotKeys';
import React, {useRef} from 'react';
import {actionT, keyMapT} from '../libs/Types';

interface props {
  editorText: string;
  setEditorText: (newPresent: string) => void;
  handelClick: (action: actionT) => void;
}

const Editor = React.forwardRef<HTMLTextAreaElement, props>(({editorText, setEditorText, handelClick}, ref) => {
  const editorKeyMap = useRef<keyMapT>([
    {name: 'BOLD', ctrlKey: true, key: 'b', callback: () => handelClick('b')},
    {name: 'ITALIC', ctrlKey: true, key: 'i', callback: () => handelClick('i')},
    {name: 'UNDERLINE', ctrlKey: true, key: 'u', callback: () => handelClick('u')},
    {name: 'STRIKETHROUGH', ctrlKey: true, shiftKey: true, key: 's', callback: () => handelClick('s')},
    {name: 'SUBSCRIPT', ctrlKey: true, key: '.', callback: () => handelClick('sub')},
    {name: 'SUPERSCRIPT', ctrlKey: true, key: ',', callback: () => handelClick('sup')},
    {name: 'MARK', ctrlKey: true, key: 'm', callback: () => handelClick('mark')},
    {name: 'HIGHLIGHTER_1', ctrlKey: true, altKey: true, key: '1', callback: () => handelClick('h1')},
    {name: 'HIGHLIGHTER_2', ctrlKey: true, altKey: true, key: '2', callback: () => handelClick('h2')},
    {name: 'HIGHLIGHTER_3', ctrlKey: true, altKey: true, key: '3', callback: () => handelClick('h3')},
    {name: 'HIGHLIGHTER_4', ctrlKey: true, altKey: true, key: '4', callback: () => handelClick('h4')},
    {name: 'HIGHLIGHTER_5', ctrlKey: true, altKey: true, key: '5', callback: () => handelClick('h5')},
    {name: 'HIGHLIGHTER_6', ctrlKey: true, altKey: true, key: '6', callback: () => handelClick('h6')},
    {name: 'LIST_UL', ctrlKey: true, altKey: true, key: 'u', callback: () => handelClick('ul')},
    {name: 'LIST_OL', ctrlKey: true, altKey: true, key: 'n', callback: () => handelClick('ol')},
    {name: 'TASK', ctrlKey: true, altKey: true, key: 't', callback: () => handelClick('task')},
    {name: 'QUOTE_RIGHT', ctrlKey: true, key: 'q', callback: () => handelClick('quote')},
    {name: 'LINE', altKey: true, key: 'l', callback: () => handelClick('line')},
    {name: 'CODE', altKey: true, key: 'c', callback: () => handelClick('code')},
    {name: 'TABLE', altKey: true, key: 't', callback: () => handelClick('table')},
    {name: 'IMAGE', altKey: true, key: 'k', callback: () => handelClick('img')},
    {name: 'LINK', ctrlKey: true, key: 'k', callback: () => handelClick('link')},
    {name: 'TAB', key: 'tab', callback: () => handelClick('tab')},
  ]);

  return (
    <Hotkeys keyMap={editorKeyMap.current}>
      <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} id='editor' ref={ref} />
    </Hotkeys>
  );
});

export default React.memo(Editor);
