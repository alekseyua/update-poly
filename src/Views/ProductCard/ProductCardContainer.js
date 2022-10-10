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
    favorite,
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
            key={key}
            title={title}
            id={id}
            url={url}
            brand={brand}
            prices={prices}
            stock={stock}
            colors={colors}
            sizes={sizes}
            images={images.length ? images : defaultImageSet}
            isSales={isSales}
            isNew={isNew}
            isHit={isHit}
            favorite={favorite}
            product_rc={product_rc}
            article={article}
            currency={currency}
            addLikeProductCard={addLikeProductCard}
            removeLikeProductCard={removeLikeProductCard}
            handleQuickView={handleQuickView}
        />
    )
}

export default ProductCardContainer;