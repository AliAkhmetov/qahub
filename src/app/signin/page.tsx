'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { signinService } from '@/services/auth/signin';
import type { FormData } from '@/services/auth/signin';

import { Footer } from '@/components/Footer';
import Link from 'next/link';
import GoogleIcon from '@/assets/icons/google.svg';
import styles from './page.module.scss';
import { useAuthStore } from '@/store/auth';

export default function Signin() {
  const router = useRouter();

  const { updateAuth, updateToken } = useAuthStore();
  const { register, handleSubmit } = useForm<FormData>();
  const signin = useMutation({
    mutationKey: ['signin'],
    mutationFn: signinService,
  });

  const handleSignin = async (formData: FormData) => {
    try {
      const response = await signin.mutateAsync(formData);

      if (response.status === 200) {
        const token = {
          access: response.data.token,
          liveTime: response.data.expires,
        };

        updateToken(token);
        updateAuth(true);

        return router.push('/blog');
      }
    } catch {}
  };

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['hero-section']}>
        <form onSubmit={handleSubmit(handleSignin)} className={styles['form']}>
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
              {...register('email')}
            />
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Пароль</p>

            <input
              type={'password'}
              placeholder='Введите ваш пароль'
              className={styles['field__input']}
              {...register('password')}
            />
          </div>

          <button disabled={signin.isLoading} className={styles['form__submit']}>
            Продолжить
          </button>

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
