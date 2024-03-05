import Link from 'next/link';
import GoogleIcon from '@/assets/icons/google.svg';
import styles from './page.module.scss';
import { Footer } from '@/components/Footer';

export default function Signup() {
  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['hero-section']}>
        <form className={styles['form']}>
          <div className={styles['form__title']}>Создать учетную запись</div>

          <div className={styles['form__subtitle']}>
            <span>У вас уже есть учетная запись?</span>
            <Link href={'/'}>Войти</Link>
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Имя</p>

            <input
              type={'text'}
              placeholder='Введите ваше имя'
              className={styles['field__input']}
            />
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Адрес электронной почты</p>

            <input
              type={'text'}
              placeholder='Введите ваш адрес электронной почты'
              className={styles['field__input']}
            />
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Пароль</p>

            <input
              type={'password'}
              placeholder='Введите ваш пароль'
              className={styles['field__input']}
            />
          </div>

          <button className={styles['form__submit']}>Создать учетную запись</button>

          <p className={styles['form__description']}>Или продолжить с помощью</p>

          <button className={styles['form__button-google']}>
            <GoogleIcon />
            <span>Google</span>
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
