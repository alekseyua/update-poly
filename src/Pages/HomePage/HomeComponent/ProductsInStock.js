import React from 'react';
import ContainerProductCards from '../../../Views/ContainerProductCards';
import ProductsInStockLayoutContainer from './ProductsInStockLayout/ProductsInStockLayoutContainer';
import SpinnerWrapper from '../../../Views/SpinnerWrapper/SpinnerWrapper';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';
import AsyncComponent from '../../../helpers/asyncComponent';
const ProductCardAsync = AsyncComponent(() => import ('../../../Views/ProductCard'));


const ProductsInStock = ({
  profile,
  products,
  catalog_url,
  in_stock_product_filters = [],
  front_admin,
  currency,
  role,
}) => {

  // console.log('products', products)

  return (
    <ContainerProductCards.ContainerCard>
      <ProductsInStockLayoutContainer
            filterList = { in_stock_product_filters }
            catalog_url = { catalog_url }
          >

              {/* { front_admin ? <Settings nameComponent = {'ProductsInStock'} /> : null } */}
            { !products.length? (
              <SpinnerWrapper>
                <Spinner className="spiner" />
              </SpinnerWrapper>
            ) : (
              
              products.map((el, key) => {
                return (
                  <ProductCardAsync 
                    role={role}
                    key={el.id}
                    url={el.url}
                    id={el.id}
                    title={el.title}
                    brand={el.brand}
                    prices={el.prices}
                    stock={el.stock}
                    images={el.images.length ? el.images : defaultImages}
                    colors={el.colors}
                    isSales={el.isSales}
                    isNew={el.isNew}
                    isHit={el.isHit}
                    favorite={el.favorite}
                    sizes={el.sizes}
                    product_rc={el.product_rc}
                    currency = { currency }
                  />
                );
              })
            )}
          </ProductsInStockLayoutContainer>
    </ContainerProductCards.ContainerCard>
  )
};

export default React.memo(ProductsInStock);
