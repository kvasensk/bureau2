import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './Item.module.css';
import { getItemById } from './itemsData';

function ColorBlock({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return <div className={className} style={{ background: color }} />;
}

function Media({
  className,
  src,
  alt,
}: {
  className?: string;
  src: string;
  alt?: string;
}) {
  if (src.trim().startsWith('#')) {
    return <ColorBlock className={className} color={src} />;
  }

  return (
    <img className={className} src={src} alt={alt ?? ''} draggable={false} />
  );
}

export type ItemPageProps = {
  title: string;
  specs: string[];
  conditions: string[];
  price: number;
  gallery: string[];
  compatibility?: string;
  comboTitle?: string;
  compatibilityMobile?: string;
  bigGallery: string[];
  second?: string;
};

export function ItemPage(props: ItemPageProps & { id: string }) {
  const navigate = useNavigate();
  const {
    title,
    specs,
    conditions,
    price,
    gallery,
    compatibility,
    comboTitle,
    compatibilityMobile,
    bigGallery,
    second,
    id,
  } = props;

  const titleIds = useMemo(() => {
    if (!second) return [id];
    const a = Number(id);
    const b = Number(second);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return a <= b ? [id, second] : [second, id];
    }
    return [id, second].sort();
  }, [id, second]);

  const titles = useMemo(() => {
    return titleIds.map(itemId => ({
      id: itemId,
      title: getItemById(itemId).title,
      isActive: itemId === id,
    }));
  }, [id, titleIds]);

  const handlePriceClick = () => {
    const message = `Привет, 6/5 buro! Мне понравился модуль ${title} Расскажите, пожалуйста, о его наличии и стоимости.`;
    const text = encodeURIComponent(message);
    const url = `https://t.me/design_buro_6_5?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCatalogDownload = () => {
    const a = document.createElement('a');
    a.href = '/catalog.pdf';
    a.download = 'catalog.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const [vw, setVw] = useState(() => window.innerWidth);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setVw(w);
      setScale(Math.min(1, w / 1920));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const fontSizeFor = useMemo(() => {
    return (basePx: number, minPx: number) => {
      if (vw > 1200) return `${basePx}px`;
      const s = Math.max(0.0001, scale);
      return `${Math.max(basePx, minPx / s)}px`;
    };
  }, [scale, vw]);

  const mobileTitleBoxStyle = useMemo(() => {
    if (vw > 500) return undefined;
    const s = Math.max(0.0001, scale);
    const style: React.CSSProperties = {
      // width: `${188 / s}px`,
      minHeight: `${51 / s}px`,
    };

    if (titles.length > 1) {
      style.minHeight = '40px';
      style.padding = '20px';
    }

    return style;
  }, [scale, vw, titles.length]);

  const mobileTitleWrapStyle = useMemo(() => {
    if (vw > 500) return undefined;
    const s = Math.max(0.0001, scale);
    return {
      marginTop: `${44 / s}px`,
      marginBottom: `${10 / s}px`,
    } as React.CSSProperties;
  }, [scale, vw]);

  const titleBoxesRowStyle = useMemo(() => {
    if (titles.length <= 1) return undefined;
    const isMobile = vw <= 500;
    if (isMobile) {
      return {
        justifyContent: 'flex-start',
        gap: '124px',
        width: 'fit-content',
      } as React.CSSProperties;
    }
    return {
      justifyContent: 'space-between',
      width: '100%',
    } as React.CSSProperties;
  }, [titles.length, vw]);

  const fontSizeForTight = (basePx: number, minPx: number) => {
    const d = vw <= 1000 ? 4 : 0;
    return fontSizeFor(Math.max(1, basePx - d), Math.max(1, minPx - d));
  };

  const fontSizeFor650 = (basePx: number, minPx: number) => {
    const d = vw <= 650 ? 2 : 0;
    return fontSizeFor(Math.max(1, basePx - d), Math.max(1, minPx - d));
  };

  const tabsFontSize = vw <= 500 ? fontSizeFor(21, 21) : fontSizeFor650(30, 20);
  const listFontSize = vw <= 500 ? fontSizeFor(19, 19) : fontSizeFor650(28, 16);
  const isMobile500 = vw <= 500;
  const combosTitleFontSize = vw <= 500 ? fontSizeFor(22, 22) : '22px';

  const titleBoxFixedStyle = useMemo(() => {
    const s = Math.max(0.0001, scale);
    const minW = 201;
    const minH = 43;
    const baseW = 368;
    const baseH = 119;

    const needsClamp = baseW * s < minW || baseH * s < minH;
    const style: React.CSSProperties = {};

    if (needsClamp) {
      // style.width = `${Math.max(baseW, minW / s)}px`;
      style.minHeight = `${Math.max(baseH, minH / s)}px`;
    }

    if (titles.length > 1) {
      style.flex = '1';
      style.minWidth = '180px';
      style.minHeight = '70px';
      style.padding = '0 16px';
    }

    return Object.keys(style).length > 0 ? style : undefined;
  }, [scale, titles.length]);

  const priceBoxFixedStyle = useMemo(() => {
    const s = Math.max(0.0001, scale);
    const minW = 186;
    const minH = 38;
    const baseH = 72;
    const baseW = 368;

    const needsClamp = baseH * s < minH || baseW * s < minW;
    if (!needsClamp) return undefined;

    return {
      width: `${Math.max(baseW, minW / s)}px`,
      height: `${Math.max(baseH, minH / s)}px`,
    } as React.CSSProperties;
  }, [scale]);

  const [activeTab, setActiveTab] = useState<'specs' | 'conditions'>('specs');
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = gallery.length
    ? gallery
    : ['#E5E7EB', '#DDD6FE', '#FECACA', '#BBF7D0'];

  const isDesktop = vw > 1000;
  const leftArrowSrc = isDesktop
    ? '/item/help/left.svg'
    : '/item/help/leftm.svg';
  const rightArrowSrc = isDesktop
    ? '/item/help/right.svg'
    : '/item/help/rightm.svg';

  const arrowFixedStyle = useMemo(() => {
    if (vw > 1000) return undefined;
    const s = Math.max(0.0001, scale);
    const size = 50; // physical px
    const inset = 10; // physical px
    return {
      btn: {
        width: `${size / s}px`,
        height: `${size / s}px`,
      } as React.CSSProperties,
      img: {
        width: `${size / s}px`,
        height: `${size / s}px`,
      } as React.CSSProperties,
      inset: `${inset / s}px`,
    } as const;
  }, [scale, vw]);

  const thumbsScrollerRef = useRef<HTMLDivElement | null>(null);

  const clampIndex = (idx: number) => {
    const n = images.length;
    return ((idx % n) + n) % n;
  };

  // Минимальное расстояние свайпа для переключения
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveImage(i => clampIndex(i + 1)); // Свайп влево - следующее фото
    }
    if (isRightSwipe) {
      setActiveImage(i => clampIndex(i - 1)); // Свайп вправо - предыдущее фото
    }
  };

  useEffect(() => {
    const el = thumbsScrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault(); // requires passive: false
      el.scrollLeft += delta;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel as EventListener);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
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
      </div>

      <div className={style.stageOuter}>
        <div className={style.stage} style={{ zoom: scale }}>
          <div className={style.topGrid}>
            <div className={style.mobileTitleWrap} style={mobileTitleWrapStyle}>
              <div className={style.titleBoxesRow} style={titleBoxesRowStyle}>
                {titles.map(t => (
                  <button
                    key={`m-title-${t.id}`}
                    type='button'
                    className={`${style.mobileTitleBox} ${
                      style.titleBoxClickable
                    } ${
                      t.isActive
                        ? style.titleBoxSelected
                        : style.titleBoxUnselected
                    }`}
                    style={mobileTitleBoxStyle}
                    onClick={() => navigate(`/item/${t.id}`)}
                    disabled={t.isActive}
                    aria-label='Перейти на связанную карточку'
                  >
                    <div
                      className={style.titleText}
                      style={{
                        fontSize:
                          titles.length > 1
                            ? fontSizeFor(20, 20)
                            : fontSizeFor(25, 25),
                      }}
                    >
                      {t.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={style.gallery}>
              <div className={style.heroWrap}>
                <button
                  type='button'
                  className={`${style.navArrow} ${style.navArrowLeft}`}
                  onClick={() => setActiveImage(i => clampIndex(i - 1))}
                  aria-label='Previous image'
                  style={
                    arrowFixedStyle
                      ? ({
                          ...arrowFixedStyle.btn,
                          left: arrowFixedStyle.inset,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <img
                    className={style.navArrowImg}
                    src={leftArrowSrc}
                    alt=''
                    draggable={false}
                    style={arrowFixedStyle ? arrowFixedStyle.img : undefined}
                  />
                </button>

                <div className={style.hero}>
                  <Media
                    className={style.heroImg}
                    src={images[clampIndex(activeImage)]}
                    alt=''
                  />
                </div>

                <button
                  type='button'
                  className={`${style.navArrow} ${style.navArrowRight}`}
                  onClick={() => setActiveImage(i => clampIndex(i + 1))}
                  aria-label='Next image'
                  style={
                    arrowFixedStyle
                      ? ({
                          ...arrowFixedStyle.btn,
                          right: arrowFixedStyle.inset,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <img
                    className={style.navArrowImg}
                    src={rightArrowSrc}
                    alt=''
                    draggable={false}
                    style={arrowFixedStyle ? arrowFixedStyle.img : undefined}
                  />
                </button>

                <button
                  type='button'
                  className={style.expandGalleryBtn}
                  onClick={() => setIsGalleryModalOpen(true)}
                  aria-label='Открыть галерею на полный экран'
                >
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      cx='7.5'
                      cy='7.5'
                      r='7'
                      stroke='black'
                      strokeWidth='1'
                      fill='white'
                    />
                    <line
                      x1='7.5'
                      y1='4'
                      x2='7.5'
                      y2='11'
                      stroke='black'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                    <line
                      x1='4'
                      y1='7.5'
                      x2='11'
                      y2='7.5'
                      stroke='black'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </div>

              <div className={style.thumbWrap}>
                <div ref={thumbsScrollerRef} className={style.thumbScroller}>
                  {images.map((c, idx) => (
                    <button
                      key={c + idx}
                      type='button'
                      className={`${style.thumbBtn} ${
                        idx === clampIndex(activeImage)
                          ? style.thumbBtnActive
                          : ''
                      }`}
                      onClick={() => setActiveImage(idx)}
                      aria-label={`Open image ${idx + 1}`}
                    >
                      <Media className={style.thumbImg} src={c} alt='' />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={style.info}>
              <div className={style.titleBoxesRow} style={titleBoxesRowStyle}>
                {titles.map(t => (
                  <button
                    key={`d-title-${t.id}`}
                    type='button'
                    className={`${style.titleBox} ${style.titleBoxDesktop} ${
                      style.titleBoxClickable
                    } ${
                      t.isActive
                        ? style.titleBoxSelected
                        : style.titleBoxUnselected
                    }`}
                    style={titleBoxFixedStyle}
                    onClick={() => navigate(`/item/${t.id}`)}
                    disabled={t.isActive}
                    aria-label='Перейти на связанную карточку'
                  >
                    <div
                      className={style.titleText}
                      style={{
                        fontSize:
                          titles.length > 1
                            ? fontSizeForTight(28, 18)
                            : vw <= 1200 && vw > 500
                              ? fontSizeForTight(45, 18)
                              : fontSizeForTight(50, 28),
                      }}
                    >
                      {t.title}
                    </div>
                  </button>
                ))}
              </div>

              <div className={style.tabs}>
                <button
                  type='button'
                  className={`${style.tab} ${
                    activeTab === 'specs' ? style.tabActive : ''
                  }`}
                  style={{ fontSize: tabsFontSize }}
                  onClick={() => setActiveTab('specs')}
                >
                  Характеристики
                </button>
                <button
                  type='button'
                  className={`${style.tab} ${
                    activeTab === 'conditions' ? style.tabActive : ''
                  }`}
                  style={{ fontSize: tabsFontSize }}
                  onClick={() => setActiveTab('conditions')}
                >
                  Условия
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className={style.list} style={{ fontSize: listFontSize }}>
                  {specs.map((row, idx) => (
                    <div key={row + idx} className={style.line}>
                      {row}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={style.list} style={{ fontSize: listFontSize }}>
                  {conditions.map(t => (
                    <div key={t} className={style.line}>
                      {t}
                    </div>
                  ))}
                </div>
              )}

              <button
                type='button'
                className={style.priceBox}
                style={priceBoxFixedStyle}
                onClick={handlePriceClick}
                aria-label='Открыть Telegram для запроса по модулю'
              >
                <div
                  className={style.priceLine}
                  style={{ fontSize: fontSizeForTight(24, 22) }}
                >
                  <span>Цена от </span>
                  <span>{price}р</span>
                </div>
              </button>
            </div>
          </div>

          {compatibility || compatibilityMobile ? (
            <div className={style.combosRow}>
              {isMobile500 ? (
                <>
                  <div
                    className={style.combosTitle}
                    style={{ fontSize: combosTitleFontSize }}
                  >
                    Варианты сочетаний с <strong>{comboTitle ?? title}</strong>
                  </div>

                  {compatibilityMobile ? (
                    <Media
                      className={style.combosMobileImg}
                      src={compatibilityMobile}
                      alt=''
                    />
                  ) : compatibility ? (
                    <Media
                      className={style.combosWide}
                      src={compatibility}
                      alt=''
                    />
                  ) : null}
                </>
              ) : (
                <div className={style.combosDesktop}>
                  {compatibility ? (
                    <Media
                      className={style.combosWide}
                      src={compatibility}
                      alt=''
                    />
                  ) : compatibilityMobile ? (
                    <Media
                      className={style.combosWide}
                      src={compatibilityMobile}
                      alt=''
                    />
                  ) : null}

                  <div className={style.combosDesktopText}>
                    <div
                      className={style.combosTitle}
                      style={{ fontSize: combosTitleFontSize }}
                    >
                      Варианты сочетаний с{' '}
                      <strong>{comboTitle ?? title}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className={style.storyOuter}>
            <div className={style.story}>
              {bigGallery.length ? (
                <>
                  <div className={style.storyIntro}>
                    <div
                      className={style.storyTitle}
                      style={{ fontSize: fontSizeForTight(36, 26) }}
                    >
                      ЧЕЛОВЕК - СОАВТОР ПРЕДМЕТА
                    </div>
                    <div
                      className={style.storyText}
                      style={{ fontSize: fontSizeFor(28, 14) }}
                    >
                      Мы проектируем модули так, чтобы они собирались,
                      разбирались и менялись со временем.
                    </div>
                  </div>

                  {isMobile500 ? (
                    <div className={style.storySingleCol}>
                      {bigGallery.map((src, idx) => (
                        <Media
                          key={`${src}-${idx}`}
                          className={style.storyImgLarge}
                          src={src}
                          alt=''
                        />
                      ))}
                    </div>
                  ) : (
                    <div className={style.storyCols}>
                      <div className={style.storyCol}>
                        {bigGallery
                          .filter((_, idx) => idx % 2 === 0)
                          .map((src, idx) => (
                            <Media
                              key={`${src}-l-${idx}`}
                              className={style.storyImgLarge}
                              src={src}
                              alt=''
                            />
                          ))}
                      </div>
                      <div className={style.storyCol}>
                        {bigGallery
                          .filter((_, idx) => idx % 2 === 1)
                          .map((src, idx) => (
                            <Media
                              key={`${src}-r-${idx}`}
                              className={style.storyImgLarge}
                              src={src}
                              alt=''
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <div className={style.footer}>
            <div
              className={style.footerText}
              style={{ fontSize: fontSizeFor(28, 14) }}
            >
              Скачать каталог
            </div>
            <div className={style.footerLine} />
            <button
              type='button'
              className={style.pdf}
              onClick={handleCatalogDownload}
            >
              Каталог PDF
            </button>
          </div>
        </div>
      </div>

      {isGalleryModalOpen && (
        <div
          className={style.galleryModal}
          onClick={() => setIsGalleryModalOpen(false)}
        >
          <div className={style.galleryModalContent}>
            <button
              type='button'
              className={style.galleryModalClose}
              onClick={() => setIsGalleryModalOpen(false)}
              aria-label='Закрыть галерею'
            >
              <img src='/help/back.svg' alt='Закрыть' draggable={false} />
            </button>

            <div
              className={style.galleryModalImageWrap}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <button
                type='button'
                className={style.galleryModalArrow}
                onClick={e => {
                  e.stopPropagation();
                  setActiveImage(i => clampIndex(i - 1));
                }}
                aria-label='Previous image'
              >
                <img src={leftArrowSrc} alt='' draggable={false} />
              </button>

              <Media
                className={style.galleryModalImage}
                src={images[clampIndex(activeImage)]}
                alt=''
              />

              <button
                type='button'
                className={style.galleryModalArrow}
                onClick={e => {
                  e.stopPropagation();
                  setActiveImage(i => clampIndex(i + 1));
                }}
                aria-label='Next image'
              >
                <img src={rightArrowSrc} alt='' draggable={false} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Item() {
  const { id } = useParams<{ id: string }>();
  const data = useMemo(() => getItemById(id), [id]);
  return <ItemPage id={id ?? '1'} {...data} />;
}
