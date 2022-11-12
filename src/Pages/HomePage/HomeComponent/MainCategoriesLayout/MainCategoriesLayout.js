import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

import Text from '../../../../helpers/Text';
import { categoryCard1 } from '../../../../images/index';
import { isTargetBlank } from '../../../../helpers/helpers';
// import Settings from '../../#lifehack/Settings/Settings';

import style from './mainCategories.module.scss';

const MainCategoriesLayout = ({ banners = [], front_admin }) => {

  return (
    <div className={style['main-categories']}>
      {/* {front_admin?<Settings nameComponent={'MainCategoriesLayout'} /> : null } */}
      <div className={'main-categories__container'}>
        <div className={style['main-categories__wrap']}>
          {banners.map((el, i) => {
            return (
              <div
                key={i}
                className={classNames({
                  [style['main-categories__card']]: true,
                  [el.css_class]: true,
                })}
                data-type={el.banner_type}
              >
                <NavLink to={el.url ? el.url : '#'} target={isTargetBlank(el.target_blank)}>
                  <div className={style['category-card']}>
                    <div className={style['category-card__image']}>
                      <img
                        className={style['category-card__img']}
                        src={el.image ? el.image : categoryCard1}
                        alt={Text({ text: 'newItems' })}
                      />
                    </div>
                    <div className={style["category-card__inner-title"]}>
                      <h2
                        className={classNames({
                          [style['category-card__title']]: true,
                          [style['main-categories__title']]: true,
                          [style['main-categories__title-strong']]: true,
                        })}
                      >
                        {el.title}
                      </h2>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainCategoriesLayout);
