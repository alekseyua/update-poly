import React from 'react';
import AsyncComponent from '../../../helpers/asyncComponent';
import Button from '../../../Views/Button';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import BlockSearch from '../DetaliPage/BlockSearch';
import Block from '../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Pagination from '../../../Views/Pagination';
import Text from '../../../helpers/Text';

const AsyncProductCard = AsyncComponent(() => {
    return import('../../../Views/ProductCard');
});

const SearchPageLayout = ({
    handlerChangePaginations,
    currentPage,
    showMore,
    textSearchStore,
    gotoPrevPage,
    breadcrumbs,
    currency,
    search,
    role,
}) => {


    if (!!!Object.keys(search).length) {

        return (
            <React.Fragment>
                <Block.Container>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <BlockSearch.Container>
                        <BlockSearch.HeaderOfSearch
                            text={'По данному запросу ничего не найдено'}
                        />
                        <Button onClick={gotoPrevPage} variant={'catalog-link-uppercase'}>
                            {'<'} назад к разделу
                        </Button>
                    </BlockSearch.Container>
                </Block.Container>
            </React.Fragment>
        )
    }

    return (

        <React.Fragment>
            <Block.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <BlockSearch.Container>
                    <BlockSearch.HeaderOfSearch
                        text={`Показан результат для "${textSearchStore}"`}
                    />
                    
                </BlockSearch.Container>
                <BlockSearch.SearchWrapper>
                    {
                        search.results.map((el) => {
                            return (
                                <AsyncProductCard
                                    role={role}
                                    key={`${el.title}-${el.id}`}
                                    title={el.title}
                                    id={el.id}
                                    url={el.url}
                                    brand={el.brand}
                                    prices={el.prices}
                                    stock={el.stock}
                                    colors={el.colors}
                                    sizes={el.sizes}
                                    images={el.images}
                                    isSales={el.isSales}
                                    isNew={el.isNew}
                                    isHit={el.isHit}
                                    is_liked={el.is_liked}
                                    product_rc={el.product_rc}
                                    article={el.article}
                                    currency={currency}
                                />
                            );
                        })
                    }
                    <BlockSearch.Container>
                        {
                            search?.results.length && currentPage * 30 < search?.count ?
                                <Button full onClick={showMore} variant={'show_more'}>
                                    <Text text={'show.more'} />
                                </Button>
                                : null
                        }

                        {
                            !!search?.results.length ?
                                <Pagination
                                    location={'center'}
                                    count={30}
                                    allCount={search?.count}
                                    currentPage={currentPage ?? 1}
                                    handlerChangePaginations={handlerChangePaginations}
                                /> : null
                        }
                    </BlockSearch.Container>
                </BlockSearch.SearchWrapper>
            </Block.Container>
        </React.Fragment>
    )
}

export default SearchPageLayout;