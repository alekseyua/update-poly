import React, { useState, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { defaultProductCard } from '../../../images';
import ProductDetails from './ProductDetails';

const ProductDetailsContainer = ({
    context,
    ...props
}) => {
    const { dispatch } = useStoreon();
    console.log('props product details = ', context)
    const {
        recommended_price,
        reviews_statistic,
        reviews_count,
        recommended,
        breadcrumbs,
        currency,
        reviews,
        youAlredyWatch,
    } = context;

    const {
        in_stock_count,
        in_cart_count,
        is_bestseller,
        is_collection,
        collections,
        is_closeout,
        is_in_stock,
        product_rc,
        minimum_rc,
        is_liked,
        article,
        content,
        is_new,
        prices,
        colors,
        sizes,
        media,
        brand,
        title,
        extra,
        id,
        
    } = context.productDetails;

    const { role, status } = context.profile;
    const { dataReviewProductCount = null, product_reviews, pageReviewProduct = null } = reviews;
    const profileId = context.profile?.id;

    const handleChooseProduct = (productId, colorId, sizeId) => {
        const params = {
                productId:productId,
                color: colorId,
                size: sizeId,
                collection: null,
        }
        dispatch('getProductDetails', params)
    }

    const handlerOpenListCollection = (collections, title) => {
        console.log('необходимо реализовать решение для отображения попапа со сборами')
        dispatch('openModalCollections', {
            collections, 
            title
        })
    }

    const addLikeProductCard = (id) => {

        console.log('addWishList = ', id,
        {a: location.pathname}
        )
        dispatch('addWishList', { id: id, pathname: location.pathname})
    }

    const removeLikeProductCard = (id) => {
        console.log('removeWishList = ', id)
        dispatch('removeWishList', { id: id, pathname: location.pathname })
    }

    return (
        <ProductDetails
            dataReviewProductCount={dataReviewProductCount}
            defaultProductCard={defaultProductCard}
            pageReviewProduct={pageReviewProduct}
            recommended_price={recommended_price}
            reviews_statistic={reviews_statistic}
            product_reviews={product_reviews}
            in_stock_count={in_stock_count}
            youAlredyWatch={youAlredyWatch}
            product_rcAmount={minimum_rc}
            is_bestseller={is_bestseller}
            in_cart_count={in_cart_count}
            is_collection={is_collection}
            reviews_count={reviews_count}
            breadcrumbs={breadcrumbs}
            is_closeout={is_closeout}
            is_in_stock={is_in_stock}
            collections={collections}
            recommended={recommended}
            product_rc={product_rc}
            profileId={profileId}
            is_liked = { is_liked }
            currency={currency}
            article={article}
            content={content}
            colors={colors}
            status={status}
            is_new={is_new}
            prices={prices}
            productId={id}
            sizes={sizes}
            media={media}
            brand={brand}
            title={title}
            extra={extra}
            role={role}
            // url={url}
            handleChooseProduct={handleChooseProduct}
            handlerOpenListCollection={handlerOpenListCollection}
            addLikeProductCard = { addLikeProductCard }
            removeLikeProductCard = { removeLikeProductCard }
        />
    )
}

export default ProductDetailsContainer