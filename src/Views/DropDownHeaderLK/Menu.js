import React from 'react';
import style from './styles/menu.module.scss';
import { Link } from 'react-router-dom';


const Menu = ({ cabinet_menu = [] }) => {  
  return (
    <div 
      className={style['cabinet-menu__wrapper']}
      name={'lk-menu'}
    >
      <ul 
        className={style['cabinet-menu__menu-list']}
        name={'lk-menu'}
      >
        {
            cabinet_menu.map((el) => {
              return (
                <li 
                  key={el.id}
                  className={style['cabinet-menu__item']}
                >              
                    <Link 
                      className={style['cabinet-menu__link']} 
                      data-cy={`menu-${el.title}`} 
                      to={el.url}
                    >
                      {el.title}
                    </Link>
                    <span className={style['cabinet-menu__bage']} slot={'suffix'}>
                      {el.notifi}
                    </span>  
                </li>
              );
            })
        }
      </ul>
    </div>
  );
};
export default React.memo(Menu);

