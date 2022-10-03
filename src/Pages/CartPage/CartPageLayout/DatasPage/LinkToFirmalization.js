import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './styles/cartpage.module.scss';
import Button from '../../../../Views/Button';

const LinkToFirmalization = ({ children, to = '#', enabled, type = 'link', onClick = null }) => {
  if (!enabled) return <span className={style['cart-page__link-formalization--disabled']}>{children}</span>;
  if (type === 'btn') { 
    return (
      <Button full className={style['cart-page__link-formalization--btn']} onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <NavLink className={style['cart-page__link-formalization']} to={to} onClick={onClick}>
      {children}
    </NavLink>
  );
};

export default React.memo(LinkToFirmalization);
