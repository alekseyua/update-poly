import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import { infoWhite, arrowDown } from '../../images';

import style from './styles/select.module.scss';
import BlackStyle from './styles/blackStyle.module.scss';

const Select = ({
  className,
  addClass,
  label = "",
  placeholder,
  options = [],
  selectSettings,
  variant,
  children,
  helpText = null,
  onClick,
  value,
  ...props
}) => {
  /**
   * @param {
   *  onClick - возращает значение по элементу option
   * onClick={(e) => {
   *     const value = e.target.getAttribute('value');
   *   }}
   *  option - [
   *  {
   *    title: 'title',
   *    value: 'value'
   *  }
   * ]
   *  placeholder - текст в initial титуле
   *  
   * } @values
   * @return 
   */



  const [active, setActive] = useState(false)
  const [textPlaceholder, setTextPlaceholder] = useState(placeholder);

  const hendlerClick = (e) => {
    const textItem = e.target.getAttribute('name');
    setTextPlaceholder(textItem)
    onClick(e)
  }

  const variantEnum = {
    default: 'default',
    black: 'black',
  };

  const getVariantStyleSelect = (variant = variantEnum.default) => {
    switch (variant) {
      case 'select-theme__black-full':
        return BlackStyle['select__btn'];
      case 'select-feedback':
        return style['select-feedback']
      default:
        return style['select'];
    }
  };

  const customClassName = classNames({
    [style['select__body']]: true,
    [style['select__body--active']]: active,
    [style[getVariantStyleSelect(variant)]]: !!variant,
    [style[className]]: !!className,
    [style[addClass]]: !!addClass,
  });

  const handlerChangeList = () => {
    setActive(c => !c)
  }

  useEffect(()=>{
    if(!!!value) setTextPlaceholder(placeholder)
  },[value])

  useEffect(()=>{
    const handleClickLayout = (e) => {
      const element = e.target;
      element.getAttribute('name') ==='select' && !active ? setActive(true) : setActive(false)
    }
    document.addEventListener('click',handleClickLayout)
    return ()=> document.removeEventListener('click',handleClickLayout)
  },[])

  return (
    <div
      className={style['select__container']}
      >
        <label
          className={style['select__label']}
        >{label}</label>
      <div
        name={'select'}
        className={customClassName}
        onClick={handlerChangeList}
      >
        <span>
          {textPlaceholder}
        </span>
        <div
          className={classNames({
            [style['select__option-container']]: true,
            [style['select__option-container--active']]: active
          })
          }
        >

          {options.map((el, i) => {
            const { title, value, className, ...elData } = el;
            return (
              <span
                key={i}
                value={value}
                name={title}
                onClick={hendlerClick}
                className={style['select__option-item']}
                {...elData}
              >
                {title}
              </span>
            );
          })}
        </div >
      </div>

      <Icon
        className={classNames({
          [style['select__icon']]:true,
          [style['select__icon--active']]: active
        })
        }
        slot="suffix"
        id = { 'droppown-select' }
        src={arrowDown}
        width={20}
        height={20}
        filter={'invert(50%)'}

      />
      {
        helpText ?
          helpText
          : null
      }
    </div>
  );
};

export default React.memo(Select);
