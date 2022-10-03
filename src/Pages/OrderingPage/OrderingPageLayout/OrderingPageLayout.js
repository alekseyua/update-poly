import React, { useState } from 'react';
import BlockGrid from '../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Title from "../../../Views/Title";
import Button from "../../../Views/Button";
import Text from "../../../helpers/Text";
import Form from '../../../Views/Form';
import AsyncComponent from '../../../helpers/asyncComponent';
import BlockSpinner from '../../../Views/SpinnerWrapper';
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
import OrderingPayContainer from './OrderingPayBlock/OrderingPayContainer';
import OrderingDeliveryContainer from './OrderingDeliveryBlock/OrderingDeliveryContainer';
import OrderingAddressContainer from './OrderingAddressBlock/OrderingAddressContainer';

const OrderingPageLayout = ({
    shriveledCartContent,
    statusFildValue,
    cart_content,
    breadcrumbs,
    listOrders,
    currency,
    role,

    labelLink,
}) => {

  const [styleCar, setStyleCar] = useState('orderCar disable');


    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <BlockGrid.CollPageContainer>
                    <BlockGrid.CollPageLeft>
                        <Link 
                            // onClick={openModalGoBackToCart} 
                            to={'/cart'} 
                        >
                            {'<'} Назад в корзину
                        </Link>
                        <Title variant={'cart'} type={'h1'}>
                            <Text text="ordering" />
                        </Title>
                        {statusFildValue ? <h4>Заказ № {listOrders.filter(item => item.id === statusFildValue)[0]?.order_number}</h4>:null}
                            
                        <OrderingCards
                            shriveledCartContent = { shriveledCartContent }
                            cart_content = { cart_content }
                            currency = { currency }
                            role = { role }
                        />

                        <OrderingPayContainer
                            // setFieldValue={setFieldValue}
                            // values={values.payment_methods}
                            // payment_methods={payment_methods}
                            // role={role}
                            // dataBalance={dataBalance.balance} 
                            // total_cost={cart_contentOrder.price}
                        />

                        <OrderingDeliveryContainer
                            // values={{
                            //   variant: values.variant,
                            //   lastname: values.lastname,
                            //   firstname: values.firstname,
                            //   patronomic: values.patronomic,
                            //   serias_and_number_passport: values.serias_and_number_passport,
                            //   issued_passport: values.issued_passport,
                            //   issued_date: values.issued_date,
                            //   comment: values.comment,
                            //   agree_personal_data: values.agree_personal_data,
                            //   waitForCall: values.waitForCall, 
                            //   needPassport: values.needPassport,
                            // }}
                            // role_configuration={role_configuration}
                            // role={role_configuration.role.number}
                            // errors={errors}
                            // touched={touched}
                            // delivery_methods={delivery_methods}
                            // setFieldValue={setFieldValue}
                          />

                        <OrderingAddressContainer
                            // role={role_configuration.role.number}
                            // selectedAdress={values.selectedAdress}
                            // profileId={profile.id}
                            // closeModal={closeModal}
                            // setFieldValue={setFieldValue}
                            // openModalAddAddress={openModalAddAddress}
                            // setFieldCountry={setFieldCountry}
                            // handleChange={handleChange}
                        />

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
                                    {shriveledCartContent.selected} <Text text={'product.s'} />
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
                                    {cart_content?.total_price ?? 0} {currency}
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
                                            {cart_content.discount ?? 0} {currency}
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
                                    {/* { cart_content?.total_price ?? 0 } { currency } */}
                                </BlockText>
                            </BlockRightSide>

                            {/* //?! кнопка с машинкой оформления заказа 
                            */}
                            <BlockRightSide mb={20}>                          
                                <OrderCarButton  
                                    // enabled={getEnabledToPayments(values, errors)} 
                                    // setStyleCar={setStyleCar} 
                                    styleCar={styleCar}
                                    // selectedAdress={values.selectedAdress}
                                    // variant={values.variant}
                                    // payment_methods={values.payment_methods}
                                    statusFildValue={false}
                                />
                            </BlockRightSide>
                            {/* //?! 
                            */}
                            {/* <BlockRightSide mt={20} mb={20} fd={'column'}> */}
                                <CheckBox
                                    variant={'informations_block'}
                                    // checked={agreeWitheRegulations}
                                    onChange={(e) => {
                                        const checked = e.checked;
                                        if (checked === null) return;
                                        // handleAgreeWitheRegulations(checked);
                                    }}
                                    label={labelLink()}
                                >
                                </CheckBox>
                            {/* </BlockRightSide> */}



                        </WrapperRightSide>
                    </BlockGrid.CollPageRight>
                </BlockGrid.CollPageContainer>

            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default OrderingPageLayout;