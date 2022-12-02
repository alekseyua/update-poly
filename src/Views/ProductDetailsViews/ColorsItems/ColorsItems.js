import React, { useEffect, useState } from "react";
import Text from "../../../helpers/Text";
import Button from '../../Button';
import classNames from "classnames";

import style from './styles/colorsitems.module.scss';

const ColorsItems = ({
  handleChooseProduct,
  productId,
  colors,
  sizes
}) => {
  const [ disabledButton, setDisabledButton ] = useState(false);
  useEffect(()=>{
    setDisabledButton(false)
  },[colors])
  return (
    <div className={style['prodpage-colors']}>
      <p className={style['prodpage-colors__name']}>
        <>
          <span>
            <Text text="color" />: &nbsp;
          </span>
          {
            colors.map( activeColor=> activeColor.selected? <span key={`color-${activeColor.id}`}> { activeColor.title } </span> : null )                              
          }
        </>
      </p>
      <ul className={ style['prodpage-colors__items'] }>
        {
          colors.map((el) => {          
            return (
              <li
                key={`element-color-${el.id}`}
                className={style['prodpage-colors__item']}
              >
                <div
                  disabled={el.selected}
                  className={classNames({
                    [style['prodpage-colors__btn']]: true,
                    [style['prodpage-colors__btn--active']]: el.selected,
                    [style['prodpage-colors__btn--disabled']]: disabledButton,
                  })}
                  onClick={() => {
                    handleChooseProduct(productId, el.id, sizes);
                    setDisabledButton( true )
                  }}
                  variant="text"
                  style={{ backgroundColor: el.color, borderRadius: '1px', height: '100%' }}
                ></div>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

export default ColorsItems;