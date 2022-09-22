import React, { useEffect, useState } from 'react';
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
        <form className={style['drop-down__form']}>
            <select className={style['drop-down__select']} value={activeItem} onChange={handlerChangeDropDown}>
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

        </form>
    )
}

export default DropDownList;

