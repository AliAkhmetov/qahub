'use client';

import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'react-query';
import { createPostService } from '@/services/post/posts';

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

  const createPost = useMutation({
    mutationKey: ['createPost'],
    mutationFn: createPostService,
  });
  const { isAuth, token } = useAuthStore();

  const handleCreatePost = async () => {
    const response = await createPost.mutateAsync({
      formData: {
        categoriesInt: [1, 3],
        content: value,
        title: 'tut',
        readTime: 7,
        imageLink:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.m.wikipedia.org%2Fwiki%2F%25D0%25A4%25D0%25B0%25D0%25B9%25D0%25BB%3AImage_created_with_a_mobile_phone.png&psig=AOvVaw1oiegSb9Mu75psEkUQ-YlN&ust=1709912124420000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMj-hZi94oQDFQAAAAAdAAAAABAE',
      },
      access: token.access,
    });
  };

  // if (!isAuth) {
  //   return redirect('/blog');
  // }

  return (
    <div>
      <Header />

      <div className={styles['editor']}>
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={value}
          onChange={setValue}
        />
      </div>

      <div className={styles['actions']}>
        <button
          onClick={handleCreatePost}
          type='button'
          className={styles['actions__button-publish']}
        >
          Опубликовать
        </button>
        <button type='button' className={styles['actions__button-close']}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
