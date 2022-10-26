import React from 'react';
import DropDownList from '../DropDownList/DropDownList';


const LangAndCurrencies = ({
    currenciesData,
    setCurrenciesData,
    ...props
}) => {

    return (
        <>
            <DropDownList 
                active = { currenciesData.active }
                listItems = { currenciesData.options } 
                currenciesData = { currenciesData }
                setCurrenciesData = { setCurrenciesData }
            />
        </>
    )
}

export default LangAndCurrencies;