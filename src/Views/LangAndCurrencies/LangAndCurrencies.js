import React from 'react';
import DropDownList from '../DropDownList/DropDownList';


const LangAndCurrencies = (props) => {

    return (
        <>
            <DropDownList 
                listItems={props.currenciesData.options} 
                active={props.currenciesData.active}
                setCurrenciesData={props.setCurrenciesData}
            />
        </>
    )
}

export default LangAndCurrencies;