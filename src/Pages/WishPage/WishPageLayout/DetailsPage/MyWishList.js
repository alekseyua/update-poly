import React from 'react';
import AsyncComponent from '../../../../helpers/asyncComponent';
import Text from '../../../../helpers/Text';
import Pagination from '../../../../Views/Pagination';
import Title from '../../../../Views/Title';
import CountProduct from './CountProduct';
import LayoutProduct from './LayoutProduct';
import BlockSpinner from '../../../../Views/SpinnerWrapper';
const AsyncProductCard = AsyncComponent(() => {
    return import('../../../../Views/ProductCard/ProductCardContainer');
})

const MyWishList = ({
    list_wishes,
    currency,
    
    changePaginationsWishList,
}) => {

    return (
        <React.Fragment>
            <Title variant={'wishlist'} type={'h1'}>
                <Text text={'favorits.product'} />
            </Title>
            {
                list_wishes.results ?
                    <React.Fragment>
                        <CountProduct>
                            {
                                list_wishes.count} {Text({ text: 'goods' })
                            }
                        </CountProduct>
                        <LayoutProduct>
                            {
                                list_wishes.results.map((el) => {
                                    const data = el.product ? el.product : el;
                                    return (
                                        <AsyncProductCard
                                            {...data}
                                            url={data.url}
                                            key={data.id}
                                            title={data.title}
                                            id={data.id}
                                            brand={data.brand}
                                            is_liked={data.is_liked}
                                            currency  = { currency }
                                            prices={data.prices}
                                            stock={data.stock}
                                            colors={data.colors}
                                            images={data.images}
                                            isSales={data.is_closeout}
                                            isNew={data.is_new}
                                            isHit={data.is_bestseller}
                                            sizes={data.sizes}
                                            product_rc={data.product_rc}
                                            profile={data.profile}
                                        />
                                    );
                                })
                            }
                        </LayoutProduct>
                        <Pagination
                            allCount={list_wishes.count}
                            count={30}
                            handlerChangePaginations={changePaginationsWishList}
                        />
                    </React.Fragment>
                    : <BlockSpinner.SpinnerWrapper>
                        <BlockSpinner.SpinnerCenter>
                            <BlockSpinner.Spinner />
                        </BlockSpinner.SpinnerCenter>
                    </BlockSpinner.SpinnerWrapper>
            }
        </React.Fragment>
    )
}

export default MyWishList;