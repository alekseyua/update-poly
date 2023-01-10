import React from 'react';
import { storeIcon } from '../../images';
import Text from '../../helpers/Text';
import classNames from 'classnames';
import { ROLE } from '../../const';
import { Link } from 'react-router-dom';
//Views -> CreateStorage

import style from './styles/userRouting.module.scss';

const CreateStore = ({ create_shop = '#', role, className }) => {

  if (ROLE.RETAIL === role || ROLE.UNREGISTRED === role) return null;
  const customClassName = classNames({
    [style['cabinet-sidebar__new-store-btn']]: true,
    [style[className]]: !!className,
  });
  
  return (
  //  <Link to={create_shop} className={customClassName} //здесь ссылка на страницу заказа магазина
    <Link to={'#'} className={customClassName}

    >
      <img src={storeIcon} alt="store" />
      <span>
        <Text text={'createMyStore'} />
      </span>
    </Link>
  );
};
export default React.memo(CreateStore);
