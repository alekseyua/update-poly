import React from 'react';
import Title from '../Title';
const AsyncPricesContainer = AsyncComponent(() => {
    return import('../../Views/ProductDetailsViews/PricesContainer/PricesContainer');
});
const AsyncColorsButton = AsyncComponent(() => {
    return import('../../Views/ProductDetailsViews/ColorsItems/ColorsItems');
});
const AsyncSizesButton = AsyncComponent(() => {
    return import('../../Views/ProductDetailsViews/SizesItems/SizesItems');
});
import PhotoView from '../../Views/PhotoView/ViewsImage';

import style from './styles/card-collections.module.scss';
import AsyncComponent from '../../helpers/asyncComponent';


const CardCollectionView = ({
    number,
    title,
    product,
    recommended_price,
    image,
    prices,
    sizes,
    colors,
    currency,
    role,
    ...props
}) => {
    const { items } = props;
    const colorCollections = colors.filter( el => el.id === items[0].size.color_id )
    const sizeCollections = sizes.map( item =>  {
        const currentSize = items.filter( el => el.size.id === item.id );
        return {
            ...item,
            image: currentSize[0].size?.image,
            redeemed: currentSize[0].redeemed,
            selected: false
        }
    })
    const handleChooseProduct = (productId, colorId, sizeId) => {
        console.log({productId}, {colorId}, {sizeId})
    }
    console.log({props}, {sizeCollections})

    return (
        <div
            className={style['card-collections__container']}
        >
            <div
                className={style['card-collections__title-wrap']}
            >   
                <Title 
                    type= { 'h3' }
                >Сбор {number}</Title>
                <Title 
                    type= { 'h4' }
                >{title}</Title>
            </div>
            <div
                className={style['card-collections__photo-wrap']}
            >                
                <PhotoView image = { image[0].image } />
            </div>
            <div
                className={style['card-collections__recommend-wrap']}
            >
                <AsyncPricesContainer
                    recommended_price = { recommended_price }
                    currency = { currency }
                    prices = { prices }
                    role = { role }
                />
            </div>
            <div
                className={style['card-collections__colors-wrap']}
            >
                <AsyncColorsButton
                    productId = { product.id }
                    colors = { colorCollections }
                    sizes = { sizeCollections }
                />
            </div>
            <div
                className={style['card-collections__sizes-wrap']}
            >
                <AsyncSizesButton
                    handleChooseProduct={handleChooseProduct}
                    productId={product.id}
                    colors={colorCollections}
                    sizes={sizeCollections}
                />
            </div>
        </div>
    )
}

export default CardCollectionView;