import React from "react";
import Text from "../../../helpers/Text";
import Button from '../../Button';
import classNames from "classnames";

import style from './styles/sizesitems.module.scss';
import Icon from "../../Icon";
import { fire } from "../../../images";

const SizesItems = ({
  handleChooseProduct,
  in_stock_count,
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
      {in_stock_count ? (
        <p className={style['prodpage-sizes__remainder']}>
          <Icon className={style['prodpage-sizes__remainder-btn']} src={fire} width={20} height={20} />
          Осталось:{in_stock_count} ед.
        </p>
      ) : null}
    </div>
  )
}

export default SizesItems;