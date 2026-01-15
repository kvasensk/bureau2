import type { MouseEvent, SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Main.module.css';

const getSrc = (item: string, state: 'blank' | 'fill') =>
  `items/${item}/${state}.svg`;

const updateImageSize = (img: HTMLImageElement) => {
  const { naturalWidth, naturalHeight } = img;
  if (!naturalWidth || !naturalHeight) return;

  if (window.innerWidth <= 1200 && window.innerWidth >= 501) {
    const widthVw = (naturalWidth / 1920) * 180;
    img.style.width = `${widthVw}vw`;
    img.style.height = 'auto';
  } else if (window.innerWidth <= 500) {
    const widthVw = (naturalWidth / 1920) * 240;
    img.style.width = `${widthVw}vw`;
    img.style.height = 'auto';
  } else {
    const widthVw = (naturalWidth / 1920) * 100;
    img.style.width = `${widthVw}vw`;
    img.style.height = 'auto';
  }

  img.style.objectFit = 'contain';
};

const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (img.dataset.sizeLocked === 'true') return;
  updateImageSize(img);
  img.dataset.sizeLocked = 'true';
};

const handleMouseEnter = (event: MouseEvent<HTMLImageElement>) => {
  const item = event.currentTarget.dataset.item;
  if (item) {
    event.currentTarget.src = getSrc(item, 'fill');
  }
};

const handleMouseLeave = (event: MouseEvent<HTMLImageElement>) => {
  const item = event.currentTarget.dataset.item;
  if (item) {
    event.currentTarget.src = getSrc(item, 'blank');
  }
};

const renderImg = (item: string) => (
  <img
    data-item={item}
    src={getSrc(item, 'blank')}
    alt=''
    onLoad={handleImageLoad}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  />
);

const getItemIdFromKey = (item: string) => item.replace(/^item_/, '');

const renderLinkedImg = (item: string) => (
  <Link to={`/item/${getItemIdFromKey(item)}`} className={style.itemLink}>
    {renderImg(item)}
  </Link>
);

export default function Main() {
  useEffect(() => {
    const handleResize = () => {
      const images = document.querySelectorAll<HTMLImageElement>(
        `.${style.items} img`
      );
      images.forEach(img => {
        if (img.complete && img.dataset.sizeLocked === 'true') {
          updateImageSize(img);
        }
      });
    };

    let resizeTimer: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <Link to='/about' className={style.titleRow}>
        <img className={style.logo} src='items/infra/logo.svg' alt='6|5 logo' />
        <div className={style.title}>design buro</div>
      </Link>
      <div className={`${style.items} ${style.itemsDesktop}`}>
        <div className={style.firstLine}>
          <div className={style.object1}>
            {renderLinkedImg('item_1')}
          </div>
          <div className={style.object2}>{renderLinkedImg('item_7')}</div>
          <div className={style.object3}>{renderLinkedImg('item_11')}</div>
          <div className={style.object4}>{renderLinkedImg('item_17')}</div>
        </div>
        <div className={style.firstHalfLine}>
          <div className={style.object5}>{renderLinkedImg('item_2')}</div>
          <div className={style.object6}>{renderLinkedImg('item_8')}</div>
          <div className={style.object7}>{renderLinkedImg('item_12')}</div>
          <div className={style.object8}>{renderLinkedImg('item_18')}</div>
        </div>
        <div className={style.secondLine}>
          <div className={style.object9}>{renderLinkedImg('item_3')}</div>
          <div className={style.object10}>{renderLinkedImg('item_9')}</div>
          <div className={style.object11}>{renderLinkedImg('item_13')}</div>
          <div className={style.object12}>{renderLinkedImg('item_19')}</div>
        </div>
        <div className={style.secondHalfLine}>
          <div className={style.object13}>{renderLinkedImg('item_4')}</div>
          <div className={style.object14}>{renderLinkedImg('item_10')}</div>
          <div className={style.object15}>{renderLinkedImg('item_14')}</div>
          <div className={style.object16}>{renderLinkedImg('item_20')}</div>
        </div>
        <div className={style.thirdLine}>
          <div className={style.object17}>{renderLinkedImg('item_5')}</div>
          <div className={style.object18}>{renderLinkedImg('item_15')}</div>
        </div>
        <div className={style.thirdHalfLine}>
          <div className={style.object19}>{renderLinkedImg('item_6')}</div>
          <div className={style.object20}>{renderLinkedImg('item_16')}</div>
        </div>
      </div>
      <div className={style.itemsMobile}>
        <div className={style.columnMobile}>
          <div className={style.object9}>{renderLinkedImg('item_3')}</div>
          <div className={style.object1}>
            {renderLinkedImg('item_1')}
          </div>
          <div className={style.object2}>{renderLinkedImg('item_7')}</div>
          <div className={style.object10}>{renderLinkedImg('item_9')}</div>
          <div className={style.object11}>{renderLinkedImg('item_13')}</div>
          <div className={style.object12}>{renderLinkedImg('item_19')}</div>
          <div className={style.object3}>{renderLinkedImg('item_11')}</div>
          <div className={style.object4}>{renderLinkedImg('item_17')}</div>
        </div>
        <div className={style.columnMobile}>
          <div className={style.object13}>{renderLinkedImg('item_4')}</div>
          <div className={style.object5}>{renderLinkedImg('item_2')}</div>
          <div className={style.object6}>{renderLinkedImg('item_8')}</div>
          <div className={style.object14}>{renderLinkedImg('item_10')}</div>
          <div className={style.object15}>{renderLinkedImg('item_14')}</div>
          <div className={style.object16}>{renderLinkedImg('item_20')}</div>
          <div className={style.object7}>{renderLinkedImg('item_12')}</div>
          <div className={style.object8}>{renderLinkedImg('item_18')}</div>
        </div>
        <div className={style.columnMobile}>
          <div className={style.object17}>{renderLinkedImg('item_5')}</div>
          <div className={style.object19}>{renderLinkedImg('item_6')}</div>
          <div className={style.object18}>{renderLinkedImg('item_15')}</div>
          <div className={style.object20}>{renderLinkedImg('item_16')}</div>
        </div>
      </div>
      <div className={style.controls}>
        <Link to='/modular' className={style.controlButton}>
          MODULAR
        </Link>

        <Link to='/modular' className={style.controlButton}>
          COLLECTION
        </Link>
      </div>
    </div>
  );
}
