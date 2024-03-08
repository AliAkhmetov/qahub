'use client';

import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { getPostByIdService } from '@/services/post/posts';
import dayjs from 'dayjs';

export default function ID() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['getPostById'],
    queryFn: () => getPostByIdService({ id: params.id.toString() }),
  });
  const article = data?.data.post_info;

  return (
    <div className={styles['wrapper']}>
      <Header />

      {isLoading || !article ? (
        <p>Загрузка поста...</p>
      ) : (
        <article className={styles['article']}>
          <div className={styles['article-header']}>
            <h1 className={styles['article-header__title']}>{article.title}</h1>

            <div className={styles['article-header__image']}>
              <img src={article.imageLink} alt='' />
            </div>
          </div>

          <p className={styles['article-datetime']}>
            {dayjs(article.createdAt).format('DD/MM/YYYY')}
          </p>

          <main
            className={styles['article-content']}
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </article>
      )}
    </div>
  );
}
