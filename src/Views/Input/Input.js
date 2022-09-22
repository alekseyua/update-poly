import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import LargeCustomLabelStyle from './styles/LargeCustomLabelStyle.module.scss';
import Large from './styles/Light.module.scss';
import LightStyle from './styles/Light.module.scss';
import DarkStyle from './styles/Dark.module.scss'
import DefaultStyle from './styles/Default.module.scss'
import style from './styles/input.module.scss';

const Input = (props) => {
  const { variant, className, value, children, label, autofocus, type = 'text', placeholder, onChange, name, autocomplete = 'off' } = props;
  // console.log('props input search', props)
  const inputRef = useRef(null);

  const variantEnum = {
    default: 'default',
    large: 'large',
    largeCustomLabel: 'largeCustomLabel',
    light: 'light',
    dark: 'dark',
  };

  const getVariantStyleInput = (variant = 'input') => {
    switch (variant) {
      case variantEnum.large:
        return Large['input'];
      case variantEnum.largeCustomLabel:
        return LargeCustomLabelStyle['input'];
      case variantEnum.light:
        return LightStyle['input'];
      case variantEnum.dark:
        return DarkStyle['input'];
      default:
        return DefaultStyle[variant];
    }
  };




  useEffect(() => {
    autofocus ?
      inputRef.current.focus()
      : inputRef.current.blur();
  }, [autofocus])


  return (
    <>
      <label
        className={style['input__label']}
      >{label}</label>
      <div
        className={classNames({
          [style['input__wrapper']]: true,
          [getVariantStyleInput(variant)]: !!variant,
          [style[className]]: !!className
        })}
      >
        <input
          autoComplete={autocomplete}
          type={type}
          autoFocus={autofocus}
          className={style['input__input']}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          ref={inputRef}
        />
        {children}
        {
          props.helpText?
            props.helpText
            : null        
        }
      </div>

    </>
  )
}

export default Input;