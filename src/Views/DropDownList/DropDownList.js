import React, { useState } from 'react';
import Form from '../Form';
import SelectCurrency from '../Select/SelectCurrency';
import style from './dropdownlist.module.scss';

const DropDownList = ({ listItems, active, currenciesData, setCurrenciesData }) => {
    const [activeItem, setActiveItem] = useState(active);
    const handlerChangeDropDown = (e) => {
        e.preventDefault();
        setActiveItem(e.target.getAttribute('name'))
        setCurrenciesData({
            ...currenciesData,
            active: e.target.getAttribute('name'),
        })
    }
    return (
        <Form className = {'drop-down__form'}>
                <SelectCurrency
                className={'select__drop-down'}                
                value={activeItem}
                onClick={handlerChangeDropDown}
                options={listItems}
                placeholder={activeItem}
              />

        </Form>
    )
}

export default DropDownList;

