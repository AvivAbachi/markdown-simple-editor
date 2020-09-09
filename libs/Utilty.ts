import {actionT, selectT} from './Types';

// ALl Commands
export const COMMANDS = {
  b: '**',
  i: '_',
  u: '++',
  s: '~~',
  mark: '==',
  sup: '^',
  sub: '~',
  h1: '#',
  h2: '##',
  h3: '###',
  h4: '####',
  h5: '#####',
  h6: '######',
  ul: '-',
  ol: '1.',
  task: '- [ ] ',
  quote: '>',
  code: '`',
  codeBlock: '```',
  line: '---',
  tab: '  ',
};

const TABEL_COMMANDS = {
  space: '       |',
  justify: ' ----- |',
  left: ':----- |',
  center: ':-----:|',
  right: ' -----:|',
};

// Load Markdown File
export const getMarkdown = (file: 'help' | 'hotkeys' | 'welcome'): string => {
  if (file === 'help') return require('../content/Help.md').default;
  if (file === 'hotkeys') return require('../content/Hotkeys.md').default;
  if (file === 'welcome') return require('../content/Welcome.md').default;
  return '';
};

// Selected Text
export const getSelectText = (element: HTMLTextAreaElement): selectT => ({
  selectStart: element.selectionStart,
  selectEnd: element.selectionEnd,
  selectText: element.value.substring(element.selectionStart, element.selectionEnd),
});

// Edit Text
export const basicCommand = (action: actionT, select: selectT) => {
  const command: string = COMMANDS[action];
  return {
    start: select.selectStart,
    text:
      action === 'code' && select.selectText.match(/\n/gm)
        ? '```' + '\n' + select.selectText + command !== '\n' + '```'
        : command + select.selectText + command,
    end: select.selectEnd,
    offset: command.length,
  };
};

export const inputCommand = (action: actionT, select: selectT) => {
  const command = COMMANDS[action];
  if (action === 'tab') return {start: select.selectStart, text: COMMANDS[action], offset: command.length};
};

export const startLineCommand = (action: actionT, select: selectT, sourceText: string) => {
  let NumberOfLine = 0;
  const startLine = sourceText.lastIndexOf('\n', select.selectStart) + 1;
  const command = COMMANDS[action] + (action === 'line' ? '\n' : ' ');
  const text = sourceText
    .substring(startLine, select.selectEnd)
    .split('\n')
    .map((line) => {
      NumberOfLine++;
      return command + line;
    })
    .join('\n');
  return {
    start: startLine,
    text,
    end: select.selectEnd,
    endSelect: select.selectEnd + NumberOfLine * command.length,
    startSelect: NumberOfLine > 1 ? select.selectEnd + NumberOfLine * command.length : startLine + command.length,
  };
};

export const modalCommand = (dispatch: any, select: selectT) => {
  let text: string = '';
  if (dispatch.action === 'link') text = `[${dispatch.link}](${dispatch.url} "${dispatch.title}")`;
  if (dispatch.action === 'img') text = `![${dispatch.alt}](${dispatch.url} "${dispatch.title}")`;
  // const size = dispatch.size ? `=${dispatch.size.width}x${dispatch.size.height}` : ''; ${size} Image Size (Not working)
  if (dispatch.action === 'table') {
    text =
      `| ${select.selectText ? select.selectText + ` |` : TABEL_COMMANDS.space}` +
      `${TABEL_COMMANDS.space.repeat(dispatch.col - 1)}\n` +
      `|${TABEL_COMMANDS[dispatch.align].repeat(dispatch.col)}\n` +
      `${('|' + TABEL_COMMANDS.space.repeat(dispatch.col) + '\n').repeat(dispatch.row)}`;
  }
  return {
    start: select.selectStart,
    text,
    end: select.selectEnd,
    startSelect: select.selectEnd + text.length,
    endSelect: select.selectEnd + text.length,
  };
};
