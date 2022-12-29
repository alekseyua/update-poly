import React from "react";
import { useStoreon } from "storeon/react";
import ProductCard from './ProductCard';
import { defaultProductCard } from '../../images'
import { useLocation, useNavigate } from "react-router-dom";

const ProductCardContainer = ({
    key,
    id,
    url,
    title,
    role,
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
    const navigate = useNavigate();
    const defaultImageSet = [defaultProductCard];

    const addLikeProductCard = (id) => {
        const params = { 
            id: id, 
            whereLike: 'product',
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
            whereLike: 'product',
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
            role = { role }
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