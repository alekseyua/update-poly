import React, { useEffect, useState } from 'react';
import { defaultImageCard } from '../../../images/index';
import ContainerProductCards from '../../../Views/ContainerProductCards';
import ProductsInStockLayout from './ProductsInStockLayout';
import SpinnerWrapper from '../../../Views/SpinnerWrapper/SpinnerWrapper';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';
import AsyncComponent from '../../../helpers/asyncComponent';
const ProductCardAsync = AsyncComponent(() => import ('../../../Views/ProductCard'));



// import Settings from '../../#lifehack/Settings/Settings';

// const apiContent = api.contentApi;
const ProductsInStock = ({
  profile,
  products,
  catalog_url,
  in_stock_product_filters = [],
  front_admin,
}) => {

  // console.log('products', products)

  return (
    <ContainerProductCards.ContainerCard>
      <ProductsInStockLayout
            // activePage={activePage}
            // initialFilters={filterParams}
            // loadData={loadData}
            filterList={in_stock_product_filters}
            // setFilterList={setFilterList}

            catalog_url={catalog_url}
          >

              {/* { front_admin ? <Settings nameComponent = {'ProductsInStock'} /> : null } */}
            { products.length === 0 ? (
              <SpinnerWrapper>
                <Spinner className="spiner" />
              </SpinnerWrapper>
            ) : (
              
              products.map((el, key) => {
                return (
                  <ProductCardAsync 
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
                  />
                );
              })
            )}
          </ProductsInStockLayout>
    </ContainerProductCards.ContainerCard>
  )
  // const { currenssies } = useStoreon('currenssies'); //currenssies
  // const { updateCurrenssies } = useStoreon('updateCurrenssies');
  // const [filterList, setFilterList] = useState(in_stock_product_filters);
  // const [initialFilters, setInitialFilters] = useState({
  //   page_size: 12,
  //   is_in_stock: true,
  //   categories: in_stock_product_filters[0] ? in_stock_product_filters[0].id : null,
  // });
  // const defaultImages = [defaultImageCard];

  // useEffect(() => {
  //   if (in_stock_product_filters.length) {
  //     in_stock_product_filters.map((el) => {
  //       if (el.active) {
  //         setInitialFilters({
  //           ...initialFilters,
  //           categories: el.id,
  //         });
  //       }
  //     });
  //   }
  // }, []);
};

export default React.memo(ProductsInStock);
