import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './moreLink.module.scss';

const MoreLink = (props) => {
  const { children, url = `/` } = props;
  return (
    <div className={style['more-link']}>
      <NavLink to={url} className={style['more-link__link']}>
        {children}
      </NavLink>
    </div>
  );
};

export default React.memo(MoreLink);
