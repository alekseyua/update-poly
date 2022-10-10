import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import CheckBox from '../CheckBox';
import style from './styles/index.module.scss';

const Item = ({
  isRead,
  date = '16 дек, 14:15',
  message = 'Проверка соблюдения условий',
  selectItemsNotice = [],
  setAllCheckEnableChange,
  allCheckEnableChange,
  heandlerCheckNotice,
  el,
}) => {
  const { id } = el;

  //добавляем элемент в массив при select=true
  const getArrayNotificationAdd = (items, inputvalue) => {
    let res = []
    if (inputvalue) items.push(inputvalue)
    return res = items.reduce((acc, item) => {
      if (acc.indexOf(item) !== -1) return acc
      acc.push(item)
      return acc
    }, [])
  }
    // удаление из массива элемента при select=false
    const getArrayNotificationDel = (items, inputvalue) => {
      let res = [];
     return res = items.reduce((acc, item) => {
        console.log('item:', item)
        if (inputvalue === item) return acc
        acc.push(item)
        return acc
      }, [])
    }
    
    return (
      <div className={style['cabinet-notifications__item']}>
        <div className={style['cabinet-notifications__item-wrapper']}>
          <CheckBox
            id={id}
            className = {style['cabinet-notifications__item-cheked']}
            onChange={(e) => {
              console.log({ e_checked_notice: e }, {id: e.id})
              const value = e.id;
              heandlerCheckNotice(value)
              // if (!select) {
              //   setAllCheckEnableChange(getArrayNotificationAdd(allCheckEnableChange, value))
              //   setSelect(!select)
              // } else {
              //   setAllCheckEnableChange(getArrayNotificationDel(allCheckEnableChange, value))
              //   setSelect(!select)
              // }
            }
            }
            variant="input"
            checked={selectItemsNotice.includes(id)}
          />
          <span
            className={classNames({
              [style['cabinet-notifications__item-mark']]: true,
              [style['cabinet-notifications__item-mark--unread']]: !isRead,
            })}
          ></span>

          <div className={style['cabinet-notifications__item-context']} dangerouslySetInnerHTML={{ __html: message }}></div>

        </div>
        <span className={style['cabinet-notifications__item-date']}>{date}</span>
      </div>
    );
  };

 export default React.memo(Item);
