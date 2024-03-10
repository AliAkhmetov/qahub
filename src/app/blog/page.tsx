'use client';

import { i18n } from '@/i18n';
import { useCallback, useEffect, useState } from 'react';
import { getAuthPosts, getPosts } from '@/api/post/posts';
import { Article as ArticleType } from '@/types';

import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer';
import { Article } from '@/components/Article';
import ChevronBottonIcon from '@/assets/icons/chevron-bottom.svg';
import styles from './page.module.scss';
import { useSettingsStore } from '@/store/settings';

export default function Blog() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [filterId, setFilterId] = useState<number>(0);

  const { language } = useSettingsStore();

  const handleFilterArticles = useCallback(
    (filterId: number) => {
      /**
       * filterId:
       * 0 - Все
       * 1 - Теория
       * 2 - Инструменты
       * 3 - Интервью
       * 4 - Прочее
       */

      if (filterId === 0) return setFilteredArticles(articles);
      setFilteredArticles(articles.filter((article) => article.categoriesInt.includes(filterId)));
    },
    [articles],
  );

  const getArticles = async ({ language }: { language: string }) => {
    const auth = localStorage.getItem('auth');

    if (!auth) {
      return getPosts({ language: language }).then((response) => {
        if (response.status === 200) {
          setArticles(response.data);
          setFilteredArticles(response.data);
        }
      });
    }

    const authParsed = JSON.parse(auth);

    return getAuthPosts({ language: language, access: authParsed.state.token.access }).then(
      (response) => {
        if (response.status === 200) {
          setArticles(response.data);
          setFilteredArticles(response.data);
        }
      },
    );
  };

  useEffect(() => {
    getArticles({ language });
  }, [language]);

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
            <button
              type='button'
              onClick={() => handleFilterArticles(0)}
              className={styles['filters__button']}
            >
              Все
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(1)}
              className={styles['filters__button']}
            >
              Теория
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(2)}
              className={styles['filters__button']}
            >
              Инструменты
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(3)}
              className={styles['filters__button']}
            >
              Интервью
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(4)}
              className={styles['filters__button']}
            >
              Прочее
            </button>
          </div>

          <div className={styles['filters__select']}>
            <select>
              <option defaultChecked>Популярное</option>
            </select>

            <ChevronBottonIcon />
          </div>
        </div>

        <div className={styles['articles']}>
          {!articles.length ? (
            <p>Загрузка постов...</p>
          ) : filteredArticles.length ? (
            filteredArticles
              .reverse()
              .map((article) => (
                <Article href={`/blog/${article.id}`} article={article} key={article.id} />
              ))
          ) : (
            <p>Не найдено!</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
