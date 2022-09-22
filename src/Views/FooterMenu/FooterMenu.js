import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './footerMenu.module.scss';
import { ROLE } from '../../const';


const FooterMenu = (props) => {
  const { menu, title, role } = props;
  let newStyle = style['footer-menu__list-item'];
  return (
    <div className={style['footer-menu']}>
      <div className={'container'}>
        <nav>
          <ul className={style['footer-menu__list']}>
              {menu.map((el, key) => {
                // console.log('el - ', el)
                if( el.name === "Личный кабинет" && role === ROLE.UNREGISTRED ){
                  newStyle = style['footer-menu__list-item--active']
                }else{
                  newStyle = style['footer-menu__list-item']
                }
                return (
                  <li key={`${el.id}-${key}`} className={newStyle}>
                    <NavLink to={el.url}>{el.name}</NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(FooterMenu);
