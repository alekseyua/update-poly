import React, { useRef } from 'react';
import style from './Default.module.scss';
import classNames from 'classnames';

const variantEnum = {
  default: 'default',
  large: 'large',
  light: 'light',
  switch: 'switch',
};

const getVariantStyleCheckbox = (variant = variantEnum.default) => {
  switch (variant) {
    case variantEnum.large:
      return style['checkbox__large'];
    case variantEnum.switch:
      return style['checkbox__switch'];
    case variantEnum.light:
      return style['checkbox__light'];
    default:
      return style['checkbox__input'];
  }
};

const CheckBox = ({
  onChange,
  label,
  helpText,
  variant,
  checked,
  disabled,
  colorField = false,
  className,
  name,
  value,
  id,
  children,
  ...props
}) => {
  //todo: чтоб не светился ошибками сделаю мега костыль не бейте пж
  const refCheck = useRef(null);

  const handlerOnChange = (e) =>{
    onChange(refCheck.current)
  }

  if (!checked) {
    checked = false
  }else{
    checked = true
  }

  const classNameCustom = classNames({
    [style['type-checkbox']]: true,
    [getVariantStyleCheckbox(variant)]: true,
    [style[className]]: !!className,
  });
  return (
    <div 
      className={style['checkbox__container']}
      onClick={handlerOnChange} 
    >
        {
          colorField ? (
            <span style={{ backgroundColor: colorField }} className={style['color-field__icon']}></span>
          ) : null
        }
      <input
        key={name}
        onChange={()=>{}} //чтобы не ругался реакт
        ref={refCheck}  
        type={'checkbox'}
        className={classNameCustom}
        disabled={disabled}
        checked={checked}
        label={label}
        name={name}//iAgreeDataProcessing   ----- name="check" 
        id={id}
        value={value} 
      />
        <label htmlFor="check" className={style['checkbox__label']}>
          <span></span>{label}
        </label>

      {
        helpText?
          helpText
          : null        
      }


    </div>
  );
};

export default React.memo(CheckBox);
