'use client';

import { useQuery } from 'react-query';
import { getPostsService } from '@/services/post/posts';

import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer';
import { Article } from '@/components/Article';
import styles from './page.module.scss';

export default function Blog() {
  const { isLoading, data: response } = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsService,
  });

  const articles = response?.data.reverse();

  return (
    <div>
      <Header />

      <section className={styles['hero-section']}>
        <h1 className={styles['hero-section__title']}>Learn about testing</h1>
        <p className={styles['hero-section__subtitle']}>
          Стратьи о QA для начинающих и продвинутых
        </p>

        <div className={styles['filters']}>
          <div className={styles['filters__left']}>
            <button type='button' className={styles['filters__button']}>
              Все
            </button>
            <button type='button' className={styles['filters__button']}>
              Инструменты
            </button>
            <button type='button' className={styles['filters__button']}>
              Интервью
            </button>
          </div>

          <div className={styles['filters__select']}>
            <select>
              <option defaultChecked>Популярное</option>
            </select>

            <svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
        </div>

        <div className={styles['articles']}>
          {isLoading || !articles ? (
            <p>Загрузка постов...</p>
          ) : (
            articles.map((article) => (
              <Article href={`/blog/${article.id}`} article={article} key={article.id} />
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
