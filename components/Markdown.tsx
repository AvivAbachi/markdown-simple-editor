import React from 'react';

const setting = {breaks: true, linkify: true, typographer: true};
const markdown = require('markdown-it')(setting)
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-task-lists'));

type props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  sourceText: string;
};

const Markdown = React.forwardRef<HTMLDivElement, props>(({sourceText, ...props}, ref) => {
  const result = markdown.render(sourceText || '');
  return <div ref={ref} dangerouslySetInnerHTML={{__html: result}} {...props} />;
});

export default React.memo(Markdown);
