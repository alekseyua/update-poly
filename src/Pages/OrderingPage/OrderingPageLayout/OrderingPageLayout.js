import React from 'react';
import BlockGrid from '../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Title from "../../../Views/Title";
import Text from "../../../helpers/Text";
import AsyncComponent from '../../../helpers/asyncComponent';
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import OrderingCards from './OrderingCardBlock/OrderingCards';
import WrapperRightSide from '../../CartPage/CartPageLayout/DatasPage/WrapperRightSide';
import BlockRightSide from '../../CartPage/CartPageLayout/DatasPage/BlockRightSide';
import BlockText from '../../CartPage/CartPageLayout/DatasPage/BlockText';
import BlockLine from '../../CartPage/CartPageLayout/DatasPage/BlockLine';
import { ROLE } from '../../../const';
import CheckBox from '../../../Views/CheckBox';
import OrderCarButton from '../../../Views/OrderCarButton/OrderCarButton';

import { initialValuesOrder } from '../../../helpers/initialValues/initialValues';

const OrderingAddressContainer = AsyncComponent(() => {
    return import('./OrderingAddressBlock/OrderingAddressContainer');
})
const OrderingDeliveryContainer = AsyncComponent(() => {
    return import('./OrderingDeliveryBlock/OrderingDeliveryContainer');
})
const OrderingPayContainer = AsyncComponent(() => {
    return import('./OrderingPayBlock/OrderingPayContainer');
})


const OrderingPageLayout = ({
    numberCurrentOrderForAddProduct,
    shriveledCartContent,
    delivery_condition,
    delivery_methods,
    statusFildValue,
    payment_methods,
    addressDilivery,
    priceDilivery,
    cart_content,
    breadcrumbs,
    total_price,
    listOrders,
    profileId,
    currency,
    styleCar,
    balance,
    role,

    handlerSubmitOrder,
    setStyleCar,
    labelLink,
}) => {


    console.log('numberCurrentOrderForAddProduct', typeof numberCurrentOrderForAddProduct, ' : ', numberCurrentOrderForAddProduct )
    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                {
                    <BlockGrid.Row>

                        <Link
                            // onClick={openModalGoBackToCart} 
                            to={'/cart'}
                        >
                            {'<'} Назад в корзину
                        </Link>
                    </BlockGrid.Row>
                }
                {
                    shriveledCartContent.selected ?
                        <Formik
                            initialValues={initialValuesOrder}
                            onSubmit={handlerSubmitOrder}
                        >
                            {
                                ({ handleSubmit, handleChange, values, errors, setValues, touched }) => {

                                    return (
                                        <BlockGrid.CollPageContainer>

                                            <BlockGrid.CollPageLeft>

                                                <Title variant={'cart'} type={'h1'}>
                                                    <Text text="ordering" />
                                                </Title>
                                                {/* 
                                                //?! может быть добавить через Title
                                                */}
                                                {
                                                    !!numberCurrentOrderForAddProduct ? <Title variant={'cart-order'} type={'h5'}>Заказ № {numberCurrentOrderForAddProduct}</Title> : null
                                                }

                                                <OrderingCards
                                                    shriveledCartContent={shriveledCartContent}
                                                    setValues={setValues}
                                                    values={values}
                                                    cart_content={cart_content}
                                                    currency={currency}
                                                    role={role}
                                                />
                                                {
                                                    !!!numberCurrentOrderForAddProduct ?
                                                        (
                                                            <React.Fragment>
                                                                <OrderingPayContainer
                                                                    setValues={setValues}
                                                                    values={values}
                                                                    payment_methods={payment_methods}
                                                                    role={role}
                                                                    balance={balance}
                                                                    total_cost={total_price}
                                                                />

                                                                <OrderingDeliveryContainer
                                                                    delivery_condition={delivery_condition}
                                                                    delivery_methods={delivery_methods}
                                                                    setValues={setValues}
                                                                    currency={currency}
                                                                    values={values}
                                                                    role={role}
                                                                />

                                                                <OrderingAddressContainer
                                                                    addressDilivery={addressDilivery}
                                                                    profileId={profileId}
                                                                    setValues={setValues}
                                                                    values={values}
                                                                    role={role}
                                                                />

                                                            </React.Fragment>
                                                        ) : null
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
                                                            { shriveledCartContent.selected } <Text text={'product.s'} />
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
                                                            { cart_content?.total_price ?? 0 } { currency }
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
                                                                    { cart_content?.discount ?? 0 } { currency }
                                                                </BlockText>

                                                                <BlockText type={'text-default'}>
                                                                    <Text text={'shipping'} />
                                                                </BlockText>

                                                                <BlockText type={'sale-text--red'}>
                                                                    { priceDilivery?.price ?? 0 } { currency }
                                                                </BlockText>
                                                            </BlockRightSide>
                                                            
                                                        ) : ROLE.WHOLESALE === role ? (
                                                            <div>
                                                                Доставка: <span>По тарифам КАРГО</span>
                                                            </div>
                                                        ) : ROLE.DROPSHIPPER === role ? (
                                                            <div>
                                                                Доставка: <span>По весу, рассчитывается при упаковке</span>
                                                            </div>
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
                                                            { priceDilivery?.price && ROLE.RETAIL === role ?
                                                                ( cart_content?.total_price + priceDilivery?.price ).toFixed(2)
                                                                : cart_content?.total_price ?? 0 } { currency }
                                                        </BlockText>
                                                    </BlockRightSide>

                                                    {/* //?! кнопка с машинкой оформления заказа 
                            */}
                                                    <BlockRightSide mb={20}>
                                                        <OrderCarButton
                                                            numberCurrentOrderForAddProduct = { numberCurrentOrderForAddProduct }
                                                            handlerSubmitOrder = { handlerSubmitOrder }
                                                            setStyleCar = { setStyleCar }
                                                            styleCar = { styleCar }
                                                            enabled = { !!numberCurrentOrderForAddProduct? false : (!values.agree_personal_data || !values.payment_methods || !values.variant || !values.selectedAdress) }
                                                            values = { values }
                                                        />
                                                    </BlockRightSide>
                                                    {/* //?! 
                            */}
                                                    {/* <BlockRightSide mt={20} mb={20} fd={'column'}> */}

                                                    <CheckBox
                                                        variant={'informations_block'}
                                                        checked={values.agree_personal_data}
                                                        onChange={(e) => {
                                                            const checked = e.checked;
                                                            if (checked === null) return;
                                                            setValues({
                                                                ...values,
                                                                'agree_personal_data': !checked
                                                            })
                                                        }}
                                                        label={labelLink()}
                                                    >
                                                    </CheckBox>

                                                    {/* </BlockRightSide> */}



                                                </WrapperRightSide>
                                            </BlockGrid.CollPageRight>

                                        </BlockGrid.CollPageContainer>
                                    )
                                }
                            }
                        </Formik>
                        : <h1>У Вас нет выбраных товаров в карзине для оформления заказа</h1>

                }

            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default OrderingPageLayout;