'use client';

import cn from 'classnames';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import MoonIcon from '@/assets/icons/moon.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import styles from './Header.module.scss';
import { useAuthStore } from '@/store/auth';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/store/settings';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const { t } = useTranslation();
  const { isAuth, userType, updateAuth, updateToken } = useAuthStore();
  const { language, theme, updateLanguage, updateTheme } = useSettingsStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    updateAuth(false);
    updateToken({
      access: '',
      liveTime: '',
    });
  };

  const handleChangeTheme = () => {
    if (theme === 'light') {
      updateTheme('dark');
      return document.documentElement.setAttribute('data-theme', 'dark');
    }

    updateTheme('light');
    return document.documentElement.setAttribute('data-theme', 'light');
  };

  return (
    <header className={styles['header']}>
      <div className={styles['header__logo']}>
        <Link className={styles['header__logo-link']} href='/'>
          QAhub
        </Link>
      </div>

      <nav className={styles['header__right']}>
        {!pathname.includes('/blog/') && (
          <>
            <div className={styles['header__lang']}>
              <button
                onClick={() => updateLanguage('kz')}
                className={cn(styles['header__lang-link'], language === 'kz' && styles['active'])}
              >
                қаз
              </button>
              <button
                onClick={() => updateLanguage('ru')}
                className={cn(styles['header__lang-link'], language === 'ru' && styles['active'])}
              >
                рус
              </button>
              <button
                onClick={() => updateLanguage('en')}
                className={cn(styles['header__lang-link'], language === 'en' && styles['active'])}
              >
                eng
              </button>
            </div>
            <div className={styles['header__divider']}></div>
          </>
        )}

        <div className={cn(styles['header__nav'], isMenuOpen && styles['active'])}>
          <Link href='/blog' className={styles['header__nav-link']}>
            {t('header.nav.blog')}
          </Link>

          <Link
            href='https://t.me/+zbrPcT8kLSZkMjA6'
            target='_blank'
            className={styles['header__nav-link']}
          >
            {t('header.nav.community')}
          </Link>

          {isAuth ? (
            userType === 'admin' ? (
              <>
                <Link href='/blog/create' className={styles['header__nav-button']}>
                  <PlusIcon />

                  <span>{t('header.nav.add-article')}</span>
                </Link>

                <button
                  type='button'
                  onClick={() => handleLogout()}
                  className={styles['header__nav-link']}
                >
                  {t('header.nav.logout')}
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={() => handleLogout()}
                className={styles['header__nav-link']}
              >
                {t('header.nav.logout')}
              </button>
            )
          ) : (
            <Link href='/signin' className={styles['header__nav-link']}>
              {t('header.nav.login')}
            </Link>
          )}

          <button onClick={handleChangeTheme} className={styles['header__nav-theme']}>
            <MoonIcon />
          </button>
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
                fill='currentColor'
                fillOpacity='1.000000'
              />
              <rect
                x='1.414062'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                transform='rotate(45 1.414062 0.000000)'
                fill='currentColor'
                fillOpacity='1.000000'
              />
            </svg>
          ) : (
            <svg width='26.000000' height='14.000000' viewBox='0 0 26 14' fill='none'>
              <rect
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                fill='currentColor'
                fillOpacity='1.000000'
              />
              <rect
                y='6.000000'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                fill='currentColor'
                fillOpacity='1.000000'
              />
              <rect
                y='12.000000'
                rx='1.000000'
                width='24.000000'
                height='2.000000'
                fill='currentColor'
                fillOpacity='1.000000'
              />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
