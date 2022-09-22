import React from 'react';
import style from './styles/index.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button';

const LinkToFirmalization = ({ children, to = '#', enabled, type = 'link', onClick = null }) => {
  if (!enabled) return <span className={style['cart-views__link-formalization--disabled']}>{children}</span>;
  if (type === 'btn') { 
    return (
      <Button full className={style['cart-views__link-formalization--btn']} onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <NavLink className={style['cart-views__link-formalization']} to={to} onClick={onClick}>
      {children}
    </NavLink>
  );
};

export default React.memo(LinkToFirmalization);
