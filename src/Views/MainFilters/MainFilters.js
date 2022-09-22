import React from 'react';
import style from './mainFilters.module.scss';
import Button from '../Button';
import classNames from 'classnames';
import SpinnerWrapper from '../SpinnerWrapper/SpinnerWrapper';
import Spinner from '../SpinnerWrapper/Spinner';

const MainFilters = ({ filters = [], ...props }) => {

  return (
    <div className={style['main-filters']}>
      <div className={'main-filters__container'}>
        <div className={style['main-filters__wrap']}>
          <ul className={style['main-filters__list']}>
            {
              !filters.length ?
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
                : filters.map((el, key) => {
                  return (
                    <li
                      className={style['main-filters__item']}
                      key={el.id}
                    >
                      <Button
                        onClick={(e) => {
                          // setFilters(el.id);
                        }}
                        variant={el.active ? 'tab_active' : 'tab'}
                      >
                        {el.title}
                      </Button>
                    </li>
                  );
                })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainFilters);
