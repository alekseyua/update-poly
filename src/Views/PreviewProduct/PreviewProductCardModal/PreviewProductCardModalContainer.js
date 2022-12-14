import React from "react";
import PreviewProductCardModal from "./PreviewProductCardModal";
import { defaultProductCard } from '../../../images';
import { useStoreon } from 'storeon/react';
import { useLocation, useNavigate } from "react-router-dom";

const PreviewProductCardModalContainer = ({
    url,
    productId,
    profileId,
    adding_type,
    breadcrumbs,
    reviews_statistic,
    reviewsCount,
    title,
    brand,
    prices,
    recommended_price,
    colors,
    sizes,
    review,
    in_stock_count,
    is_new,
    is_bestseller,
    is_in_stock,
    is_closeout,
    role_configuration,
    is_liked,
    media,
    in_cart_count,
    site_configuration,
    is_collection,
    product_rc,
    article,
    product_rcAmount,
    product_sku,
    role,
    collections,
    currency,
    status,
}) => {
    const { dispatch } = useStoreon();
    const navigate = useNavigate();
    const location = useLocation();
    const handleChooseProduct = (productId, color, size) => {

        /**
         * @param {
         *  productId - номер товара,
         *  color - приходит или массив цветов из которого нам необходимо вытянуть активный id или id цветовая
         *  size - приходит или массив размеров из которого нам необходимо вытянуть активный id или id размерами         * 
         * } 
         * @return
         */

        dispatch('quickViewProduct', {
            id: productId,
            color: color,
            size: size,
        })
    }
    
    const handlerOpenListCollection = (collections, title) => {
       return dispatch('openInfoCollection',{
            collections: collections,
            title: title
        })
    }

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
 
    return (
        <PreviewProductCardModal
            defaultProductCard={defaultProductCard}
            recommended_price={recommended_price}
            product_rcAmount={product_rcAmount}
            in_stock_count={in_stock_count}
            in_cart_count={in_cart_count}
            is_bestseller={is_bestseller}
            is_closeout={is_closeout}
            is_in_stock={is_in_stock}
            productId = { productId }
            currency={currency}
            product_rc={product_rc}
            is_liked = { is_liked }
            is_new={is_new}
            prices={prices}
            colors={colors}
            sizes={sizes}
            media={media}
            brand={brand}
            title={title}
            role={role}
            status={status}
            collections={collections}
            is_collection={is_collection}
            url = { url }

            handlerOpenListCollection={handlerOpenListCollection}
            handleChooseProduct={handleChooseProduct}
            addLikeProductCard = { addLikeProductCard }
            removeLikeProductCard = { removeLikeProductCard }
        />
    )
}

export default PreviewProductCardModalContainer;