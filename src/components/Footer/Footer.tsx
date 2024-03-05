import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
  return (
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
  );
}
