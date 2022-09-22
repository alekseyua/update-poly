import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import style from './bottomheadermenu.module.scss';

const BottomHeaderMenu = (props) => {

    return(
        <div
        className={classNames({
          [style['bottom-header-menu']]: true,
        //   [style['scrolled']]: isScrolled,
        })}
      >
        <div className={style['container']}>
          <ul className={style['bottom-header-menu__list']}>
            {props.main_menu.map((el, i) => {
              return (
                <li key={i} className={style['bottom-header-menu__li']}>
                  <div
                    className={classNames({
                      [style['bottom-header-menu__li-item']]: true,
                      [el.css_class]: !!el.css_class,
                    })}
                  >
                    <NavLink to={`${el.url.split('/').pop()}`}>{el.title}</NavLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
}

export default BottomHeaderMenu;