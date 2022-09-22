import React, { useState } from 'react';
import classNames from 'classnames';
import Logo from '../../../Views/Logo/Logo';
import TopHeaderMenu from './TopHeaderMenu/TopHeaderMenu';
import TopHeaderButtons from './TopHeaderButtons/TopHeaderButtons';
import { getCookie, setCookie } from '../../../helpers/helpers'
import {
  CURRENCIES_DATA,
  COOKIE_KEYS,
  ONE_YEARS,
  DEFAULT_CURRENCIES,
} from '../../../const';
import BurgerMenuContainer from './TopHeaderMenu/BurgerMenu/BurgerMenuContainer';

import style from './index.module.scss';

const HeaderTop = (props) => {

  const getCurrencies = () => {
    if (props.currencies) {
      return props.currencies[0];
    } else {
      return DEFAULT_CURRENCIES;
    }
  };
  const defaultCurrenciesSingle = getCurrencies;
  const currencyDefault = getCookie(COOKIE_KEYS.CURRENCIES);
  const defaultCurrenciesData = {
    isOpen: false,
    active: currencyDefault ? currencyDefault : defaultCurrenciesSingle(),
    options: props.currencies
      ? props.currencies.map((el) => {
        return {
          name: el,
          value: el,
        };
      })
      : CURRENCIES_DATA,
  };
  const [currenciesData, setCurrencies] = useState(defaultCurrenciesData);
  const setCurrenciesData = (data) => {
    setCookie(COOKIE_KEYS.CURRENCIES, data.active, ONE_YEARS);
    setCurrencies(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <div
      className={classNames({
        [style['top-header']]: true,
        [style['top']]: false,
      })}
    >
      <div className={style['top-header-wrapper']}>
        <div
          className={style['top-header__top']}
        >
          <BurgerMenuContainer
            site_configuration={props.site_configuration}
            header_menu={props.header_menu}
          />
          <div
          className={style['top-header__logo-inner']}
          >
            <Logo
              logo={props.logo}
              siteLocation={'head-top'}
              logoLinkGoto={props.logoLinkGoto}
            />
          </div>

          <TopHeaderMenu header_menu={props.header_menu} />

          <TopHeaderButtons
            lang={true}
            setCurrenciesData={setCurrenciesData}
            currenciesData={currenciesData}
          />
        </div>

        {/* <HeaderButtons
                    lang
                    cabinet_data={cabinet_data}
                    setCurrenciesData={setCurrenciesData}
                    currenciesData={currenciesData}
                /> */}

      </div>
      {/* <NavLink to='/'>Home</NavLink>
            <NavLink to='catalog'>Catalog</NavLink>
            <NavLink to='about'>About</NavLink> */}

    </div>
  )
}

export default HeaderTop;