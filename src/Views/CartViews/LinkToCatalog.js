import React from 'react';
import { shoppingIcon } from '../../images';
import Button from '../Button';

import style from './styles/index.module.scss';

const LinkToCatalog = ({ children, to = '#' }) => {
  return (
    <Button
      gxVariant={'link'}
      variant={'catalog-link'}
      className={style['cart-views__link-catalog']}
      href={to}
      iconLeft={shoppingIcon}
    >
      {children}
    </Button>
  );
};

export default React.memo(LinkToCatalog);
