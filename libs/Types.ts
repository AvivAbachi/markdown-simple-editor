export type keyT = {name: string; ctrlKey?: boolean; altKey?: boolean; shiftKey?: boolean; key?: string; callback: Function};
export type keyMapT = keyT[];

export type tabT = 'hotkeys' | 'help';

export type selectT = {selectStart: number; selectText?: string; selectEnd: number; offset?: number};

export type modalT = {isOpen: boolean; action: actionT; select?: selectT};

export type formT = {
  col?: number;
  row?: number;
  align?: 'justify' | 'left' | 'center' | 'right';
  url?: string;
  link?: string;
  alt?: string;
  title?: string;
};
export type modalDispatchT = formT & {action: actionT};

export type actionT =
  | ''
  | 'b'
  | 'u'
  | 'i'
  | 's'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'ul'
  | 'ol'
  | 'mark'
  | 'sup'
  | 'sub'
  | 'code'
  | 'line'
  | 'task'
  | 'quote'
  | 'link'
  | 'img'
  | 'table'
  | 'tab'
  | 'help';
