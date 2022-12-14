import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { defaultProductCard } from '../../../images';
import ProductDetails from './ProductDetails';

const ProductDetailsContainer = ({
    context,
    ...props
}) => {
    const { dispatch } = useStoreon();
    const {
        role_configuration,
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
        review,
        prices,
        colors,
        sizes,
        media,
        brand,
        title,
        extra,
        id,

    } = context.productDetails;

    const location = useLocation();
    const navigate = useNavigate();
    const { role, status} = context.profile;
    const { dataReviewProductCount = null, product_reviews, pageReviewProduct = null } = reviews;
    const countRaiting = review.all_count;
    const allCountPercent = review.all_count_percent;

    const profileId = context.profile?.id;
    const { delivery_condition } = role_configuration;
    const handleChooseProduct = (productId, colorId, sizeId) => {
        const params = {
            productId: productId,
            color: colorId,
            size: sizeId,
            collection: null,
        }
        dispatch('getProductDetails', params)
    }

    const handlerOpenListCollection = (collections, title) => {
        dispatch('openModalCollections', {
            collections,
            title
        })
    }

    const addLikeProductCard = (id) => {
        const params = { 
            id: id, 
            whereLike: 'detail-product',
            pathname: location.pathname,        
            redirectTo: (path) => {
                const timerTimeout = setTimeout(() => {
                navigate(path);
                return () => clearTimeout(timerTimeout);
                }, 500)
            }
        }
        dispatch('addWishList', params)
    }

    const removeLikeProductCard = (id) => {
        const params = { 
            id: id, 
            whereLike: 'detail-product',
            pathname: location.pathname,        
            redirectTo: (path) => {
                const timerTimeout = setTimeout(() => {
                navigate(path);
                return () => clearTimeout(timerTimeout);
                }, 500)
            }
        }
        dispatch('removeWishList', params)
    }

    const openTableSize = () => {
        dispatch('openModalTableSize')
    }

    return (
        <ProductDetails
            dataReviewProductCount={dataReviewProductCount}
            delivery_condition={delivery_condition}
            defaultProductCard={defaultProductCard}
            allCountPercent={allCountPercent}
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
            countRaiting={countRaiting}
            breadcrumbs={breadcrumbs}
            is_closeout={is_closeout}
            is_in_stock={is_in_stock}
            collections={collections}
            recommended={recommended}
            product_rc={product_rc}
            profileId={profileId}
            is_liked={is_liked}
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
            addLikeProductCard={addLikeProductCard}
            removeLikeProductCard={removeLikeProductCard}
            openTableSize={openTableSize}
        />
    )
}

export default ProductDetailsContainer