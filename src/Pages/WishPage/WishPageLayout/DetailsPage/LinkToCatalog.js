import React from 'react';
import { shoppingIcon } from '../../../../images';
import Button from '../../../../Views/Button';

import style from './styles/wishpage.module.scss';

const LinkToCatalog = ({ children, to = '#' }) => {
  return (
    <Button
      variant={'catalog-link'}
      className={style['wishpage__link-catalog']}
      href={to}
      iconLeft={shoppingIcon}
    >
      {children}
    </Button>
  );
};

export default React.memo(LinkToCatalog);
