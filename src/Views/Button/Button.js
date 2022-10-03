import React from 'react';
import classNames from 'classnames';
import changeRole from './styles/changeRole.module.scss';
import backForm from './styles/backForm.module.scss';
import BlackBtnFullWidth from './styles/BlackBtnFullWidth.module.scss';
import AccentVariantStyle from './styles/AccentVariant.module.scss';
import Disabled from './styles/disabled.module.scss';
import LogoutBtn from './styles/LogoutBtn.module.scss';
import TabActiveVariantStyle from './styles/TabActiveVariant.module.scss';
import TabVariantStyle from './styles/TabVariant.module.scss';
import CatalogLinkFull from './styles/CatalogLinkFull.module.scss';
import CatalogLinkTransparent from './styles/CatalogLinkTransparent.module.scss';
import CatalogFilter from './styles/CatalogFilter.module.scss';
import CounterBtn from './styles/CounterBtn.module.scss';
import CatalogLinkTransparentModal from './styles/CatalogLinkTransparentModal.module.scss';
import style from './styles/icons.module.scss';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

/**
 * 
 * @param {
 * size - стилизируем размер кнопки
 * disabled - делаем активную и не активную кнопку
 * hasFocus - 
 * full - закрашеная или пустая
 * circle - 
 * pill - 
 * outline - 
 * variant - передаём вариант стиля кнопки
 * className - задаваемый стиль кнопке
 * href - используем Link для навигации
 * target - в связке вместе с href для открытия на новой странице
 * onClickIcon - навешиваем событие на иконку
 * classNameIcon - стилизауи
 * } 
 * @returns 
 */
const Button = ({
  size,
  disabled = false,
  hasFocus,
  full,
  circle,
  pill,
  outline,
  variant,
  className,
  onClick,
  iconLeft,
  iconRight,
  children,
  href,
  target,
  onClickIcon,
  classNameIcon,
  datanoClick,
  ...props
}) => {

  const getVariantStyleBtn = (variant) => {
    switch (variant) {
      case 'changeRole':
        return changeRole['btn'];
      case 'backForm':
        return backForm['btn'];
      case 'black_btn_full_width':
        return BlackBtnFullWidth['btn'];
      case 'logout':
        return LogoutBtn['btn'];
      case 'accent':
        return AccentVariantStyle['btn'];
      case 'tab_active':
        return TabActiveVariantStyle['btn'];
      case 'tab':
        return TabVariantStyle['btn'];
      case 'catalog-link-uppercase':
        return CatalogLinkFull['btn'];
      case 'catalog-link-transparent':
        return CatalogLinkTransparent['btn'];
      case 'catalog_mobile__filter-closed':
        return CatalogFilter['catalog_mobile__filter-closed'];
      case 'catalog_mobile__filter':
        return CatalogFilter['catalog_mobile__filter'];
      case 'catalog_mobile__apply':
        return CatalogFilter['catalog_mobile__apply'];
      case 'catalog_mobile__clear':
        return CatalogFilter['catalog_mobile__clear'];
      case 'catalog-link-transparent__modal':
        return CatalogLinkTransparentModal['catalog-link-transparent__modal']
      case 'counter-btn':
        return CounterBtn['btn']
      default: ''
    }
  }

  const classes = {
    [`button`]: true,
    [`button--${size}`]: !!size,
    [Disabled[`button--disabled`]]: disabled,
    [`button--focused`]: hasFocus,
    [`button--full`]: full,
    [`button--circle`]: circle,
    [`button--pill`]: pill,
    [`button--outline`]: outline,
  };

  const customClassName = classNames({
    [getVariantStyleBtn(variant)]: variant !== 'none',
    [className]: !!className,
    ...classes
  });

  // console.log('cu.dtom class name ', part)
  return (
    <>
      {disabled ?
        (
          !href ?
            <button
              className={customClassName}
              datanoclick={datanoClick}
              disabled={disabled}
            >
               {iconLeft ? <Icon slot="icon-left" className={style[classNameIcon]} style={{marginRight: `10px`}} onClick={onClickIcon} src={iconLeft} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-right" className={style[classNameIcon]} style={{marginLeftt: `10px`}} onClick={onClickIcon} src={iconRight} /> : null}
            </button>
            : <Link
              to='#'
              className={customClassName}
              disabled={disabled}
              datanoclick={datanoClick}
            >
              {children}
            </Link>
        ) : (
          !href ?
            <button
              onClick={onClick}
              className={customClassName}
              datanoclick={datanoClick}
            >
              {iconLeft ? <Icon slot="icon-left" className={style[classNameIcon]}  onClick={onClickIcon} src={iconLeft} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-right" className={style[classNameIcon]} onClick={onClickIcon} src={iconRight} /> : null}
            </button>
            : <Link
              to={`${href}`}
              target={target}
              datanoclick={datanoClick}
              onClick={onClick}
              className={customClassName}
              rel="noopener noreferrer"
            >
              {iconLeft ? <Icon slot="icon-left" className={style[classNameIcon]}  onClick={onClickIcon} src={iconLeft} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-right" className={style[classNameIcon]} onClick={onClickIcon} src={iconRight} /> : null}
            </Link>
        )}
    </>
  );
};

export default Button;
