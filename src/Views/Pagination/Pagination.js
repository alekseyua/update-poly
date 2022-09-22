import React, { useEffect, useState } from "react";
import style from './pagination.module.scss';
/**
 * 
 * @param {
 *  @allCount - всего элементов
 *  @searchCount - количество совподений при поиске
 *  @count - max количество которое показывается или приходит по запросу
 *  @location - ореинтация на странице 'left', 'right', 'center'
 *  @handlerChange - функция запроса куда бегаем за данными
 * } = props
 * @returns 
 */
const Pagination = (props) => {
    // console.log('props =', props)
    const [activeStyle, setActiveStyle] = useState('pagination__item-active');
    const [dinamicLocation, setDinamicLocation] = useState('center');
    const [elItems, setElItems] = useState(null)
    const { allCount, count, handlerChange, searchCount = 0 } = props;
    let pages = Math.ceil((!!searchCount ? searchCount : allCount) / count);
    const listNumber = new Array(pages).fill('').map((_, i) => i + 1);


    useEffect(() => {
        setElItems(1);
        switch (props.location) {
            case 'left':
                setDinamicLocation('start');
                break;
            case 'right':
                setDinamicLocation('end')
                break;
            default:
                setDinamicLocation('center')
        }
    }, [])

    useEffect(() => {
        // console.log('searchCount', searchCount)
        if (searchCount > 0)
            pages = Math.ceil(searchCount / count);
    }, [searchCount])

    const handlerClickItem = (e) => {
        const dataId = +e.target.getAttribute('dataid');
        setElItems(dataId);
        setActiveStyle('pagination__item-active');
        handlerChange(dataId)
    }

    // console.log('listNumber', listNumber)
    return (
        <div
            className={style['pagination__container']}
            style={{ justifyContent: dinamicLocation }}
        >
            {
                listNumber.map(el => {
                    return (
                        pages > 1 ?
                            <span
                                key={el}
                                dataId={el}
                                className={
                                    elItems === el ?
                                        style[activeStyle]
                                        : style['pagination__item']
                                }
                                onClick={handlerClickItem}
                            >
                                {el}
                            </span>
                            : null
                    )
                })
            }
        </div>
    )
}

export default Pagination;