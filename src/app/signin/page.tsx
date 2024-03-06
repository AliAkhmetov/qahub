import { Footer } from '@/components/Footer';
import Link from 'next/link';
import GoogleIcon from '@/assets/icons/google.svg';
import styles from './page.module.scss';

export default function Signin() {
  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['hero-section']}>
        <form className={styles['form']}>
          <div className={styles['form__title']}>Войти</div>

          <div className={styles['form__subtitle']}>
            <span>Новый пользователь?</span>
            <Link href={'/signup'}>Создать учетную запись</Link>
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Адрес электронной почты</p>

            <input
              type={'text'}
              placeholder='Введите ваш адрес электронной почты'
              className={styles['field__input']}
            />
          </div>

          {/* <div className={styles['field']}>
            <p className={styles['field__label']}>Пароль</p>

            <input
              type={'password'}
              placeholder='Введите ваш пароль'
              className={styles['field__input']}
            />
          </div> */}

          <button className={styles['form__submit']}>Продолжить</button>

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
