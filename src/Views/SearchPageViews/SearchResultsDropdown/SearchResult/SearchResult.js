import React from 'react';
import { Link } from 'react-router-dom';
import ProductPrice from '../../../ProductPrice/ProductPrice';
import style from './searchresult.module.scss';

const SearchResult = (props) => {
    const { title, images, prices, id, url, article, currenssies } = props;
      
    return (
      <Link className={style['search-result']} to={url}>
        <div className={style['search-result__info']}>
          <h4 className={style['search-result__title']}>{title} {article}</h4>
          <ProductPrice price={prices.price} currenssies={currenssies} />
        </div>
        <div className={style['search-result__images']}>
          <img className={style['search-result__preview']} src={images[0]} />
          <span className={'_icon-arrowRightCatalog'} ></span>
        </div>
      </Link> 
    );
  };
  export default React.memo(SearchResult);