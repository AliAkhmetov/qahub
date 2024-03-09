import dayjs from 'dayjs';
import type { ArticleProps } from './types';

import Link from 'next/link';
import styles from './Article.module.scss';

export function Article({ article, href }: ArticleProps) {
  return (
    <article className={styles['article']}>
      <div className={styles['article__image']}>
        <img src={article.imageLink} alt='' />
      </div>

      <Link href={href} className={styles['article__title']}>
        <span>{article.title}</span>

        <svg viewBox='0 0 30 24' fill='none'>
          <path
            d='M19.7139 4L26 12'
            stroke='currentColor'
            strokeOpacity='1.000000'
            strokeWidth='2.000000'
            strokeLinejoin='round'
            strokeLinecap='round'
          />
          <path
            d='M4 12L26 12'
            stroke='currentColor'
            strokeOpacity='1.000000'
            strokeWidth='2.000000'
            strokeLinejoin='round'
            strokeLinecap='round'
          />
          <path
            d='M19.7139 20L26 12'
            stroke='currentColor'
            strokeOpacity='1.000000'
            strokeWidth='2.000000'
            strokeLinejoin='round'
            strokeLinecap='round'
          />
        </svg>
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

        <p className={styles['article__read-time']}>читать {article.readTime} минут</p>
      </div>
    </article>
  );
}
