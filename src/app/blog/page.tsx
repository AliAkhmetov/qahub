import Link from 'next/link';
import styles from './page.module.scss';
import Image from 'next/image';

import TimeMachineImage from '@/assets/images/articles/time-machine.png';
import { Footer } from '@/components/Footer';

export default function Blog() {
  return (
    <div>
      <header className={styles['header']}>
        <div className={styles['header__logo']}>
          <Link className={styles['header__logo-link']} href='/'>
            QAhub
          </Link>
        </div>

        <nav className={styles['header__right']}>
          <div className={styles['header__lang']}>
            <Link href='#kaz' className={styles['header__lang-link']}>
              қаз
            </Link>
            <Link href='#rus' className={[styles['header__lang-link'], styles['active']].join(' ')}>
              рус
            </Link>
            <Link href='#eng' className={styles['header__lang-link']}>
              eng
            </Link>
          </div>

          <div className={styles['header__divider']}></div>

          <div className={styles['header__nav']}>
            <Link href='/blog' className={styles['header__nav-link']}>
              Блог
            </Link>

            <Link href='/community' className={styles['header__nav-link']}>
              Комьюнити
            </Link>

            <Link href='/login' className={styles['header__nav-link']}>
              Логин
            </Link>

            <Link href='#dark' className={styles['header__nav-link']}>
              <svg viewBox='0 0 21.5137 21.5107'>
                <path
                  d='M21.4707 13.0135C21.416 12.8317 21.3008 12.6729 21.1484 12.5606C20.9941 12.4484 20.8086 12.3885 20.6191 12.39L20.377 12.4338C18.8105 12.8662 17.1582 12.8753 15.5859 12.4602C14.0156 12.0451 12.582 11.2206 11.4336 10.0708C10.2852 8.92108 9.46094 7.48724 9.04883 5.91556C8.63477 4.34387 8.64453 2.69058 9.08008 1.12439C9.10156 1.06097 9.11133 0.994476 9.11133 0.927521C9.12305 0.786377 9.09766 0.644836 9.04102 0.51532C8.98438 0.385834 8.89648 0.272369 8.78516 0.184875C8.67383 0.0973816 8.54297 0.0385437 8.40234 0.0135803C8.26367 -0.0114136 8.12109 -0.00180054 7.98633 0.0415955C6.14648 0.556976 4.47461 1.54483 3.13672 2.90689C1.79883 4.26895 0.839844 5.9577 0.355469 7.80521C-0.126953 9.65271 -0.119141 11.5945 0.380859 13.4376C0.880859 15.2806 1.85547 16.9605 3.20703 18.3103C4.55664 19.6601 6.23828 20.6327 8.08203 21.1313C9.92578 21.6299 11.8672 21.6372 13.7148 21.1524C15.5605 20.6676 17.25 19.7077 18.6094 18.368C19.9707 17.0284 20.957 15.3558 21.4707 13.5166C21.5273 13.3534 21.5273 13.1767 21.4707 13.0135ZM10.9395 19.7619C8.84375 19.7636 6.81055 19.0488 5.17578 17.7361C3.54297 16.4234 2.40625 14.5918 1.95703 12.5449C1.50781 10.4981 1.77148 8.3591 2.70508 6.48276C3.63867 4.60645 5.18555 3.10556 7.08789 2.2291C6.88281 3.87979 7.05664 5.55573 7.5957 7.12915C8.13672 8.70255 9.0293 10.1319 10.2051 11.3082C11.3809 12.4844 12.8105 13.3766 14.3848 13.9167C15.957 14.4567 17.6328 14.6304 19.2832 14.4244C18.5449 16.0151 17.3652 17.3621 15.8887 18.3074C14.4102 19.2527 12.6934 19.7572 10.9395 19.7619Z'
                  fill='currentColor'
                />
              </svg>
            </Link>
          </div>
        </nav>
      </header>

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
          {[1, 2, 3, 4, 5, 6].map((index) => (
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
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
