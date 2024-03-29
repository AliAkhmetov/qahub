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
    // [{ header: [2, 3] }],
    // ['bold', 'italic', 'underline', 'strike', 'code-block', 'link'],
    // [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    // ['image'],
    // ['clean'],
    
    ['bold', 'italic', 'underline', 'strike', 'code-block', 'link'], // toggled buttons
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    ['image'],

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
    [{ 'color': [] }, { 'background': [] }],
    [{ 'direction': 'rtl' }], // text direction

    ['clean'], // remove formatting button
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
  'color',
  'background',
  'direction',
  'script',
];

export function Editor(props: ReactQuillProps) {
  return <ReactQuill {...props} theme='snow' modules={modules} formats={formats} />;
}
