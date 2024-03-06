'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';

import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import 'react-quill/dist/quill.snow.css';

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
    loading: () => <p>Loading</p>,
  },
);

const modules = {
  syntax: true,
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code-block',
];

export default function Create() {
  const [value, setValue] = useState('<h1>Heading</h1>');

  return (
    <div>
      <Header />

      <div className={styles['editor']}>
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={value}
          onChange={(value) => {
            setValue(value);
            console.log(value);
          }}
        />
      </div>

      <div className={styles['actions']}>
        <button type='button' className={styles['actions__button-publish']}>
          Опубликовать
        </button>
        <button type='button' className={styles['actions__button-close']}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
