import React from "react";
import Text from "../../../helpers/Text";
import Button from '../../Button';
import classNames from "classnames";

import style from './styles/sizesitems.module.scss';

const SizesItems = ({
  handleChooseProduct,
  productId,
  colors,
  sizes,
}) => {

  return (
    <div className={style['prodpage-sizes']}>
      <ul className={style['prodpage-sizes__items']}>
        {
          sizes.map((el) => {
          
            return (
              <li
                key={`element-color-${el.id}`}
                className={style['prodpage-sizes__item']}
              >
                <div
                  disabled={el.selected}
                  className={classNames({
                    [style['prodpage-sizes__btn']]: true,
                    [style['prodpage-sizes__btn--active']]: el.selected,
                  })}
                  onClick={() => {
                    handleChooseProduct(productId, colors, el.id)
                  }}
                  variant="text"
                >
                  {el.title}
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export default SizesItems;