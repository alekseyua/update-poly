import React from 'react';
import { NavLink } from 'react-router-dom';
import { tradingPlatformImg, cartIcon } from '../../../../images';
import Button from '../../../../Views/Button';
import Text from '../../../../helpers/Text';

import style from './tradingPlatform.module.scss';
import Icon from '../../../../Views/Icon';

const TradingPlatformLayout = ({ first_screen, page_type_catalog, front_admin, goToCatalog } = props) => {

  const { title, overtitle, undertitle, filters = [], image } = first_screen;

  return (
    <div className={style['trading-platform']}>
      <div className={style['trading-platform__image']}>
        <img src={image ? image : tradingPlatformImg} alt="trading platform image" />
      </div>
      <div className={'trading-platform__container'}>
        <div className={style['trading-platform__wrap']}>
          <div className={style['trading-platform__content']}>
            <div className={style['trading-platform__info']}>
              <h6 className={style['trading-platform__subtitle']}>{overtitle}</h6>
              <h1 className={style['trading-platform__title']}>{title}</h1>
              <p className={style['trading-platform__text']}>{undertitle}</p>
              <div className={style['trading-platform__buttons']}>
                <NavLink to="/about" className={style['trading-platform__link']}>
                  <Text text={'about_company'} />
                </NavLink>

                <Button dataintro="step1" onClick={()=>goToCatalog('/catalog')} variant={'accent'}>
                  <Icon
                    slot={'icon-left'}
                    src={cartIcon}
                    className={style['trading-platform__btn-icon']}
                    height={20} width={20}
                  />
                  <span>
                    <Text text={'collect_order'} />
                  </span>
                </Button>
                
              </div>
            </div>
            <div className={style['trading-platform__filters']}>
              {filters.map((el) => {
                return (
                  <NavLink
                    key={el.id}
                    to={el.url ? `${page_type_catalog}?category=${el.id}` : '#'}
                    className={style['trading-platform__filter']}
                  >
                    {el.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TradingPlatformLayout);
