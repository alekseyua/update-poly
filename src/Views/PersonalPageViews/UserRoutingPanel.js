import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../helpers/Text';

import Icon from '../Icon';
import { noticeIcon } from '../../images';
import { ROLE } from '../../const';

import style from './styles/userRouting.module.scss';

const UserRoutingPanel = ({
  amountNotifications,
  cabinet_menu = [],
  username = '',
  currency, 
  balance,
  role,
}) => {

  const initialsName = `${username[0]}${username[username.length - 1]}`;

  const checkRole = (role) => {
    switch (role) {
      case ROLE.DROPSHIPPER:
        return Text({ text: 'dropshipper' });
      case ROLE.WHOLESALE:
        return Text({ text: 'wholesaleBuyer' });
      case ROLE.RETAIL:
        return Text({ text: 'retailBuyer' });
    }
  };
  return (
    <div className={style['cabinet-sidebar__user']}>
      <div className={style['cabinet-sidebar__top']}>
        <div className={style['cabinet-sidebar__ava-wrap']}>
          <div className={style['cabinet-sidebar__ava-name']}>{initialsName}</div>
        </div>
        <div className={style['cabinet-sidebar__user-info']}>
          <div className={style['cabinet-sidebar__user-name']}>{username}</div>
          <div className={style['cabinet-sidebar__user-role']}>{checkRole(role)}</div>
        </div>
      </div>
      <div className={style['cabinet-sidebar__balance-row']} dataintro="step8">
        <div className={style['cabinet-sidebar__balance-block']}>
          <div className={style['cabinet-sidebar__balance-label']}>
            <Text text={'balance'} />:
          </div>
          <div className={style['cabinet-sidebar__balance-value']}>
            {balance ?? 0}&nbsp;
            {currency}
          </div>
        </div>
        <div className={style['cabinet-sidebar__balance-btns']}>
        </div>
      </div>
      <div className={style['cabinet-sidebar__menu']}  dataintro="step9">
        {cabinet_menu.map((el) => {
          return (
            <NavLink
              to={el.url ? el.url : '#'}
              key={el.id}
              className={style['cabinet-sidebar__menu-link']}
              data-cy={`cabinet-sidebar${el.id}`}
            >
              {el.title}
              {
                  el.id === 30 && !!amountNotifications? 
                    <Icon src = { noticeIcon } width = { 15 } height = { 15 } />
                    : null
              }
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(UserRoutingPanel);
