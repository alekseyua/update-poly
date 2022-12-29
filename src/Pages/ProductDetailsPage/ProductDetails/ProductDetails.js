import React from 'react';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import BlockGrid from '../../../Views/GridContainerBlock';
import AsyncComponent from '../../../helpers/asyncComponent';
import ProductDetailsViews from '../../../Views/ProductDetailsViews';
import Text from '../../../helpers/Text';
import { ROLE } from "../../../const";
import Raiting from '../../../Views/Raiting';
import Title from '../../../Views/Title';

const AsyncLabels = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/Labels/Labels');
});
const AsyncPricesContainer = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/PricesContainer/PricesContainer');
});
const AsyncColorsButton = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/ColorsItems/ColorsItems');
});
const AsyncSizesButton = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/SizesItems/SizesItems');
});
const AsyncBuyoutCondition = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/BuyoutCondition/BuyoutCondition');
});
const AsyncInfoOpenCollection = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/InfoOpenCollection/InfoOpenCollection');
});
const AsyncControlButtons = AsyncComponent(() => {
    return import('../../../Views/ProductDetailsViews/ControlButtons/ControlButtonsContainer.js');
});

const AsyncPreviewSlider = AsyncComponent(() => {
    return import('../../../Views/PreviewProduct/PreviewSlider/PreviewSliderContainer');
})

const AsyncReviewsBlock = AsyncComponent(() => {
    return import('../../../Views/ReviewsBlock/ReviewsContainer');
})

const AsyncRecomendetProduct = AsyncComponent(() => {
    return import('../../../Views/RecomendetProduct/RecomendentProductContainer');
});

const AsyncYouHaveAlreadyWatched = AsyncComponent(() => {
    return import('../../../Views/YouHaveAlreadyWatched/YouHaveAlreadyWatchedContainer.js');
});

const AsyncSectionRaitingAndSharingAndMyWish = AsyncComponent(() => import('../../../Views/ProductDetailsViews/SectionRaitingAndSharingAndMyWish/SectionRaitingAndSharingAndMyWish'))

import SceletonBlock from '../../../Views/SceletonBlock';

import style from '../../../Views/PreviewProduct/PreviewProductCardModal/styles/previewproduct.module.scss';
import SectionDescription from '../../../Views/ProductDetailsViews/SectionDescription/SectionDescription';
import { hanger } from '../../../images';
import Button from '../../../Views/Button';
import Icon from '../../../Views/Icon';

const ProductDetails = ({
    defaultProductCard,
    dataReviewProductCount,
    delivery_condition,
    pageReviewProduct,
    recommended_price,
    allCountPercent,
    reviews_statistic,
    product_rcAmount,
    product_reviews,
    youAlredyWatch,
    in_stock_count,
    in_cart_count,
    is_bestseller,
    is_collection,
    reviews_count,
    countRaiting,
    recommended,
    is_closeout,
    breadcrumbs,
    is_in_stock,
    collections,
    product_rc,
    profileId,
    productId,
    currency,
    is_new,
    prices,
    colors,
    sizes,
    media,
    brand,
    title,
    role,
    status,
    article,
    content,
    extra,
    url,
    is_liked,

    handleChooseProduct,
    handlerOpenListCollection,
    addLikeProductCard,
    removeLikeProductCard,
    openTableSize,
}) => {


    return (

        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div
                    className={style['preview-product-modal__body']}
                >
                    <div
                        className={style['preview-product-modal__left']}
                    >
                        <AsyncPreviewSlider
                            defaultImage={defaultProductCard}
                            imageOrVideoSet={media}
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
                                allCountPercent={allCountPercent}
                                countRaiting={countRaiting}
                                is_liked={is_liked}
                                title={title}
                                value={0}
                                label={Text({ text: 'reviews-es' })}
                                max={5}
                                productId = { productId }
                                addLikeProductCard={addLikeProductCard}
                                removeLikeProductCard={removeLikeProductCard}
                            />
                        </BlockGrid.Row>
                        <BlockGrid.Row // ? 2 информационный ряд Brand
                            className={style['preview-product-modal__row']}
                        >
                            {
                                !!brand && (role !== ROLE.RETAIL && role !== ROLE.UNREGISTRED) ?
                                    <ProductDetailsViews.BrandName name={brand} />
                                    : null
                            }
                        </BlockGrid.Row>
                        <BlockGrid.Row // ? 3 информационный ряд Title
                            className={style['preview-product-modal__row']}
                        >

                            {!!title && title !== 'title' ? (
                                <Title variant={'prodpage__title'} type={'h1'}>
                                    {title}
                                </Title>
                            ) : (
                                <SceletonBlock />
                            )}
                        </BlockGrid.Row>
                        <BlockGrid.Row  // ? 4 информационный ряд is_now, is_besceler, is_istock ...
                            className={style['preview-product-modal__row']}
                        >
                            <AsyncLabels
                                is_in_stock={is_in_stock}
                                is_bestseller={is_bestseller}
                                is_new={is_new}
                                is_closeout={is_closeout}
                            />
                        </BlockGrid.Row>
                        <BlockGrid.Row  // ? 5 информационный ряд стоимость товара
                            className={style['preview-product-modal__row']}
                        >
                            <AsyncPricesContainer
                                prices={prices}
                                in_cart_count={in_cart_count}
                                currency={currency}
                                recommended_price={recommended_price}
                                role={role}
                            />
                        </BlockGrid.Row>
                        <BlockGrid.Row  // ? 6 информационный ряд цветовая разкраска товара
                            className={style['preview-product-modal__row']}
                        >
                            <AsyncColorsButton
                                handleChooseProduct={handleChooseProduct}
                                productId={productId}
                                colors={colors}
                                sizes={sizes}
                            />
                        </BlockGrid.Row>
                        <BlockGrid.Row  // ? 6 информационный ряд цветовая разкраска товара
                            className={style['preview-product-modal__row']}
                        >
                            <Button
                                className=""
                                variant="text"
                                onClick={openTableSize}
                                addClass = {'prodpage-sizes__btn'}
                            >
                                <Icon slot="icon-left" src={hanger} className="prodpage-sizes__icon" width={20} height={20} />
                                Таблица размеров
                            </Button>
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
                                in_stock_count={in_stock_count}
                                is_collection={is_collection}
                                in_cart_count={in_cart_count}
                                is_in_stock={is_in_stock}
                                productId={productId}
                                role={role}
                                url={url}
                            />
                        </BlockGrid.Row>

                        <BlockGrid.Row  // ? 10 информационный ряд c кнопками добавления и перехода к товару
                            className={style['preview-product-modal__row']}
                        >
                            <ProductDetailsViews.DeliveryInfo
                                role={role}
                                description={delivery_condition}
                            />
                        </BlockGrid.Row>

                    </div>
                </div>
                <BlockGrid.Row  // ? 12 информационный ряд c описанием товара
                    className={style['preview-product-modal__row']}
                >
                    {
                        content || extra ? (
                            <SectionDescription content={content} extra={extra} article={article} />
                        ) : null
                    }
                </BlockGrid.Row>

                <BlockGrid.Row  // ? 13 информационный ряд c отзывами о товаре
                    className={style['preview-product-modal__row']}
                >
                    <AsyncReviewsBlock
                        dataReviewProductCount={dataReviewProductCount}
                        pageReviewProduct={pageReviewProduct}
                        reviews_statistic={reviews_statistic}
                        product_reviews={product_reviews}
                        reviews_count={reviews_count}
                        profileId={profileId}
                        productId={productId}
                    />
                </BlockGrid.Row>

                <BlockGrid.Row  // ? 14 информационный ряд Рекомендуемое
                    className={style['preview-product-modal__row']}
                >
                    <AsyncRecomendetProduct
                        recommended={recommended}
                        currency={currency}
                    // setCardIdproductFromSlider={setCardIdproductFromSlider}
                    />

                </BlockGrid.Row>

                <BlockGrid.Row  // ? 15 информационный ряд Вы уже смотрели
                    className={style['preview-product-modal__row']}
                >
                    <AsyncYouHaveAlreadyWatched
                        youAlredyWatch={youAlredyWatch}
                        currency={currency}
                    />
                </BlockGrid.Row>

            </BlockGrid.Container>
        </React.Fragment>

    )
}

export default ProductDetails;