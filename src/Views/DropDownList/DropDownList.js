import React, { useState } from 'react';
import Form from '../Form';
import Select from '../Select';
import style from './dropdownlist.module.scss';

const DropDownList = ({ listItems, active, currenciesData, setCurrenciesData }) => {
    const [activeItem, setActiveItem] = useState(active);
    const handlerChangeDropDown = (e) => {
        e.preventDefault();
        setActiveItem(e.target.value)
        setCurrenciesData({
            ...currenciesData,
            active: e.target.value,
        })
    }

    return (
        <Form className={style['drop-down__form']}>
            <select 
                className={style['drop-down__select']} 
                value={activeItem} 
                onChange={handlerChangeDropDown}
            >
                {
                    listItems.map((el, i) => {
                        return (
                            <option
                                key={`list-drop-down-currencies-${i}`}
                                value={el.value}
                            >
                                {el.name}
                            </option>
                        )
                    })
                }
            </select>
                {/* <Select
                className={'drop-down__select'}                
                value={activeItem}
                onClick={handlerChangeDropDown}
                options={listItems}
                placeholder={activeItem}
              /> */}
        </Form>
    )
}

export default DropDownList;

