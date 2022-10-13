import React, { useEffect, useState } from "react";
import style from './pagination.module.scss';
/**
 * 
 * @param {
 *  @allCount - всего элементов
 *  @searchCount - количество совподений при поиске
 *  @count - max количество которое показывается или приходит по запросу
 *  @location - ореинтация на странице 'left', 'right', 'center'
 *  @handlerChangePaginations - функция запроса куда бегаем за данными
 * } = props
 * @returns 
 */
const Pagination = ({
    handlerChangePaginations, 
    searchCount = 0,
    allCount = 0, 
    count = 0, 
    ...props
}) => {
    // console.log('props =', props)
    const [activeStyle, setActiveStyle] = useState('pagination__item-active');
    const [dinamicLocation, setDinamicLocation] = useState('center');
    const [elItems, setElItems] = useState(null)
    const {  } = props;
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
        console.log({e: e.target.id})
        const dataId = +e.target.id;
        setElItems(dataId);
        setActiveStyle('pagination__item-active');
        handlerChangePaginations(dataId)
        const timerSetTimeout = setTimeout(()=>{
            window.scrollTo(0,0);
            return ()=>clearTimeout(timerSetTimeout)
        },900)
    }

    // console.log('listNumber', listNumber)
    return (
        <div
            className={style['pagination__container']}
            style={{ justifyContent: dinamicLocation }}
        >
            <div
                className={style['pagination__inner-container']}
            >
                {
                    listNumber.map(el => {
                        return (
                            pages > 1 ?
                                <div
                                    key={el}
                                    id={el}
                                    className={
                                        elItems === el ?
                                            style[activeStyle]
                                            : style['pagination__item']
                                    }
                                    onClick={handlerClickItem}
                                >
                                    {el}
                                </div>
                                : null
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination;