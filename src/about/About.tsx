import { useNavigate } from 'react-router-dom';
import style from './About.module.css';

export default function About() {
  const navigate = useNavigate();
  const taplinkUrl =
    'https://taplink.cc/6.5.buro?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPNTY3MDY3MzQzMzUyNDI3AAGnzaQd0sDWOX7Y89ZzgQuDwQrlGCFA5ELZCphPIsEBm3Z0bs8kRoh-FkS6wn0_aem_BqkEPEOsDKqWkP3YmL7qfQ';
  return (
    <div className={style.wrapper}>
      <button
        type='button'
        className={style.backButton}
        onClick={() => navigate('/')}
        aria-label='Back'
      >
        <img
          className={style.backIcon}
          src='/help/back.svg'
          alt=''
          draggable={false}
        />
      </button>

      <div className={style.blocks}>
        <picture>
          <source media='(max-width: 500px)' srcSet='/about/b1m.svg' />
          <source media='(max-width: 1000px)' srcSet='/about/block1tab.svg' />
          <img
            className={style.block1}
            src='/about/desktopLogoBlock.svg'
            alt='About block 1'
            draggable={false}
          />
        </picture>

        <picture>
          <source media='(max-width: 500px)' srcSet='/about/b2m.svg' />
          <source media='(max-width: 1000px)' srcSet='/about/block2tab.svg' />
          <img
            className={style.block2}
            src='/about/block2Desk.svg'
            alt='About block 2'
            draggable={false}
          />
        </picture>

        <picture>
          <source media='(max-width: 500px)' srcSet='/about/b3m.svg' />
          <source media='(max-width: 1000px)' srcSet='/about/block3tab.svg' />
          <a
            className={style.block3Link}
            href={taplinkUrl}
            target='_blank'
            rel='noreferrer'
          >
            <img
              className={style.block3}
              src='/about/block3Desk.svg'
              alt='About block 3'
              draggable={false}
            />
          </a>
        </picture>
      </div>
    </div>
  );
}
