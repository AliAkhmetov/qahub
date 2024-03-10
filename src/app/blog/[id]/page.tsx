'use client';

import dayjs from 'dayjs';
import { comment, like } from '@/api/post/action';
import { useAuthStore } from '@/store/auth';
import { useSettingsStore } from '@/store/settings';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deletePostById, getAuthPostById, getPostById, updatePostById } from '@/api/post/posts';
import type { Article } from '@/types';

import Header from '@/components/Header/Header';
import { Editor } from '@/components/Editor';
import EditIcon from '@/assets/icons/edit.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import LikeIcon from '@/assets/icons/like.svg';
import DislikeIcon from '@/assets/icons/dislike.svg';
import LikeFilledIcon from '@/assets/icons/like-filled.svg';
import DislikeFilledIcon from '@/assets/icons/dislike-filled.svg';
import styles from './page.module.scss';
import 'react-quill/dist/quill.snow.css';

interface FormData extends Article {
  likedByMe: boolean;
  dislikedByMe: boolean;
  language: string;
}

export default function ID() {
  const params = useParams();
  const router = useRouter();

  const { token, isAuth } = useAuthStore();
  const { language } = useSettingsStore();

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>();
  const [comments, setComments] = useState<any[] | null>(null);
  const [commentField, setCommentField] = useState('');

  const handleEdit = async () => {
    setIsEditable(true);
  };

  const handleUpdate = async () => {
    if (!formData || !formData.language) return;

    updatePostById({
      formData: { ...formData, language: formData.language },
      access: token.access,
    }).then(() => {
      setIsEditable(false);
    });
  };

  const handleDelete = async () => {
    const auth = localStorage.getItem('auth');

    if (!formData || !formData.id) return;
    if (!auth) return;

    const authParsed = JSON.parse(auth);

    if (!authParsed.state.isAuth) return router.push('/signin');

    deletePostById({ id: formData.id, access: token.access }).then(() => {
      router.push('/blog');
    });
  };

  const handleLike = async () => {
    const auth = localStorage.getItem('auth');

    if (!formData || !formData.id) return;
    if (!auth) return;

    const authParsed = JSON.parse(auth);

    if (!authParsed.state.isAuth) return router.push('/signin');

    if (formData.likedByMe) {
      // Если я поставил лайк, то убираем лайк

      like({ formData: { postId: formData.id, type: true }, access: token.access });
      setFormData(({ likes, likedByMe, ...prev }: any) => ({
        ...prev,
        likes: likes - 1,
        likedByMe: false,
      }));
    }

    if (formData.dislikedByMe) {
      like({ formData: { postId: formData.id, type: false }, access: token.access });

      setFormData(({ dislikes, likes, dislikedByMe, likedByMe, ...prev }: any) => ({
        ...prev,
        likes: likes + 1,
        likedByMe: true,
        dislikes: dislikes - 1,
        dislikedByMe: false,
      }));
    }

    if (!formData.likedByMe && !formData.dislikedByMe) {
      like({ formData: { postId: formData.id, type: true }, access: token.access });

      setFormData(({ likes, likedByMe, ...prev }: any) => ({
        ...prev,
        likes: likes + 1,
        likedByMe: true,
      }));
    }
  };

  const handleDislike = async () => {
    const auth = localStorage.getItem('auth');

    if (!formData || !formData.id) return;
    if (!auth) return;

    const authParsed = JSON.parse(auth);

    if (!authParsed.state.isAuth) return router.push('/signin');

    if (formData.dislikedByMe) {
      // Если я поставил дизлайк, то убираем дизлайк

      like({ formData: { postId: formData.id, type: false }, access: token.access });
      setFormData(({ dislikes, dislikedByMe, ...prev }: any) => ({
        ...prev,
        dislikes: dislikes - 1,
        dislikedByMe: false,
      }));
    }

    if (formData.likedByMe) {
      like({ formData: { postId: formData.id, type: true }, access: token.access });

      setFormData(({ dislikes, likes, dislikedByMe, likedByMe, ...prev }: any) => ({
        ...prev,
        likes: likes - 1,
        likedByMe: false,
        dislikes: dislikes + 1,
        dislikedByMe: true,
      }));
    }

    if (!formData.likedByMe && !formData.dislikedByMe) {
      like({ formData: { postId: formData.id, type: false }, access: token.access });

      setFormData(({ dislikes, ...prev }: any) => ({
        ...prev,
        dislikes: dislikes + 1,
        dislikedByMe: true,
      }));
    }
  };

  const handleComment = async (event: any) => {
    event.preventDefault();

    const auth = localStorage.getItem('auth');

    if (!formData || !formData.id) return;
    if (!auth) return;

    const authParsed = JSON.parse(auth);

    if (!authParsed.state.isAuth) return router.push('/signin');

    comment({
      access: token.access,
      formData: { postId: formData.id, content: commentField },
    }).then(() => {
      getArticle({ language }).then(() => {
        setCommentField('');
      });
    });
  };

  const getArticle = async ({ language }: { language: string }) => {
    const auth = localStorage.getItem('auth');
    if (!params.id) return;
    if (!auth) return;

    const authParsed = JSON.parse(auth);

    if (!authParsed.state.isAuth)
      return getPostById({ language: language, postId: params.id.toString() }).then((response) => {
        if (response.status === 200) {
          setFormData(response.data.post_info);
          setComments(response.data.comments);
        }
      });

    return getAuthPostById({
      postId: params.id.toString(),
      language: language,
      access: authParsed.state.token.access,
    }).then((response) => {
      if (response.status === 200) {
        setFormData(response.data.post_info);
        setComments(response.data.comments);
      }
    });
  };

  useEffect(() => {
    getArticle({ language });
  }, [language]);

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
                <EditIcon />
              </button>

              <button
                onClick={() => handleDelete()}
                className={styles['acticle-actions__button']}
                type='button'
              >
                <TrashIcon />
              </button>
            </div>
          )}

          {isEditable && (
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
          )}

          {!isEditable && (
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

          {isEditable && (
            <>
              <Editor
                className={styles['article-content']}
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
          )}

          {!isEditable && (
            <main
              dangerouslySetInnerHTML={{ __html: formData.content || '' }}
              className={styles['article-content']}
            />
          )}

          {!isEditable && (
            <div className={styles['article-like']}>
              <button type='button' onClick={handleLike} className={styles['article-like__button']}>
                {formData.likedByMe ? <LikeFilledIcon /> : <LikeIcon />}

                <span>{formData.likes}</span>
              </button>

              <button
                type='button'
                onClick={handleDislike}
                className={styles['article-like__button']}
              >
                {formData.dislikedByMe ? <DislikeFilledIcon /> : <DislikeIcon />}

                <span>{formData.dislikes}</span>
              </button>
            </div>
          )}

          {!isEditable && (
            <div className={styles['comments']}>
              <p className={styles['comments__title']}>Комментарии</p>

              {isAuth && (
                <form onSubmit={handleComment} className={styles['comments__field']}>
                  <div className={styles['comments__field-image']}></div>

                  <input
                    type='text'
                    onChange={({ target: { value } }) => setCommentField(value)}
                    value={commentField}
                    placeholder='Оставить комментарий'
                    className={styles['comments__field-input']}
                  />
                </form>
              )}

              <div className={styles['comments__list']}>
                {comments &&
                  comments.map((comment, key) => (
                    <div key={key} className={styles['comment']}>
                      <div className={styles['comment__image']}></div>

                      <p className={styles['comment__name']}>{comment.authorName}</p>
                      <p className={styles['comment__content']}>{comment.content}</p>
                    </div>
                  ))}

                {!comments && 'Здесь пока нет ни одного комментария, вы можете стать первым!'}
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
}
