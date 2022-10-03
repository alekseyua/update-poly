import React from 'react';
import { Link } from 'react-router-dom';

import style from './styles/index.module.scss';


/**
 * 
 * @param {
 * 
 * breadcrumbs: [] - массив хлебных крошек
 * } param0 
 * @returns 
 */

const BreadCrumbs = ({ breadcrumbs = [] }) => {

  return (
    <div className={style['breadcrumbs-wrapper']}>
      {
        breadcrumbs.map((el, i) => {
          return (
            <React.Fragment key={i}>
              <Link className={style['breadcrumbs-wrapper__link']} to={el.slug === "" ? "/" : `/${el.slug}`}>
                {el.title}
              </Link>
              {breadcrumbs.length - 1 !== i ? (
                <span className={style['breadcrumbs-wrapper__arrow']}>{'>'}</span>
              ) : null}
            </React.Fragment>
          );
        })
      }
    </div>
  );
};

export default BreadCrumbs;
