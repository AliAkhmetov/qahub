"use client";
import dayjs from 'dayjs';
import type { ArticleProps } from './types';

import Link from 'next/link';
import GlassesIcon from '@/assets/icons/eye.svg';
import styles from './Article.module.scss';
import { useTranslation } from 'react-i18next';

export function Article({ article, href }: ArticleProps) {
  const {t} = useTranslation();

  return (
    <article className={styles['article']}>
      <div className={styles['article__image']}>
        <img src={article.imageLink} alt='' />
      </div>

      <Link href={href} className={styles['article__title']}>
        <span>{article.title}</span>
      </Link>

      <div className={styles['article__footer']}>
        <div className={styles['article__likes']}>
          <svg viewBox='0 0 16.001 14'>
            <path
              d='M1.35645 7.57361C-0.452148 5.841 -0.452148 3.03198 1.35645 1.29944C3.16406 -0.433167 6.0957 -0.433167 7.90332 1.29944L8.04688 1.43616L8.09668 1.38763C9.90527 -0.344971 12.8369 -0.344971 14.6445 1.38763C16.4531 3.12018 16.4531 5.9292 14.6445 7.6618L8.03027 14L1.48242 7.72583L1.49902 7.71033L1.35645 7.57361Z'
              clipRule='evenodd'
              fill='currentColor'
              fillOpacity='1.000000'
              fillRule='evenodd'
            />
          </svg>

          <span>{article.likes}</span>
        </div>

        <p className={styles['article__date']}>{dayjs(article.createdAt).format('DD/MM/YYYY')}</p>

        <div className={styles['article__read-time']}>
          <GlassesIcon />
          <span>{t("article.readtime",{readtime:article.readTime}) }</span>
        </div>
      </div>
    </article>
  );
}
