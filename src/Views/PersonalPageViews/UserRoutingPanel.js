import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../helpers/Text';
import { COOKIE_KEYS, ROLE } from '../../const';
import { getCookie } from '../../helpers/helpers';

import style from './styles/userRouting.module.scss';


const UserRoutingPanel = ({
  cabinet_menu = [],
  username = '',
  balance,
  role,
}) => {

  const initialsName = `${username[0]}${username[username.length - 1]}`;

  // const closeModal = () => {
  //   setModalStates({
  //     content: null,
  //     show: false,
  //     addClass: false,
  //   });
  // };

  // const openModalPay = () => {
  //   orderApi.getRandomRequizites().then((res) => {
  //     setModalStates({
  //       content: <PayModalContent 
  //                   closeModal={closeModal}
  //                   requisites={res}
  //                   order_id={false}
  //                />,
  //       show: true,
  //       addClass: 'modal-payments',
  //     });
  //   });
  // };

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
            {balance}&nbsp;
            {getCookie(COOKIE_KEYS.CURRENCIES)}
          </div>
        </div>
        <div className={style['cabinet-sidebar__balance-btns']}>
          {/* <Button onClick={openModalPay} variant={'cabinet_border_accent'}>
            Пополнить
          </Button> */}
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
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(UserRoutingPanel);
