'use client';

import cn from 'classnames';
import { useState } from 'react';

import Link from 'next/link';
import styles from './Header.module.scss';
import { useAuthStore } from '@/store/auth';

export default function Header() {
  const { isAuth } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
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

        <div className={cn(styles['header__nav'], isMenuOpen && styles['active'])}>
          <Link href='/blog' className={styles['header__nav-link']}>
            Блог
          </Link>

          <Link href='/community' className={styles['header__nav-link']}>
            Комьюнити
          </Link>

          {isAuth ? (
            <Link href='/blog/create' className={styles['header__nav-button']}>
              <svg width='24.000000' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M12 5L12 19'
                  stroke='#FFFFFF'
                  strokeOpacity='1.000000'
                  strokeWidth='1.500000'
                  strokeLinejoin='round'
                  strokeLinecap='round'
                />
                <path
                  d='M5 12L19 12'
                  stroke='#FFFFFF'
                  strokeOpacity='1.000000'
                  strokeWidth='1.500000'
                  strokeLinejoin='round'
                  strokeLinecap='round'
                />
              </svg>

              <span>Добавить статью</span>
            </Link>
          ) : (
            <Link href='/signin' className={styles['header__nav-link']}>
              Логин
            </Link>
          )}

          <Link href='#dark' className={styles['header__nav-theme']}>
            <svg viewBox='0 0 21.5137 21.5107'>
              <path
                d='M21.4707 13.0135C21.416 12.8317 21.3008 12.6729 21.1484 12.5606C20.9941 12.4484 20.8086 12.3885 20.6191 12.39L20.377 12.4338C18.8105 12.8662 17.1582 12.8753 15.5859 12.4602C14.0156 12.0451 12.582 11.2206 11.4336 10.0708C10.2852 8.92108 9.46094 7.48724 9.04883 5.91556C8.63477 4.34387 8.64453 2.69058 9.08008 1.12439C9.10156 1.06097 9.11133 0.994476 9.11133 0.927521C9.12305 0.786377 9.09766 0.644836 9.04102 0.51532C8.98438 0.385834 8.89648 0.272369 8.78516 0.184875C8.67383 0.0973816 8.54297 0.0385437 8.40234 0.0135803C8.26367 -0.0114136 8.12109 -0.00180054 7.98633 0.0415955C6.14648 0.556976 4.47461 1.54483 3.13672 2.90689C1.79883 4.26895 0.839844 5.9577 0.355469 7.80521C-0.126953 9.65271 -0.119141 11.5945 0.380859 13.4376C0.880859 15.2806 1.85547 16.9605 3.20703 18.3103C4.55664 19.6601 6.23828 20.6327 8.08203 21.1313C9.92578 21.6299 11.8672 21.6372 13.7148 21.1524C15.5605 20.6676 17.25 19.7077 18.6094 18.368C19.9707 17.0284 20.957 15.3558 21.4707 13.5166C21.5273 13.3534 21.5273 13.1767 21.4707 13.0135ZM10.9395 19.7619C8.84375 19.7636 6.81055 19.0488 5.17578 17.7361C3.54297 16.4234 2.40625 14.5918 1.95703 12.5449C1.50781 10.4981 1.77148 8.3591 2.70508 6.48276C3.63867 4.60645 5.18555 3.10556 7.08789 2.2291C6.88281 3.87979 7.05664 5.55573 7.5957 7.12915C8.13672 8.70255 9.0293 10.1319 10.2051 11.3082C11.3809 12.4844 12.8105 13.3766 14.3848 13.9167C15.957 14.4567 17.6328 14.6304 19.2832 14.4244C18.5449 16.0151 17.3652 17.3621 15.8887 18.3074C14.4102 19.2527 12.6934 19.7572 10.9395 19.7619Z'
                fill='currentColor'
              />
            </svg>
          </Link>
        </div>

        <button onClick={handleToggleMenu} type='button' className={styles['header__menu-button']}>
          {isMenuOpen ? (
            <svg width='18.577148' height='18.577209' viewBox='0 0 18.5771 18.5772' fill='none'>
              <rect
                x='0.192383'
                y='17.162994'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                transform='rotate(-45 0.192383 17.162994)'
                fill='#33333F'
                fillOpacity='1.000000'
              />
              <rect
                x='1.414062'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                transform='rotate(45 1.414062 0.000000)'
                fill='#33333F'
                fillOpacity='1.000000'
              />
            </svg>
          ) : (
            <svg width='26.000000' height='14.000000' viewBox='0 0 26 14' fill='none'>
              <rect
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                fill='#33333F'
                fillOpacity='1.000000'
              />
              <rect
                y='6.000000'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                fill='#33333F'
                fillOpacity='1.000000'
              />
              <rect
                y='12.000000'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                fill='#33333F'
                fillOpacity='1.000000'
              />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
