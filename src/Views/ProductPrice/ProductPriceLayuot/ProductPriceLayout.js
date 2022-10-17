import style from './productPrice.module.scss';

const ProductPriceLayout = ({ price, oldPrice, currency }) => {
  return (
    <p className={style['product-price']}>
      <span className={style['product-price__price']}>
        {price} {currency}
      </span>
      {oldPrice ? (
        <del className={style['product-price__prev-price']}>
          {oldPrice} {currency}
        </del>
      ) : null}
    </p>
  );
};
export default React.memo(ProductPriceLayout);
