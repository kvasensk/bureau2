import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Modular.module.css';

export default function Modular() {
  const navigate = useNavigate();

  const BASE = useMemo(() => ({ w: 1920, h1: 1080, h2: 1279, h3: 1080 }), []);
  const [scale, setScale] = useState(1);
  const [scaledMode, setScaledMode] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [isMobile500, setIsMobile500] = useState(false);
  const [stage1Scale, setStage1Scale] = useState(1);
  const [stage2Scale, setStage2Scale] = useState(1);
  const [stage3Scale, setStage3Scale] = useState(1);
  const [stage4Scale, setStage4Scale] = useState(1);
  const [stage5Scale, setStage5Scale] = useState(1);
  const [catalogScale, setCatalogScale] = useState(1);
  const [dividerPad, setDividerPad] = useState(83);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;

      const pad = Math.round(Math.max(22, Math.min(83, 83 * (vw / BASE.w))));
      setDividerPad(pad);

      if (vw <= 800) {
        setIsCompact(true);
        setIsMobile500(vw <= 500);
        setScaledMode(false);
        setScale(1);
        setStage1Scale(vw / 728);
        const sideMargin = 16; // px each side
        const availableW = Math.max(0, vw - sideMargin * 2);
        setStage2Scale(Math.min(1, availableW / 668));
        setStage3Scale(Math.min(1, availableW / 718));
        setStage4Scale(Math.min(1, availableW / 668));
        setStage5Scale(Math.min(1, availableW / 668));
        setCatalogScale(Math.min(1, availableW / 702));
        return;
      }

      setIsCompact(false);
      setIsMobile500(false);
      setScaledMode(true);
      const s = Math.min(1, vw / BASE.w);
      setScale(s);
      setStage1Scale(1);
      setStage2Scale(1);
      setStage3Scale(1);
      setStage4Scale(1);
      setStage5Scale(1);
      setCatalogScale(1);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [BASE.h1, BASE.h2, BASE.h3, BASE.w]);

  const handleCatalogDownload = () => {
    const a = document.createElement('a');
    a.href = '/catalog.pdf';
    a.download = 'catalog.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

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

      <div className={style.stage1LogoRow}>
        <img
          className={style.stage1Logo}
          src='/modular/1page/topLogo.svg'
          alt=''
          draggable={false}
        />
      </div>

      {isMobile500 ? (
        <div className={style.mobileFlow}>
          <div className={style.mobileStage}>
            <img
              className={style.mobileImg}
              src='/modular/1page/p1_3.svg'
              alt=''
              draggable={false}
            />
          </div>
          <img
            className={style.mobileDivider}
            src='/modular/btw/bottom_m.svg'
            alt=''
            draggable={false}
          />
          <div className={`${style.mobileStage} ${style.mobileStage2}`}>
            <img
              className={style.mobileImg}
              src='/modular/2page/page2_3.svg'
              alt=''
              draggable={false}
            />
          </div>
          <img
            className={style.mobileDivider}
            src='/modular/btw/bottomrr_m.svg'
            alt=''
            draggable={false}
          />
          <div className={`${style.mobileStage} ${style.mobileStage3}`}>
            <img
              className={style.mobileImg}
              src='/modular/page3/page3_3.svg'
              alt=''
              draggable={false}
            />
          </div>
          <img
            className={style.mobileDivider}
            src='/modular/btw/bottom_m.svg'
            alt=''
            draggable={false}
          />
          <div className={`${style.mobileStage} ${style.mobileStage4}`}>
            <img
              className={style.mobileImg}
              src='/modular/page4/page4_3.svg'
              alt=''
              draggable={false}
            />
          </div>
          <img
            className={style.mobileDivider}
            src='/modular/btw/bottomrr_m.svg'
            alt=''
            draggable={false}
          />
          <div className={`${style.mobileStage} ${style.mobileStage5}`}>
            <img
              className={style.mobileImg}
              src='/modular/page5/page5_3.svg'
              alt=''
              draggable={false}
            />
          </div>
        </div>
      ) : (
        <>
          <div className={style.stageOuter}>
            <div
              className={style.stage}
              style={
                isCompact
                  ? ({ zoom: stage1Scale } as React.CSSProperties)
                  : scaledMode
                  ? ({ zoom: scale } as React.CSSProperties)
                  : undefined
              }
            >
              <div className={style.topRow}>
                <img
                  className={`${style.left} ${style.leftDesktop}`}
                  src='/modular/1page/left.svg'
                  alt=''
                  draggable={false}
                />
                <img
                  className={`${style.left} ${style.leftCompact}`}
                  src='/modular/1page/left1.svg'
                  alt=''
                  draggable={false}
                />

                <div className={style.center}>
                  <div className={style.textArea}>
                    <div className={style.textBlock}>
                      <h1 className={style.h1}>О КОЛЛЕКЦИИ</h1>
                      <p className={style.lead}>
                        <strong>MODULAR</strong> – коллекция мебели из фанеры и
                        массива березы, с элементами из нержавеющей стали.
                      </p>
                      <p className={style.body}>
                        Она состоит из 20 самостоятельных модулей.
                      </p>
                      <p className={style.body}>
                        С возможностью соединения между собой. Это позволяет
                        самостоятельно создавать интерьерные композиции под
                        различные задачи
                      </p>
                    </div>
                  </div>
                </div>

                <img
                  className={`${style.right} ${style.rightDesktop}`}
                  src='/modular/1page/right.svg'
                  alt=''
                  draggable={false}
                />
                <img
                  className={`${style.right} ${style.rightCompact}`}
                  src='/modular/1page/right1.svg'
                  alt=''
                  draggable={false}
                />
              </div>

              <div
                className={style.bottomRow}
                style={{ padding: `${dividerPad}px 0` }}
              >
                <img
                  className={style.bottom}
                  src='/modular/btw/bottom.svg'
                  alt=''
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className={style.stageOuter}>
            <div
              className={style.stage2}
              style={
                !isCompact && scaledMode
                  ? ({ zoom: scale } as React.CSSProperties)
                  : undefined
              }
            >
              <div className={style.stage2Inner}>
                <div
                  className={style.stage2Title}
                  style={
                    isCompact
                      ? ({ zoom: stage2Scale } as React.CSSProperties)
                      : undefined
                  }
                >
                  СОВМЕСТНЫЙ РОСТ МЕБЕЛИ И ЧЕЛОВЕКА
                </div>

                <div
                  className={style.stage2PicWrap}
                  style={
                    isCompact
                      ? ({ zoom: stage2Scale } as React.CSSProperties)
                      : undefined
                  }
                >
                  <img
                    className={style.stage2Pic}
                    src='/modular/2page/pic.svg'
                    alt=''
                    draggable={false}
                  />
                  <div className={style.stage2Caption}>
                    Созданная из натуральных материалов, коллекция отвечает на
                    запрос к адаптивности предметов быта через модульную
                    систему, минималистичный дизайн и продуманную
                    функциональность
                  </div>
                </div>
              </div>

              <div
                className={style.stage2BottomRow}
                style={{ padding: `${dividerPad}px 0` }}
              >
                <img
                  className={style.stage2Bottom}
                  src='/modular/btw/bottomr.svg'
                  alt=''
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className={style.stageOuter}>
            <div
              className={style.stage3}
              style={
                !isCompact && scaledMode
                  ? ({ zoom: scale } as React.CSSProperties)
                  : undefined
              }
            >
              <div className={style.stage3Inner}>
                <div className={style.stage3Title}>КОМПОНЕНТЫ</div>
                <img
                  className={style.stage3Pic}
                  style={
                    isCompact
                      ? ({ zoom: stage3Scale } as React.CSSProperties)
                      : undefined
                  }
                  src={
                    isCompact
                      ? '/modular/page3/pic1.svg'
                      : '/modular/page3/pic.svg'
                  }
                  alt=''
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className={`${style.stageOuter} ${style.dividerOuter}`}>
            <div
              className={style.dividerStage}
              style={
                scaledMode
                  ? ({ zoom: scale } as React.CSSProperties)
                  : undefined
              }
            >
              <div
                className={style.bottomRow}
                style={{ padding: `${dividerPad}px 0` }}
              >
                <img
                  className={style.bottom}
                  src='/modular/btw/bottom.svg'
                  alt=''
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className={style.stageOuter}>
            <div
              className={style.stage4}
              style={
                !isCompact && scaledMode
                  ? ({ zoom: scale } as React.CSSProperties)
                  : undefined
              }
            >
              <div className={style.stage4Inner}>
                <img
                  className={style.stage4Pic}
                  style={
                    isCompact
                      ? ({ zoom: stage4Scale } as React.CSSProperties)
                      : undefined
                  }
                  src='/modular/page4/pic.svg'
                  alt=''
                  draggable={false}
                />
              </div>

              <div
                className={style.stage2BottomRow}
                style={{ padding: `${dividerPad}px 0` }}
              >
                <img
                  className={style.stage2Bottom}
                  src='/modular/btw/bottomr.svg'
                  alt=''
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className={style.stageOuter}>
            <div
              className={style.stage5}
              style={
                !isCompact && scaledMode
                  ? ({ zoom: scale } as React.CSSProperties)
                  : undefined
              }
            >
              <div className={style.stage5Inner}>
                <img
                  className={style.stage5Pic}
                  style={
                    isCompact
                      ? ({ zoom: stage5Scale } as React.CSSProperties)
                      : undefined
                  }
                  src={
                    isCompact
                      ? '/modular/page5/pic1.svg'
                      : '/modular/page5/pic.svg'
                  }
                  alt=''
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className={style.stageOuter}>
        <div
          className={style.catalogStage}
          style={
            !isCompact && scaledMode
              ? ({ zoom: scale } as React.CSSProperties)
              : undefined
          }
        >
          <div
            className={style.catalogInner}
            style={{ padding: `${dividerPad}px 250px` }}
          >
            <div
              className={style.catalogRow}
              style={
                isCompact
                  ? ({ zoom: catalogScale } as React.CSSProperties)
                  : undefined
              }
            >
              {isCompact ? (
                <div className={style.catalogDownloadText}>Скачать каталог</div>
              ) : (
                <img
                  className={style.catalogLine}
                  src='/modular/btw/last.svg'
                  alt=''
                  draggable={false}
                />
              )}
              <button
                className={style.catalogButton}
                type='button'
                onClick={handleCatalogDownload}
              >
                Каталог PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
