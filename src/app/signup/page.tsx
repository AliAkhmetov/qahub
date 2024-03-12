'use client';

import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { signupService } from '@/api/auth/signup';
import type { FormData } from '@/api/auth/signup';

import Link from 'next/link';
import GoogleIcon from '@/assets/icons/google.svg';
import { Footer } from '@/components/Footer';
import styles from './page.module.scss';

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  const signup = useMutation({
    mutationKey: ['signup'],
    mutationFn: signupService,
  });

  const handleSignup = async (formData: FormData) => {
    const response = await signup.mutateAsync(formData);

    if (response.status === 200) {
      return router.push('/signin');
    }
  };

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['hero-section']}>
        <form onSubmit={handleSubmit(handleSignup)} className={styles['form']}>
          <div className={styles['form__title']}>Создать учетную запись</div>

          <div className={styles['form__subtitle']}>
            <span>У вас уже есть учетная запись?</span>
            <Link href={'/signin'} prefetch>
              Войти
            </Link>
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Имя</p>

            <input
              type={'text'}
              placeholder='Введите ваше имя'
              className={cn(styles['field__input'], errors.username?.type && styles['error'])}
              {...register('username', { required: true, pattern: /^[A-Za-z]*$/ })}
            />

            {errors.username?.type === 'required' && (
              <p className={styles['field__error-message']}>Вы не ввели ваше имя!</p>
            )}

            {errors.username?.type === 'pattern' && (
              <p className={styles['field__error-message']}>Вы ввели неправильное имя!</p>
            )}
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Адрес электронной почты</p>

            <input
              type={'email'}
              placeholder='Введите ваш адрес электронной почты'
              className={cn(styles['field__input'], errors.email?.type && styles['error'])}
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
              className={cn(styles['field__input'], errors.password?.type && styles['error'])}
              {...register('password', { required: true })}
            />

            {errors.password?.type === 'required' && (
              <p className={styles['field__error-message']}>Вы ввели неправильный пароль!</p>
            )}
          </div>

          <button disabled={signup.isLoading} className={styles['form__submit']}>
            Создать учетную запись
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
