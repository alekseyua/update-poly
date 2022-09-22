import React from 'react';
import { redWomen } from '../../images';
import style from './styles/leftSide.module.scss';
import { Player } from 'video-react';

const LeftSide = ({ image = redWomen, video_page }) => {

  return (
    <div className={style['wrapper']}>
      <Player 
          className={style["news-details-page__slider_item"]}
          controls={false}
          width={'100%'}
          height={'100%'}
          muted={true}
          autoPlay={true}
          preLoad={"auto"}
          loop={true}
          fluid={false} 
          poster={image} 
          src={video_page}
      >
      </Player>
      <div className={style['wrapper__marcket-info']}>
        <div className={style['wrapper__upper-title']}>
          ТОРГОВАЯ БИЗНЕС-ПЛАТФОРМА для Розничных, оптовых партнеров и дропшипперов
        </div>
        <div className={style['wrapper__midle-title']}>FASHION TOWN</div>
        <div className={style['wrapper__line']}></div>
        <div className={style['wrapper__lower-title']}>
          Для тех, кто хочет не только покупать, но и зарабатывать!
        </div>
      </div>
    </div>
  );
};
export default React.memo(LeftSide);
