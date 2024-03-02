import Link from 'next/link';
import styles from './page.module.scss';
import Image from 'next/image';

import TimeMachineImage from '@/assets/images/articles/time-machine.png';

export default function Home() {
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

      <footer className={styles['footer']}>
        <div className={styles['footer-social']}>
          <Link
            href={'https://www.linkedin.com/in/ali-akhmetov/'}
            target='_blank'
            className={styles['footer-social__link']}
          >
            <svg viewBox='0 0 20 20' fill='none'>
              <path
                d='M17.041 17.0413L14.0781 17.0413L14.0781 12.4004C14.0781 11.2937 14.0586 9.86914 12.5371 9.86914C10.9922 9.86914 10.7559 11.075 10.7559 12.3198L10.7559 17.0409L7.79297 17.0409L7.79297 7.49744L10.6387 7.49744L10.6387 8.80164L10.6777 8.80164C10.9629 8.31494 11.375 7.91443 11.8691 7.64294C12.3633 7.37146 12.9219 7.23914 13.4844 7.26001C16.4883 7.26001 17.043 9.23572 17.043 11.8058L17.041 17.0413ZM4.44922 6.19299C3.5 6.19312 2.73047 5.42334 2.73047 4.47351C2.73047 3.5238 3.5 2.75366 4.44922 2.75354C5.39844 2.7533 6.16797 3.52319 6.16992 4.4729C6.16992 4.92908 5.98828 5.36646 5.66602 5.68909C5.34375 6.0116 4.90625 6.19287 4.44922 6.19299ZM5.93164 17.0413L2.96484 17.0413L2.96484 7.49744L5.93164 7.49744L5.93164 17.0413L5.93164 17.0413ZM18.5176 0.00146484L1.47656 0.00146484C0.669922 -0.00756836 0.00976562 0.637573 0 1.44312L0 18.5566C0.00976562 19.3624 0.669922 20.0083 1.47656 19.9999L18.5176 19.9999C19.3262 20.0099 19.9883 19.364 20 18.5566L20 1.44177C19.9883 0.634766 19.3262 -0.010376 18.5176 0.00012207L18.5176 0.00146484Z'
                fill='#33333F'
                fillOpacity='1.000000'
                fillRule='nonzero'
              />
            </svg>

            <span>Linkedin</span>
          </Link>

          <Link
            href={'https://t.me/+zbrPcT8kLSZkMjA6'}
            target='_blank'
            className={styles['footer-social__link']}
          >
            <svg viewBox='0 0 18.4004 18.4' fill='none'>
              <path
                d='M9.19922 0C14.2812 0 18.4004 4.11877 18.4004 9.19995C18.4004 14.2812 14.2812 18.4 9.19922 18.4C4.11914 18.4 0 14.2812 0 9.19995C0 4.11877 4.11914 0 9.19922 0ZM12.373 12.95C12.543 12.4308 13.3359 7.25635 13.4336 6.23682C13.4629 5.92798 13.3652 5.72278 13.1738 5.63123C12.9434 5.52002 12.6016 5.57556 12.2031 5.71875C11.6582 5.91516 4.69336 8.87244 4.29102 9.04358C3.91016 9.20557 3.54883 9.38245 3.54883 9.63843C3.54883 9.81836 3.65625 9.91956 3.95117 10.0248C4.25586 10.134 5.0293 10.368 5.48438 10.4937C5.92188 10.6147 6.42188 10.5096 6.70312 10.3356C7 10.1512 10.4238 7.85925 10.6699 7.65845C10.916 7.45764 11.1113 7.71484 10.9121 7.91602C10.7109 8.11682 8.35938 10.3988 8.04883 10.7148C7.67188 11.0984 7.93945 11.496 8.19336 11.6552C8.48047 11.8368 10.5547 13.228 10.8672 13.4512C11.1797 13.6744 11.4961 13.7756 11.7871 13.7756C12.0762 13.7756 12.2285 13.3936 12.373 12.95Z'
                fill='#33333F'
                fillOpacity='1.000000'
                fillRule='nonzero'
              />
            </svg>

            <span>Telegram</span>
          </Link>

          <Link
            href={'https://github.com/AliAkhmetov'}
            target='_blank'
            className={styles['footer-social__link']}
          >
            <svg viewBox='0 0 20 19.5063' fill='none'>
              <path
                d='M10 0C4.47852 0 0 4.47705 0 10.0001C0 14.4183 2.86523 18.1669 6.83789 19.4891C7.33789 19.5817 7.52148 19.2722 7.52148 19.0081C7.52148 18.7697 7.51172 17.9819 7.50781 17.1464C4.72656 17.7512 4.13867 15.9664 4.13867 15.9664C3.68359 14.8105 3.0293 14.5032 3.0293 14.5032C2.12109 13.8824 3.09766 13.8953 3.09766 13.8953C4.10156 13.9658 4.63086 14.9258 4.63086 14.9258C5.52148 16.4546 6.96875 16.0126 7.54102 15.7571C7.63086 15.1108 7.88867 14.6696 8.17578 14.4198C5.95312 14.167 3.61914 13.3096 3.61914 9.47778C3.61914 8.38599 4.00977 7.4939 4.65039 6.79358C4.54492 6.54175 4.20312 5.52466 4.74609 4.14722C4.74609 4.14722 5.58594 3.87842 7.49805 5.17224C8.29492 4.95068 9.15039 4.8396 10 4.83582C10.8496 4.8396 11.707 4.95068 12.5059 5.17224C14.4141 3.87854 15.252 4.14722 15.252 4.14722C15.7969 5.52466 15.4551 6.54175 15.3496 6.79358C15.9922 7.4939 16.3789 8.38599 16.3789 9.47778C16.3789 13.3187 14.041 14.1644 11.8145 14.412C12.1719 14.7223 12.4922 15.3308 12.4922 16.2638C12.4922 17.6018 12.4805 18.6787 12.4805 19.0081C12.4805 19.2742 12.6602 19.5861 13.168 19.4878C17.1387 18.1641 20 14.417 20 10.0001C20 4.47705 15.5234 0 10 0ZM3.74609 14.2454C3.72266 14.295 3.64453 14.3099 3.57422 14.2758C3.50195 14.2432 3.46094 14.1754 3.48438 14.1256C3.50586 14.0745 3.58398 14.0602 3.65625 14.0945C3.72852 14.1271 3.76953 14.1954 3.74609 14.2454ZM4.23633 14.6842C4.18945 14.7284 4.0957 14.7079 4.0332 14.6381C3.9668 14.5684 3.95508 14.4751 4.00391 14.4302C4.05273 14.386 4.14258 14.4067 4.20898 14.4764C4.27344 14.547 4.28711 14.6395 4.23633 14.6842ZM4.57422 15.2457C4.51367 15.2883 4.41406 15.2484 4.35156 15.1595C4.29102 15.0707 4.29102 14.964 4.35352 14.9213C4.41406 14.8785 4.51367 14.917 4.57617 15.0052C4.63672 15.0956 4.63672 15.2023 4.57422 15.2458L4.57422 15.2457ZM5.14453 15.8961C5.08984 15.9567 4.97461 15.9404 4.88867 15.8579C4.80078 15.7772 4.77734 15.6628 4.83203 15.6024C4.88672 15.5417 5.00391 15.5588 5.08984 15.6407C5.17773 15.7212 5.20312 15.8364 5.14453 15.8961ZM5.88281 16.1157C5.85938 16.1941 5.74609 16.2297 5.63281 16.1964C5.51953 16.1621 5.44531 16.0704 5.46875 15.9912C5.49219 15.9124 5.60547 15.8754 5.71875 15.9109C5.83203 15.9449 5.90625 16.036 5.88281 16.1157ZM6.72266 16.2089C6.72461 16.2914 6.62891 16.3597 6.50977 16.3612C6.39062 16.3639 6.29492 16.2972 6.29297 16.2159C6.29297 16.1327 6.38672 16.0649 6.50586 16.063C6.625 16.0607 6.72266 16.1268 6.72266 16.2089ZM7.54688 16.1772C7.56055 16.2577 7.47852 16.3403 7.36133 16.3624C7.24414 16.3835 7.13672 16.3339 7.12305 16.2542C7.10742 16.1716 7.19141 16.089 7.30859 16.0676C7.42578 16.0471 7.53125 16.0955 7.54688 16.1772Z'
                fill='#33333F'
                fillOpacity='1.000000'
                fillRule='nonzero'
              />
            </svg>

            <span>GitHub</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
