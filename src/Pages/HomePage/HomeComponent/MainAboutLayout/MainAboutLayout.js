import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../../../helpers/Text';
import { mainAboutImg } from '../../../../images';
// import Settings from '../../#lifehack/Settings/Settings';

import style from './mainAbout.module.scss';

const MainAboutLayout = ({ about_banner, front_admin }) => {
  const { content, title, image, banner_type, url = "#" } = about_banner;
  return (
    <div className={style['main-about']}>
      {/* {front_admin?<Settings nameComponent={'MainAboutLayout'} /> : null } */}

      <div className={'main-about__container'}>
        <div className={style['main-about__wrap']}>
          <div className={style['main-about__content']}>
            <h2 className={style['main-about__title']}>{title}</h2>
            <div
              className={style['main-about__text']}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <NavLink to={url} className={style['main-about__link']}>
              <Text text={'moreDetails'} />
            </NavLink>
            <div className={style['main-about__image']}>
              <img src={image ? image : mainAboutImg} alt={banner_type} />
            </div>
          </div>
        </div>
      </div>
      <div className={style['main-about__bg']}></div>
      <div className={style['main-about__bg']}></div>
    </div>
  );
};

export default React.memo(MainAboutLayout);
