import React from "react";
import { useStoreon } from "storeon/react";
import ProductCard from './ProductCard';
import { defaultProductCard } from '../../images'

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

    const defaultImageSet = [defaultProductCard];

    const addLikeProductCard = (id) => {
        dispatch('addWishList', { id: id })
    }

    const removeLikeProductCard = (id) => {
        dispatch('removeWishList', { id: id })
    }

    const handleQuickView = (id, url) => {
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