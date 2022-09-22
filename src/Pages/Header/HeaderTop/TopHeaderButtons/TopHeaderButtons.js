import React from 'react';
import classNames from 'classnames';
import LangAndCurrencies from '../../../../Views/LangAndCurrencies/LangAndCurrencies';
import style from './topheaderbuttons.module.scss';


const TopHeaderButtons = (props) => {
   
    return (
      <div
        className={classNames({
          [style['header-buttons']]: true,
        })}
      >
          <div className={style['header-buttons-dropdowns']}>
            <LangAndCurrencies
              currenciesData={props.currenciesData}
              setCurrenciesData={props.setCurrenciesData}  
            />
          </div>
      </div>
    );
  };
  
  export default React.memo(TopHeaderButtons);