'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useAuthStore } from '@/store/auth';
import { signinService } from '@/api/auth/signin';
import type { FormData } from '@/api/auth/signin';

import Link from 'next/link';
import GoogleIcon from '@/assets/icons/google.svg';
import { Footer } from '@/components/Footer';
import styles from './page.module.scss';
import { AxiosError, AxiosResponse } from 'axios';

export default function Signin() {
  const router = useRouter();

  const { updateAuth, updateToken } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const signin = useMutation({
    mutationKey: ['signin'],
    mutationFn: signinService,
  });

  const handleSignin = async (formData: FormData) => {
    console.log(signin.error);

    try {
      const response = await signin.mutateAsync(formData);

      if (response.status === 200) {
        const token = {
          access: response.data.token,
          liveTime: response.data.expires,
        };

        updateToken(token);
        updateAuth(true, response.data.userType);

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
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />

            {errors.email?.type === 'required' && (
              <p className={styles['field__error-message']}>Вы не ввели адрес электронной почты!</p>
            )}

            {errors.email?.type === 'pattern' && (
              <p className={styles['field__error-message']}>
                Вы ввели неправильный адрес электронной почты!
              </p>
            )}
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Пароль</p>

            <input
              type={'password'}
              placeholder='Введите ваш пароль'
              className={styles['field__input']}
              {...register('password', {
                required: true,
              })}
            />

            {errors.password?.type === 'required' && (
              <p className={styles['field__error-message']}>Вы ввели неправильный пароль!</p>
            )}
          </div>

          {(signin.error as any) &&
            (signin.error as any).response.data.message === 'Incorrect email or password' && (
              <p className={styles['form__error-message']}>
                Неверный адрес электронной почты или пароль
              </p>
            )}

          <button disabled={signin.isLoading} className={styles['form__submit']}>
            Продолжить
          </button>

          {/* <p className={styles['form__description']}>Или продолжить с помощью</p>

          <button className={styles['form__button-google']}>
            <GoogleIcon />
            <span>Google</span>
          </button> */}
        </form>
      </div>

      <Footer />
    </div>
  );
}
