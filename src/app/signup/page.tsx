'use client';
import { useForm } from 'react-hook-form';
import type { FormData } from '@/services/auth/signup';

import Link from 'next/link';
import { Footer } from '@/components/Footer';
import GoogleIcon from '@/assets/icons/google.svg';
import styles from './page.module.scss';
import { useMutation } from 'react-query';
import { signupService } from '@/services/auth/signup';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>();

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
              className={styles['field__input']}
              {...register('username', { required: true })}
            />
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Адрес электронной почты</p>

            <input
              type={'email'}
              placeholder='Введите ваш адрес электронной почты'
              className={styles['field__input']}
              {...register('email', { required: true })}
            />
          </div>

          <div className={styles['field']}>
            <p className={styles['field__label']}>Пароль</p>

            <input
              type={'password'}
              placeholder='Введите ваш пароль'
              className={styles['field__input']}
              {...register('password', { required: true })}
            />
          </div>

          <button disabled={signup.isLoading} className={styles['form__submit']}>
            Создать учетную запись
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
