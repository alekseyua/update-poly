import React from 'react';
import { Link } from 'react-router-dom';
import { ROLE } from '../../../const';
import { checkLocalStorage, getLocalStorage } from '../../../helpers/helpers';
import Text from '../../../helpers/Text';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Button from '../../../Views/Button';
import CheckBox from '../../../Views/CheckBox';
import BlockGrid from '../../../Views/GridContainerBlock';
import TextUnderTitle from '../../../Views/TextUnderTitle';
import Title from '../../../Views/Title';
import BlockLine from './DatasPage/BlockLine';
import BlockRightSide from './DatasPage/BlockRightSide';
import BlockText from './DatasPage/BlockText';
import LinkToFirmalization from './DatasPage/LinkToFirmalization';
import ProductHorizontalCard from './DatasPage/productCards/ProductHorizontalCard';
import ProductWhosaleCard from './DatasPage/productCards/ProductWhosaleCard';
import SelectedFilter from './DatasPage/SelectedFilter';
import style from './DatasPage/styles/cartpage.module.scss';
import WrapperCards from './DatasPage/WrapperCards';
import WrapperRightSide from './DatasPage/WrapperRightSide';
import DefaultCartPreview from './DefaultCartPreview';
import BlockSpinner from '../../../Views/SpinnerWrapper';


const CartPageLayout = ({
    numberCurrentOrderForAddProduct,
    valueButtonNextToOrder,
    textConditionPayPart_1,
    textConditionPayPart_2,
    agreeWitheRegulations,
    recomendetProducts,
    opt_minimum_price,
    listCurrentOrder,
    total_discount,
    checkout_slug,
    profileInCart, 
    cartitem_set,
    is_performed,
    total_price,
    breadcrumbs,
    valueButton,
    front_admin,
    currency,
    in_stock,
    selected,
    in_cart,
    role,

    handleGoToOrder = () => { },
    openModalListAddCurrencyOrdering,
    handleAgreeWitheRegulations,
    multipleDeleteFromCart,
    enableAllSelect,
    selectAllItemsInCart,

    deleteProductFromCart,
    contextUpdateProductFromCard,
    decCounterProduct,
    incCounterProduct,
}) => {

    const labelLink = () => {
        return (
            <div
                className={style['cart-page__condition-redeem']}
            >
                Согласен с {' '}
                <Link
                    to={'/juridical'}
                >
                    условиями оформления заказа {' '}
                </Link>

                на торговой бизнес-платформе и с{' '}
                <Link
                    // target="_blank"
                    to={'/exchange'}>
                    правилами возврата
                </Link>
            </div>)
    }
    
    if ( !cartitem_set.length && !in_stock.length && profileInCart === 0 ) {
        return <DefaultCartPreview
                    recomendetProducts = { recomendetProducts } 
                    breadcrumbs = { breadcrumbs }
                    currency = { currency }
                />;
      }

      return (
        <BlockGrid.Container>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>


            <BlockGrid.CollPageContainer>
                <BlockGrid.CollPageLeft>
                    <Title variant={'cart'} type={'h1'}>
                        <Text text={'shopping.cart'} />: (<span className={style['cart-page__cart-info-count']}>{in_cart}</span>)
                    </Title>
                    <TextUnderTitle variant={'text-content__cart-info'}>
                        <Text text={'text-onder-order'} />
                    </TextUnderTitle>
                    <SelectedFilter
                     multipleDeleteFromCart={ multipleDeleteFromCart }
                     enableAllSelect = { enableAllSelect }
                     selectAllItemsInCart = { selectAllItemsInCart }
                    />
                    {
                        role === ROLE.WHOLESALE ?
                            <Title variant={'cart-min'} type={'h3'}>
                            {                          
                               !!Number(numberCurrentOrderForAddProduct) ?
                                    <>
                                        В заказ можно добавить товары, соблюдая условия минимальной закупки по брендам
                                    </>
                                : ( 
                                    <React.Fragment>
                                    {
                                        opt_minimum_price?
                                        <>
                                            {
                                                textConditionPayPart_1?.replace(/<p.*?>|<\/p>/isg,'')
                                            }
                                                {' '}  {opt_minimum_price} {' '} {currency} {' '}
                                            {
                                                textConditionPayPart_2?.replace(/<p.*?>|<\/p>/isg,'')
                                            }
                                        </>
                                        
                                        : null
                                    }
                                    </React.Fragment>
                                )
                            }
{/*                                     
                                    !!opt_minimum_price ? opt_minimum_price.toFixed() : null
                                    currency
                                    textConditionPayPart_2
                                    front_admin ? <Settings nameComponent={'opt_minimum_price'} /> : null} */}
                        
                            </Title>
                            : null
                    }
                    {
                        (!!!cartitem_set.length && !!!in_stock.length && profileInCart > 0 ) ?
                            <BlockSpinner.SpinnerWrapper>
                                <BlockSpinner.SpinnerCenter>
                                    <BlockSpinner.Spinner sizeWidth='30' sizeHeight='30' />
                                </BlockSpinner.SpinnerCenter>
                            </BlockSpinner.SpinnerWrapper>
                            : <WrapperCards>


                            {/* карточка товара в корзине для опта */}
                            {
                                role === ROLE.WHOLESALE ?

                                    (<>
                                    {
                                            cartitem_set.map((el, i) => {
                                                const isVisibleLine = cartitem_set.length - 1 !== i;
                                                return (
                                                    <ProductWhosaleCard
                                                        key={el.id}
                                                        {...el}
                                                        currency={currency}
                                                        isVisibleLine={isVisibleLine}

                                                        contextUpdateProductFromCard = { contextUpdateProductFromCard }
                                                        deleteProductFromCart = { deleteProductFromCart }
                                                        decCounterProduct = { decCounterProduct }
                                                        incCounterProduct = { incCounterProduct }
                                                    />
                                                );
                                            })
                                        }
                                    
                                    {
                                        !!in_stock.length? 
                                            <TextUnderTitle variant={'text-content__cart-info'}>
                                                {/* <Text text={'text-onder-order'} /> */}
                                                        Товары в наличии
                                            </TextUnderTitle>
                                            : null
                                    }
                                        {

                                            in_stock.map(el => {
                                                return (
                                                    <ProductHorizontalCard
                                                        is_collection={el.is_collection}
                                                        key={el.id}
                                                        {...el}
                                                        role={role}
                                                        currency={currency}

                                                        deleteProductFromCart={deleteProductFromCart}
                                                        contextUpdateProductFromCard={contextUpdateProductFromCard}
                                                        decCounterProduct={decCounterProduct}
                                                        incCounterProduct={incCounterProduct}
                                                    />
                                                )
                                            })
                                        }
                                    </>)

                                    : role === ROLE.DROPSHIPPER || role === ROLE.RETAIL?//если дроп
                                        // карточка товара в корзине для дропа и розницы
                                        // cardsGoodsDropAndRetail.other_goods ?
                                        cartitem_set.map(el => {
                                            return (

                                                <ProductHorizontalCard
                                                    is_collection={el.is_collection}
                                                    key={el.id}
                                                    {...el}
                                                    role={role}
                                                    currency={currency}

                                                    deleteProductFromCart={deleteProductFromCart}
                                                    contextUpdateProductFromCard={contextUpdateProductFromCard}
                                                    decCounterProduct={decCounterProduct}
                                                    incCounterProduct={incCounterProduct}
                                                />
                                            )
                                        })
                                        : null
                            }
                            </WrapperCards>
                    }


                </BlockGrid.CollPageLeft>
                <BlockGrid.CollPageRight>
                    <WrapperRightSide>
                        <BlockRightSide>
                            {/* //?!Ваш заказ 
                            */}
                            <BlockText type={'text-title'}>
                                <Text text={'you.order'} />
                            </BlockText>
                            {/* //?! товара (-ов)
                            */}
                            <BlockText type={'text-sub'}>
                                {selected} <Text text={'product.s'} />
                            </BlockText>
                        </BlockRightSide>

                        <BlockRightSide>
                            {/* //?! Стоимость заказа
                            */}
                            <BlockText type={'text-default'}>
                                <Text text={'order.cost'} />
                            </BlockText>
                            {/* //?! 0
                            */}
                            <BlockText type={'text-default-currency'}>
                                {total_price ?? 0} {currency}
                            </BlockText>
                        </BlockRightSide>

                        {/* //?! Скидки
                         */}
                        {
                            ROLE.RETAIL === role ? (
                                <BlockRightSide>
                                    <BlockText type={'text-default'}>
                                        <Text text={'sale'} />
                                    </BlockText>

                                    <BlockText type={'sale-text--red'}>
                                        {total_discount} {currency}
                                    </BlockText>
                                </BlockRightSide>
                            ) : null
                        }

                        <BlockLine />
                        {/* //?! Итого к оплате
                         */}
                        <BlockRightSide mb={20}>
                            <BlockText type={'text-title'}>
                                <Text text={'total.payable'} />:
                            </BlockText>
                            <BlockText type={'text-title'}>
                                {total_price ?? 0} {currency}
                            </BlockText>
                        </BlockRightSide>

                        { //?! кнопка добавлениея ксуществующему заказу
                            !!listCurrentOrder.count && profileInCart !== 0 ? (
                                // front_admin ?
                                <Button
                                    onClick={openModalListAddCurrencyOrdering}
                                    className={style['cart-page__add-products-in-order']}
                                >
                                    {
                                        Number(numberCurrentOrderForAddProduct)?
                                            `заказ № ${numberCurrentOrderForAddProduct}`
                                            : 'дополнить заказ'
                                    }
                                </Button>
                                // : null
                            )
                                : null
                        }

                        {/* //?! кнопка перехода к оформлению заказу
                         */}
                        <LinkToFirmalization
                            enabled={agreeWitheRegulations && is_performed}
                            to={'/order'}
                            onClick={handleGoToOrder}                            
                        >
                            { valueButtonNextToOrder }
                        </LinkToFirmalization>

                        {/* //?! 
                          */}
                            <CheckBox
                                variant={'informations_block'}
                                checked={agreeWitheRegulations}
                                onChange={(e) => {
                                    const checked = e.checked;
                                    if (checked === null) return;
                                    handleAgreeWitheRegulations(checked);
                                }}
                                label={labelLink()}
                            >
                            </CheckBox>
                    </WrapperRightSide>
                </BlockGrid.CollPageRight>
            </BlockGrid.CollPageContainer>

        </BlockGrid.Container>
    )
}

export default CartPageLayout;