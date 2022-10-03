import React from 'react';
import Icon from '../../Icon';
import classNames from 'classnames';
import {
  labelSale,
  labelNew,
  labelHit,
  labelOnsale
} from '../../../images';

import style from './styles/labels.module.scss';

const Labels = ({ 
    is_new,
    is_bestseller,
    is_in_stock,
    is_closeout,
 }) => {
  
  const items = [
    {
      icon: labelSale,
      isVisible: is_closeout,
    },
    {
      icon: labelNew,
      isVisible: is_new,
    },
    {
      icon: labelHit,
      isVisible: is_bestseller,
    },
    {
      icon: labelOnsale,
      isVisible: is_in_stock,
      modifyClass: 'long',
    },
  ]

  return (
    <ul className={style['prodpage-labels']}>
      {items.map((el, i) => {
        if(!el.isVisible) return null
        return (
          <li
            key={i}
            className={classNames({
              [style['prodpage-labels__item']]: true,
              [style[el.modifyClass]]: el.modifyClass,
            })}
          >
            <Icon src={el.icon}  width={el.modifyClass === 'long'? '90' : '40'} height={'40'}/>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Labels);
