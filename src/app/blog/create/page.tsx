'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/api/post/posts';

import Header from '@/components/Header/Header';
import { Editor } from '@/components/Editor';
import styles from './page.module.scss';
import 'react-quill/dist/quill.snow.css';

interface FormData {
  title: string;
  content: string;
  imageLink: string;
  readTime: string;
  language: string;
  categoriesInt: number[] | [];
}

export default function Create() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    categoriesInt: [],
  } as FormData);

  const handleUpdateFormData = (formData: { [key: string]: string }) => {
    setFormData((prev) => ({ ...prev, ...formData }));
  };

  const handleCategoriesInt = ({ checked, value }: { checked: boolean; value: number }) => {
    if (checked)
      return setFormData((prev) => ({
        ...prev,
        categoriesInt: [...prev.categoriesInt, value],
      }));

    return setFormData((prev) => ({
      ...prev,
      categoriesInt: prev.categoriesInt.filter((item) => item !== value),
    }));
  };

  const handleCreatePost = async () => {
    const auth = localStorage.getItem('auth');
    if (!auth) return router.push('/signin');

    const parsedAuth = JSON.parse(auth);

    const response = await createPost({
      formData: {
        title: formData.title,
        content: formData.content,
        imageLink: formData.imageLink,
        categoriesInt: formData.categoriesInt,
        language: formData.language,
        readTime: Number(formData.readTime),
      },
      access: parsedAuth.state.token.access,
    });

    if (response.status === 200) {
      return router.push(`/blog/${response.data.id}`);
    }
  };

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
            onChange={({ target: { value } }) => handleUpdateFormData({ title: value })}
          />

          <input
            type='text'
            className={styles['editor-fields__image']}
            placeholder='Ссылка на изображение'
            value={formData.imageLink}
            onChange={({ target: { value } }) => handleUpdateFormData({ imageLink: value })}
          />

          <input
            type='number'
            inputMode='numeric'
            className={styles['editor-fields__image']}
            placeholder='Время чтения'
            value={formData.readTime}
            onChange={({ target: { value } }) => handleUpdateFormData({ readTime: value })}
          />

          <input
            type='text'
            className={styles['editor-fields__image']}
            placeholder='Язык статьи'
            value={formData.language}
            onChange={({ target: { value } }) => handleUpdateFormData({ language: value })}
          />

          <div className={styles['editor-fields__categories-int']}>
            <label>
              <span>Теория</span>
              <input
                type='checkbox'
                value={1}
                onChange={({ target: { checked } }) => handleCategoriesInt({ checked, value: 1 })}
              />
            </label>

            <label>
              <span>Инструменты</span>
              <input
                type='checkbox'
                value={2}
                onChange={({ target: { checked } }) => handleCategoriesInt({ checked, value: 2 })}
              />
            </label>

            <label>
              <span>Интервью</span>
              <input
                type='checkbox'
                value={3}
                onChange={({ target: { checked } }) => handleCategoriesInt({ checked, value: 3 })}
              />
            </label>

            <label>
              <span>Прочее</span>
              <input
                type='checkbox'
                value={4}
                onChange={({ target: { checked } }) => handleCategoriesInt({ checked, value: 4 })}
              />
            </label>
          </div>
        </div>

        <Editor
          value={formData.content}
          onChange={(value) => handleUpdateFormData({ content: value })}
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
