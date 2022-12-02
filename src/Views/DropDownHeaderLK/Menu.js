import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { noticeIcon } from '../../images';

import style from './styles/menu.module.scss';

const Menu = ({ cabinet_menu = [], amountNotifications }) => {  

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
                      {
                        el.id === 30 && !!amountNotifications? 
                          <Icon src = { noticeIcon } width = { 15 } height = { 15 } />
                          : null
                      }
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

