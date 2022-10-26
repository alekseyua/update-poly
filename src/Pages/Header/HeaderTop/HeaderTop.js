import React, { useState, useEffect } from 'react';
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

const HeaderTop = ({
  currencies,
  ...props
}) => {
//  console.log('props header top', props)

  useEffect(()=>{
    !getCookie(COOKIE_KEYS.CURRENCIES)?
      setCookie(COOKIE_KEYS.CURRENCIES, DEFAULT_CURRENCIES, ONE_YEARS)
      : null
  },[])

  const getCurrencies = () => {
    if (getCookie(COOKIE_KEYS.CURRENCIES)) {
      return getCookie(COOKIE_KEYS.CURRENCIES);
    } else {        
      return DEFAULT_CURRENCIES;
    }
  };

  const defaultCurrenciesSingle = getCurrencies;
  const currencyDefault = getCookie(COOKIE_KEYS.CURRENCIES);

  const defaultCurrenciesData = {
    isOpen: false,
    active: currencyDefault ? currencyDefault : defaultCurrenciesSingle(),
    options: currencies
      ? currencies.map((el) => {
        return {
          name: el,
          value: el,
        };
      })
      : CURRENCIES_DATA,
  };
  const [currenciesData, setCurrencies] = useState(defaultCurrenciesData);

  // useEffect(()=>{
  //   setCurrencies(prev => ({...prev, options: currencies }))
  // },[currencies])

  const setCurrenciesData = (data) => {
    setCookie(COOKIE_KEYS.CURRENCIES, data.active, ONE_YEARS);
    props.setCurrencyCurrencies(data.active)
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