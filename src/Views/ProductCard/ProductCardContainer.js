import React from "react";
import { useStoreon } from "storeon/react";
import ProductCard from './ProductCard';
import { defaultProductCard } from '../../images'
import { useLocation } from "react-router-dom";

const ProductCardContainer = ({
    key,
    title,
    id,
    url,
    brand,
    prices,
    stock,
    colors,
    sizes,
    images,
    isSales,
    isNew,
    isHit,
    is_liked,
    product_rc,
    article,
    currency,
    ...props
}) => {

    const { dispatch } = useStoreon();
    const location = useLocation();
    const defaultImageSet = [defaultProductCard];

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

    const handleQuickView = (id, url) => {

    console.log('url in function = ', url)

        const params = {
            id: id,
            url: url
        }
        dispatch('quickViewProduct', params);
    }
    return (
        <ProductCard
            id={id}
            key={key}
            url={ url }
            brand={brand}
            prices={prices}
            stock={stock}
            title={title}
            sizes={sizes}
            images={images.length ? images : defaultImageSet}
            isNew={isNew}
            isHit={isHit}
            colors={colors}
            isSales={isSales}
            is_liked={is_liked}
            article = { article }
            currency = { currency }
            product_rc = { product_rc }

            handleQuickView = { handleQuickView }
            addLikeProductCard = { addLikeProductCard }
            removeLikeProductCard = { removeLikeProductCard }
        />
    )
}

export default ProductCardContainer;