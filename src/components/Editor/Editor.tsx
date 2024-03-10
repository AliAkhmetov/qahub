import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import type { ReactQuillProps } from 'react-quill';

const ReactQuill = dynamic(
  () => {
    hljs.configure({
      languages: ['javascript', 'php', 'go', 'css', 'html', 'scss', 'typescript'],
    });
    // @ts-ignore
    window.hljs = hljs;
    return import('react-quill');
  },
  {
    ssr: false,
    loading: () => <p>Загрузка текстового редактора...</p>,
  },
);

const modules = {
  syntax: true,
  toolbar: [
    [{ header: [2] }],
    ['bold', 'italic', 'underline', 'strike', 'code-block', 'link'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'code-block',
  'link',
  'list',
  'bullet',
  'indent',
  'image',
];

export function Editor(props: ReactQuillProps) {
  return <ReactQuill {...props} theme='snow' modules={modules} formats={formats} />;
}
