'use client';

import { useEffect, useState } from 'react';
import { getAuthPosts, getPosts } from '@/api/post/posts';
import { useSettingsStore } from '@/store/settings';
import { useAuthStore } from '@/store/auth';
import { useTranslation } from 'react-i18next';
import { Article as ArticleType } from '@/types';

import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer';
import { Article } from '@/components/Article';
import styles from './page.module.scss';

export default function Blog() {
  const { t } = useTranslation();

  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('datetime');

  const { language } = useSettingsStore();
  const { updateAuth } = useAuthStore();

  const handleFilterArticles = (filterId: number) => {
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
  };

  const handleSelectFilterArticles = () => {
    if (selectedFilter === 'datetime') {
      const sorted = [...filteredArticles].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setFilteredArticles(sorted);
      return setSelectedFilter('popular');
    }

    if (selectedFilter === 'popular') {
      const sorted = [...filteredArticles].sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setFilteredArticles(sorted);
      return setSelectedFilter('datetime');
    }
  };

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

    if (authParsed.state.isAuth)
      return getAuthPosts({ language: language, access: authParsed.state.token.access })
        .then((response) => {
          if (response.status === 200) {
            setArticles(response.data);
            setFilteredArticles(response.data);
          }
        })
        .catch(() => {
          updateAuth(false);
          getPosts({ language: language }).then((response) => {
            if (response.status === 200) {
              setArticles(response.data);
              setFilteredArticles(response.data);
            }
          });
        });

    updateAuth(false);
    return getPosts({ language: language }).then((response) => {
      if (response.status === 200) {
        setArticles(response.data);
        setFilteredArticles(response.data);
      }
    });
  };

  useEffect(() => {
    getArticles({ language });
  }, [language]);

  return (
    <div>
      <Header />

      <section className={styles['hero-section']}>
        <h1 className={styles['hero-section__title']}>{t('page.blog.title')}</h1>
        <p className={styles['hero-section__subtitle']}>{t('page.blog.description')}</p>

        <div className={styles['filters']}>
          <div className={styles['filters__left']}>
            <button
              type='button'
              onClick={() => handleFilterArticles(0)}
              className={styles['filters__button']}
            >
              {t('page.blog.filters.all')}
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(1)}
              className={styles['filters__button']}
            >
              {t('page.blog.filters.theory')}
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(2)}
              className={styles['filters__button']}
            >
              {t('page.blog.filters.tools')}
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(3)}
              className={styles['filters__button']}
            >
              {t('page.blog.filters.interview')}
            </button>

            <button
              type='button'
              onClick={() => handleFilterArticles(4)}
              className={styles['filters__button']}
            >
              {t('page.blog.filters.other')}
            </button>
          </div>

          <div className={styles['filters__select']}>
            <button
              type='button'
              onClick={() => handleSelectFilterArticles()}
              className={styles['filters__button']}
            >
              {selectedFilter === 'popular'
                ? t('page.blog.filters.new')
                : t('page.blog.filters.popular')}
            </button>
          </div>
        </div>

        {articles && (
          <div className={styles['articles']}>
            {!articles.length ? (
              <p>Загрузка постов...</p>
            ) : filteredArticles.length ? (
              filteredArticles.map((article) => (
                <Article href={`/blog/${article.id}`} article={article} key={article.id} />
              ))
            ) : (
              <p>Не найдено!</p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
