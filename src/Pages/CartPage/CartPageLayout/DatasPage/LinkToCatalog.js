import React from 'react';
import { shoppingIcon } from '../../../../images';
import Button from '../../../../Views/Button';

import style from './styles/cartpage.module.scss';

const LinkToCatalog = ({ children, to = '#' }) => {
  return (
    <Button
      variant={'catalog-link'}
      className={style['cart-page__link-catalog']}
      href={to}
      iconLeft={shoppingIcon}
    >
      {children}
    </Button>
  );
};

export default React.memo(LinkToCatalog);
