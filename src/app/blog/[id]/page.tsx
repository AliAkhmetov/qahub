'use client';

import hljs from 'highlight.js';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import {
  deletePostService,
  getAuthPostByIdService,
  getPostByIdService,
  updatePostService,
} from '@/services/post/posts';
import { useEffect, useState } from 'react';
import type { Article } from '@/types';

import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'react-query';
import { useAuthStore } from '@/store/auth';
import { likeService } from '@/services/post/action';
import { i18n } from '@/i18n';

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

interface FormData extends Article {
  likedByMe: boolean;
  dislikedByMe: boolean;
  language: string;
}

export default function ID() {
  const params = useParams();
  const router = useRouter();

  const { token, isAuth } = useAuthStore();

  const updatePost = useMutation({
    mutationKey: ['updatePost'],
    mutationFn: updatePostService,
  });

  const deletePost = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: deletePostService,
  });

  const like = useMutation({
    mutationKey: ['like'],
    mutationFn: likeService,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>();

  const handleEdit = async () => {
    setIsEditable(true);
  };

  const handleUpdate = async () => {
    if (!formData) return;

    updatePost
      .mutateAsync({ formData, access: token.access, language: formData.language })
      .then((data) => {
        setIsEditable(false);
      });
  };

  const handleDelete = async () => {
    if (!formData || !formData.id) return;

    deletePost.mutateAsync({ id: formData.id, access: token.access }).then((response) => {
      router.push('/blog');
    });
  };

  const handleLike = async () => {
    if (!formData || !formData.id) return;
    if (formData.likedByMe) return;

    like
      .mutateAsync({ formData: { postId: formData.id, type: true }, access: token.access })
      .then((data) => {
        setFormData(({ dislikes, likes, ...prev }: any) => ({
          ...prev,
          dislikedByMe: false,
          dislikes: dislikes - 1,
          likedByMe: true,
          likes: likes + 1,
        }));
      });
  };

  const handleDislike = async () => {
    if (!formData || !formData.id) return;
    if (formData.dislikedByMe) return;

    like
      .mutateAsync({ formData: { postId: formData.id, type: false }, access: token.access })
      .then((data) => {
        setFormData(({ dislikes, likes, ...prev }: any) => ({
          ...prev,
          dislikedByMe: true,
          dislikes: dislikes + 1,
          likedByMe: false,
          likes: likes - 1,
        }));
        console.log(data.data);
      });
  };

  useEffect(() => {
    if (!isAuth) {
      getPostByIdService({ id: params.id.toString() })
        .then((data) => setFormData(data.data.post_info))
        .catch(() => {});
    } else {
      getAuthPostByIdService({
        id: params.id.toString(),
        access: token.access,
        language: i18n.language,
      })
        .then((data) => setFormData(data.data.post_info))
        .catch(() => {});
    }
  }, []);

  return (
    <div className={styles['wrapper']}>
      <Header />

      {!formData ? (
        <p>Загрузка поста...</p>
      ) : (
        <article className={styles['article']}>
          {isAuth && !isEditable && (
            <div className={styles['article-actions']}>
              <button
                onClick={() => handleEdit()}
                className={styles['acticle-actions__button']}
                type='button'
              >
                <svg width='24.000000' height='24.000000' viewBox='0 0 24 24' fill='none'>
                  <g clipPath='url(#clip157_2715)'>
                    <path
                      id='Vector'
                      d='M8 20L18.5 9.5C19.0312 8.9696 19.3281 8.25024 19.3281 7.5C19.3281 6.74988 19.0312 6.03052 18.5 5.5C17.9688 4.9696 17.25 4.67163 16.5 4.67163C15.75 4.67163 15.0312 4.9696 14.5 5.5L4 16L4 20L8 20Z'
                      stroke='currentColor'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                    />
                    <path
                      id='Vector'
                      d='M13.5 6.5L17.5 10.5'
                      stroke='currentColor'
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
                  <g clipPath='url(#clip157_2719)'>
                    <path
                      id='Vector'
                      d='M4 7L20 7'
                      stroke='currentColor'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M10 11L10 17'
                      stroke='currentColor'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M14 11L14 17'
                      stroke='currentColor'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M5 7L6 19C6 19.5304 6.21094 20.0392 6.58594 20.4142C6.96094 20.7893 7.46875 21 8 21L16 21C16.5312 21 17.0391 20.7893 17.4141 20.4142C17.7891 20.0392 18 19.5304 18 19L19 7'
                      stroke='currentColor'
                      strokeOpacity='1.000000'
                      strokeWidth='1.500000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      id='Vector'
                      d='M9 7L9 4C9 3.73474 9.10547 3.48047 9.29297 3.29285C9.48047 3.10535 9.73438 3 10 3L14 3C14.2656 3 14.5195 3.10535 14.707 3.29285C14.8945 3.48047 15 3.73474 15 4L15 7'
                      stroke='currentColor'
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
                  setFormData((prev) => ({ ...prev, imageLink: value }))
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

              <input
                type='text'
                className={styles['editor-fields__image']}
                placeholder='Язык статьи'
                value={formData.language}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({ ...prev, language: value }))
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

          {!isEditable && (
            <div className={styles['article-like']}>
              <button type='button' onClick={handleLike} className={styles['article-like__button']}>
                {formData.likedByMe ? (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                    />
                  </svg>
                )}

                <span>{formData.likes}</span>
              </button>

              <button
                type='button'
                onClick={handleDislike}
                className={styles['article-like__button']}
              >
                {formData.dislikedByMe ? (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54'
                    />
                  </svg>
                )}

                <span>{formData.dislikes}</span>
              </button>
            </div>
          )}

          {!isEditable && (
            <div className={styles['comments']}>
              <p className={styles['comments__title']}>Комментарии</p>

              {isAuth && (
                <div className={styles['comments__field']}>
                  <div className={styles['comments__field-image']}></div>

                  <input
                    type='text'
                    placeholder='Оставить комментарий'
                    className={styles['comments__field-input']}
                  />
                </div>
              )}

              <div className={styles['comments__list']}>
                <div className={styles['comment']}>
                  <div className={styles['comment__image']}></div>

                  <p className={styles['comment__name']}>Али Ахметов</p>
                  <p className={styles['comment__content']}>Хорошая статья! Спасибо за труд</p>
                </div>
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
}
