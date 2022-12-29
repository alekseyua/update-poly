import React from 'react';
import classNames from 'classnames';
import CheckBox from '../CheckBox';
import style from './styles/index.module.scss';

const Item = ({
  isRead,
  date = '16 дек, 14:15',
  message = 'Проверка соблюдения условий',
  selectItemsNotice = [],
  heandlerCheckNotice,
  el,
}) => {

  const { id } = el;

  return (
    <div className={style['cabinet-notifications__item']}>
      <div className={style['cabinet-notifications__item-wrapper']}>
        <CheckBox
          id={id}
          className={style['cabinet-notifications__item-cheked']}
          onChange={(e) => {
            const value = e.id;
            heandlerCheckNotice(value)
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
