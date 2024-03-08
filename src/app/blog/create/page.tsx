'use client';

import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'react-query';
import { createPostService } from '@/services/post/posts';
import { useForm } from 'react-hook-form';

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

export default function Create() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
  });

  const createPost = useMutation({
    mutationKey: ['createPost'],
    mutationFn: createPostService,
  });
  const { isAuth, token } = useAuthStore();

  const handleCreatePost = async () => {
    const response = await createPost.mutateAsync({
      formData: {
        title: formData.title,
        content: formData.content,
        imageLink: formData.image,
        categoriesInt: [1, 3],
        readTime: 7,
      },
      access: token.access,
    });

    if (response.status === 200) {
      return router.push(`/blog/${response.data.id}`);
    }
  };

  if (!isAuth) {
    return router.back();
  }

  return (
    <div>
      <Header />

      <div className={styles['editor']}>
        <div className={styles['editor-fields']}>
          <input
            type='text'
            className={styles['editor-fields__title']}
            placeholder='Заголовок публикации в блоге'
            value={formData.title}
            onChange={({ target: { value } }) => setFormData((prev) => ({ ...prev, title: value }))}
          />

          <input
            type='text'
            className={styles['editor-fields__image']}
            placeholder='Ссылка на изображение'
            value={formData.image}
            onChange={({ target: { value } }) => setFormData((prev) => ({ ...prev, image: value }))}
          />
        </div>

        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={formData.content}
          onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
        />

        <div className={styles['editor-actions']}>
          <button
            onClick={handleCreatePost}
            type='button'
            className={styles['editor-actions__button-publish']}
          >
            Опубликовать
          </button>
          <button type='button' className={styles['editor-actions__button-close']}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
