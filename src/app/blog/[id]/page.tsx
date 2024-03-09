'use client';

import hljs from 'highlight.js';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { getPostByIdService } from '@/services/post/posts';
import { useEffect, useState } from 'react';
import type { Article } from '@/types';

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

export default function ID() {
  const params = useParams();

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>();

  const handleEdit = async () => {
    setIsEditable(true);
  };

  const handleUpdate = () => {};

  const handleDelete = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    getPostByIdService({ id: params.id.toString() })
      .then((data) => setFormData(data.data.post_info))
      .catch(() => {});
  }, []);

  return (
    <div className={styles['wrapper']}>
      <Header />

      {!formData ? (
        <p>Загрузка поста...</p>
      ) : (
        <article className={styles['article']}>
          {!isEditable && (
            <div className={styles['article-actions']}>
              <button
                onClick={() => handleEdit()}
                className={styles['article-actions__button']}
                type='button'
              >
                <svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none'>
                  <defs>
                    <clipPath id='clip157_2715'>
                      <rect
                        id='Icon/Pencil'
                        width='24.000000'
                        height='24.000000'
                        fill='white'
                        fillOpacity='0'
                      />
                    </clipPath>
                  </defs>
                  <g clipPath='url(#clip157_2715)'>
                    <path
                      id='Vector'
                      d='M8 20L18.5 9.5C19.0312 8.9696 19.3281 8.25024 19.3281 7.5C19.3281 6.74988 19.0312 6.03052 18.5 5.5C17.9688 4.9696 17.25 4.67163 16.5 4.67163C15.75 4.67163 15.0312 4.9696 14.5 5.5L4 16L4 20L8 20Z'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                    />
                    <path
                      id='Vector'
                      d='M13.5 6.5L17.5 10.5'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                  </g>
                </svg>
              </button>

              <button
                onClick={() => handleDelete()}
                className={styles['acticle-actions__button']}
                type='button'
              >
                <svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none'>
                  <defs>
                    <clipPath id='clip157_2719'>
                      <rect
                        id='Icon/Trash'
                        width='24.000000'
                        height='24.000000'
                        fill='white'
                        fillOpacity='0'
                      />
                    </clipPath>
                  </defs>
                  <g clipPath='url(#clip157_2719)'>
                    <path
                      id='Vector'
                      d='M4 7L20 7'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M10 11L10 17'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M14 11L14 17'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M5 7L6 19C6 19.5304 6.21094 20.0392 6.58594 20.4142C6.96094 20.7893 7.46875 21 8 21L16 21C16.5312 21 17.0391 20.7893 17.4141 20.4142C17.7891 20.0392 18 19.5304 18 19L19 7'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M9 7L9 4C9 3.73474 9.10547 3.48047 9.29297 3.29285C9.48047 3.10535 9.73438 3 10 3L14 3C14.2656 3 14.5195 3.10535 14.707 3.29285C14.8945 3.48047 15 3.73474 15 4L15 7'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                  </g>
                </svg>
              </button>
            </div>
          )}

          {isEditable ? (
            <div className={styles['editor-fields']}>
              <input
                type='text'
                className={styles['editor-fields__title']}
                placeholder='Заголовок публикации в блоге'
                value={formData.title}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({ ...prev, title: value }))
                }
              />

              <input
                type='text'
                className={styles['editor-fields__image']}
                placeholder='Ссылка на изображение'
                value={formData.imageLink}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({ ...prev, image: value }))
                }
              />

              <input
                type='number'
                inputMode='numeric'
                className={styles['editor-fields__image']}
                placeholder='Время чтения'
                value={formData.readTime}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({ ...prev, readTime: Number(value) }))
                }
              />
            </div>
          ) : (
            <div className={styles['article-header']}>
              <h1 className={styles['article-header__title']}>{formData.title}</h1>

              <div className={styles['article-header__image']}>
                <img src={formData.imageLink} alt='' />
              </div>
            </div>
          )}

          <p className={styles['article-datetime']}>
            {dayjs(formData.createdAt).format('DD/MM/YYYY')}
          </p>

          {isEditable ? (
            <>
              <ReactQuill
                theme='snow'
                className={styles['article-content']}
                modules={modules}
                formats={formats}
                value={formData.content}
                onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              />

              <div className={styles['editor-actions']}>
                <button
                  onClick={handleUpdate}
                  type='button'
                  className={styles['editor-actions__button-publish']}
                >
                  Обновить
                </button>
                <button
                  onClick={() => setIsEditable(false)}
                  type='button'
                  className={styles['editor-actions__button-close']}
                >
                  Закрыть
                </button>
              </div>
            </>
          ) : (
            <main
              dangerouslySetInnerHTML={{ __html: formData.content || '' }}
              className={styles['article-content']}
            />
          )}
        </article>
      )}
    </div>
  );
}
