import React from 'react';
import Button from '../Button';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const Tags = ({ rubrics = [], handleFilter, activeRubrics, loadData, activePage }) => {

  return (
    <div className={style['wrapper-filters']}>
      <Button
        onClick={() => handleFilter(null)}
        className={classNames({
          [style['wrapper-filters__button']]: true,
          [style['wrapper-filters__button--active']]: !!!activeRubrics,
        })}
      >
        Все
      </Button>
      {rubrics.map((el) => {

        return (
          <Button
            key={el.id}
            onClick={() => handleFilter(el.id)}
            className={classNames({
              [style['wrapper-filters__button']]: true,
              [style['wrapper-filters__button--active']]: Number(activeRubrics) === Number(el.id),
            })}
          >
            {el.title}
          </Button>
        );
      })}
    </div>
  );
};

export default React.memo(Tags);
