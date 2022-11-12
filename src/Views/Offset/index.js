import React from 'react';
import classNames from 'classnames';

import style from './styles/index.module.scss';

const Offset = ({ offset = 0 }) => {
  return (
    <div
      className={classNames({
        [style['offset']]: true,
        [style[`offset--${offset}`]]: offset,
      })}
    ></div>
  );
};

export default React.memo(Offset);
