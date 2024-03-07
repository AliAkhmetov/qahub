'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer';
import TimeMachineImage from '@/assets/images/articles/time-machine.png';
import styles from './page.module.scss';
import { useQuery } from 'react-query';
import { getPostsService } from '@/services/posts/posts';

export default function Blog() {
  const { isLoading, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsService,
  });

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
          {isLoading ? (
            <p>Loading</p>
          ) : (
            [1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className={styles['article']}>
                <div className={styles['article__image']}>
                  <Image src={TimeMachineImage} alt='' />
                </div>

                <Link href={'#'} className={styles['article__title']}>
                  <span>Как писать тест-кейсы</span>

                  <svg viewBox='0 0 30 24' fill='none'>
                    <path
                      d='M19.7139 4L26 12'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='2.000000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      d='M4 12L26 12'
                      stroke='#33333F'
                      strokeOpacity='1.000000'
                      strokeWidth='2.000000'
                      strokeLinejoin='round'
                      strokeLinecap='round'
                    />
                    <path
                      d='M19.7139 20L26 12'
                      stroke='#33333F'
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
                        fill='#33333F'
                        fillOpacity='1.000000'
                        fillRule='evenodd'
                      />
                    </svg>

                    <span>32</span>
                  </div>

                  <p className={styles['article__date']}>19/01/2024</p>

                  <p className={styles['article__read-time']}>читать 6 минут</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
