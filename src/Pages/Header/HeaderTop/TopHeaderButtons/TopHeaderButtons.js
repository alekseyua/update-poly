import React from 'react';
import classNames from 'classnames';
import LangAndCurrencies from '../../../../Views/LangAndCurrencies/LangAndCurrencies';
import style from './topheaderbuttons.module.scss';


const TopHeaderButtons = ({
  currenciesData,
  setCurrenciesData,
  ...props
}) => {
   
    return (
      <div
        className={classNames({
          [style['header-buttons']]: true,
        })}
      >
          <div className={style['header-buttons-dropdowns']}>
            <LangAndCurrencies
              currenciesData = { currenciesData }
              setCurrenciesData = { setCurrenciesData }  
            />
          </div>
      </div>
    );
  };
  
  export default React.memo(TopHeaderButtons);