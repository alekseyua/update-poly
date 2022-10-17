import React from 'react';
import { Link } from 'react-router-dom';
import ProductPrice from '../../../ProductPrice/ProductPrice';
import style from './searchresult.module.scss';

const SearchResult = (props) => {
    const { title, images, prices, id, url, article, currency } = props;
      
    return (
      <Link className={style['search-result']} name={'product-price1'} to={url}>
        <div className={style['search-result__info']} name={'product-price2'} >
          <h4 className={style['search-result__title']} name={'product-price'} >{title} {article}</h4>
          <ProductPrice price={prices.price} currency={currency} />
        </div>
        <div className={style['search-result__images']} name={'product-price3'} >
          <img className={style['search-result__preview']} src={images[0]} />
          <span className={'_icon-arrowRightCatalog'} ></span>
        </div>
      </Link> 
    );
  };
  export default React.memo(SearchResult);