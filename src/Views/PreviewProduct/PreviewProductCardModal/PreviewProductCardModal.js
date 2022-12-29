import AsyncComponent from "../../../helpers/asyncComponent";
import ProductDetailsViews from '../../ProductDetailsViews';
import BlockGrid from '../../GridContainerBlock';
import Text from '../../../helpers/Text';
import { ROLE } from "../../../const";
import Raiting from '../../Raiting';
import Title from '../../Title';
import React from "react";

const AsyncLabels = AsyncComponent(() => {
    return import('../../ProductDetailsViews/Labels/Labels');
});
const AsyncPricesContainer = AsyncComponent(() => {
    return import('../../ProductDetailsViews/PricesContainer/PricesContainer');
});
const AsyncColorsButton = AsyncComponent(() => {
    return import('../../ProductDetailsViews/ColorsItems/ColorsItems');
});
const AsyncSizesButton = AsyncComponent(() => {
    return import('../../ProductDetailsViews/SizesItems/SizesItems');
});
const AsyncBuyoutCondition = AsyncComponent(() => {
    return import('../../ProductDetailsViews/BuyoutCondition/BuyoutCondition');
});
const AsyncInfoOpenCollection = AsyncComponent(() => {
    return import('../../ProductDetailsViews/InfoOpenCollection/InfoOpenCollection');
});
const AsyncControlButtons = AsyncComponent(() => {
    return import('../../ProductDetailsViews/ControlButtons/ControlButtonsContainer.js');
});

const AsyncPreviewSlider = AsyncComponent(()=>{
    return import ('../PreviewSlider/PreviewSliderContainer');
})

const AsyncSectionRaitingAndSharingAndMyWish = AsyncComponent(()=> import('../../../Views/ProductDetailsViews/SectionRaitingAndSharingAndMyWish/SectionRaitingAndSharingAndMyWish'))


import style from './styles/previewproduct.module.scss';
import SceletonBlock from "../../SceletonBlock";

const PreviewProductCardModal = ({
    media,
    defaultProductCard,
    productId,
    brand,
    title,
    is_new,
    is_bestseller,
    is_in_stock,
    is_closeout,
    in_cart_count,
    in_stock_count,
    recommended_price,
    prices,
    colors,
    sizes,
    currency,
    role,
    product_rc,
    product_rcAmount,
    handleChooseProduct,
    is_collection,
    collections,
    status,
    url,
    modalView = true,
    is_liked,
    
    handlerOpenListCollection,
    addLikeProductCard,
    removeLikeProductCard,
}) => {

    return (
        <BlockGrid.Container>
            <div
                className={style['preview-product-modal__body--modal']}
            >
                <div
                    className={style['preview-product-modal__left']}
                >
                    <AsyncPreviewSlider
                        defaultImage={defaultProductCard}
                        imageOrVideoSet = {media}
                    />
                </div>
                <div
                    className={style['preview-product-modal__right']}
                >
                    <BlockGrid.Row // ? 1 информационный ряд Raiting
                        className={style['preview-product-modal__row']}
                    >
                        {/* // ?! ДАННЫЕ НЕ ПРИХОДЯТ, ЖДЁМ ОТ БЭКА Raiting 
                            */}
                            
                            <AsyncSectionRaitingAndSharingAndMyWish
                                 productId = { productId }
                                 is_liked = { is_liked }
                                 title = { title }
                                 value = { 0 }
                                 label = { Text({ text: 'reviews-es' }) }
                                 max = { 5 }
                                 
                                 addLikeProductCard = { addLikeProductCard }
                                 removeLikeProductCard = { removeLikeProductCard }
                            />

                    </BlockGrid.Row>
                    <BlockGrid.Row // ? 2 информационный ряд Brand
                        className={style['preview-product-modal__row']}
                    >
                        {
                            !!brand && (role !== ROLE.RETAIL && role !== ROLE.UNREGISTRED) ?
                                <ProductDetailsViews.BrandName name = { brand } />
                                : null
                        }
                    </BlockGrid.Row>
                    <BlockGrid.Row // ? 3 информационный ряд Title
                        className={style['preview-product-modal__row']}
                    >

                        {
                            !!title && title !== 'title' ? (
                                <Title variant={'prodpage__title'} type={'h1'}>
                                    {title}
                                </Title>
                            ) : (
                                <SceletonBlock />
                            )
                        }
                    </BlockGrid.Row>
                    <BlockGrid.Row  // ? 4 информационный ряд is_now, is_besceler, is_istock ...
                        className={style['preview-product-modal__row']}
                    >
                        <AsyncLabels
                            is_bestseller = { is_bestseller }
                            is_closeout = { is_closeout }
                            is_in_stock = { is_in_stock }
                            is_new = { is_new }
                        />
                    </BlockGrid.Row>
                    <BlockGrid.Row  // ? 5 информационный ряд стоимость товара
                        className={style['preview-product-modal__row']}
                    >
                        <AsyncPricesContainer
                            recommended_price = { recommended_price }
                            in_cart_count = { in_cart_count }
                            currency = { currency }
                            prices = { prices }
                            role = { role }
                        />
                    </BlockGrid.Row>
                    <BlockGrid.Row  // ? 6 информационный ряд цветовая разкраска товара
                        className={style['preview-product-modal__row']}
                    >
                        <AsyncColorsButton
                            handleChooseProduct = { handleChooseProduct }
                            productId = { productId }
                            colors = { colors }
                            sizes = { sizes }
                        />
                    </BlockGrid.Row>
                    {
                        role === ROLE.WHOLESALE || (role === ROLE.DROPSHIPPER && is_collection) ?
                            <BlockGrid.Row  // ? 7 информационный ряд c условиями выкупа
                                className={style['preview-product-modal__row']}
                            >
                                <AsyncBuyoutCondition
                                    role={role}
                                    prices={prices}
                                    currency={currency}
                                    product_rc={product_rc}
                                    is_collection={is_collection}
                                    product_rcAmount={product_rcAmount}
                                />
                            </BlockGrid.Row>
                            : null
                    }
                    <BlockGrid.Row  // ? 8 информационный ряд c размерами товара
                        className={style['preview-product-modal__row']}
                    >
                        <AsyncSizesButton
                            handleChooseProduct={handleChooseProduct}
                            in_stock_count={in_stock_count}
                            productId={productId}
                            colors={colors}
                            sizes={sizes}
                        />
                    </BlockGrid.Row>
                    {
                        role === ROLE.DROPSHIPPER ?
                            <BlockGrid.Row  // ? 9 информационный ряд кнопка для сборов только для дроперов
                                className={style['preview-product-modal__row']}
                            >
                                <AsyncInfoOpenCollection
                                    collections={collections}
                                    status={status}
                                    handlerOpenListCollection={handlerOpenListCollection}
                                    title={title}
                                />
                            </BlockGrid.Row>
                            : null
                    }
                    <BlockGrid.Row  // ? 10 информационный ряд c кнопками добавления и перехода к товару
                        className={style['preview-product-modal__row']}
                    >
                        <AsyncControlButtons
                            in_stock_count = { in_stock_count }
                            in_cart_count = { in_cart_count }
                            is_collection = { is_collection }
                            is_in_stock = { is_in_stock }
                            modalView = { modalView }
                            productId = { productId }
                            role = { role }
                            url = { url }
                        />
                    </BlockGrid.Row>


                </div>
            </div>
        </BlockGrid.Container>
    )
}

export default PreviewProductCardModal;