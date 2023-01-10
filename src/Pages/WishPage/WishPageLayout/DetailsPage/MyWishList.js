import React from 'react';
import AsyncComponent from '../../../../helpers/asyncComponent';
import Text from '../../../../helpers/Text';
import Pagination from '../../../../Views/Pagination';
import Title from '../../../../Views/Title';
import CountProduct from './CountProduct';
import LayoutProduct from './LayoutProduct';
import BlockSpinner from '../../../../Views/SpinnerWrapper';
import DefaultWishPagePreview from '../DefaultWishPagePreview';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
const AsyncProductCard = AsyncComponent(() => {
    return import('../../../../Views/ProductCard/ProductCardContainer');
})

const MyWishList = ({
    list_wishes,
    isLoading,
    currency,
    breadcrumbs,
    recomendetProducts,
    changePaginationsWishList,
}) => {
    return (
        <React.Fragment>
            {
                isLoading ?
                    !!list_wishes.results?.length ?
                        <React.Fragment>
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                            <Title variant={'wishlist'} type={'h1'}>
                                <Text text={'favorits.product'} />
                            </Title>
                            <CountProduct>
                                {
                                    list_wishes.count
                                }
                                {
                                    Text({ text: 'goods' })
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
                                                currency={currency}
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
                        : <DefaultWishPagePreview
                            recomendetProducts={recomendetProducts}
                            breadcrumbs={breadcrumbs}
                            currency={currency}
                        />
                    : <BlockSpinner.SpinnerWrapper>
                        <BlockSpinner.Spinner />
                    </BlockSpinner.SpinnerWrapper>
            }
        </React.Fragment>
    )
}

export default MyWishList;