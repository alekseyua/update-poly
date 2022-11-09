import React from 'react';
import dayjs from '../../../helpers/dayjs';
import Title from '../../../Views/Title';
import api from '../../../api/api';
import SubTitle from '../../../Views/ElementPage/SubTitle/SubTitle';
import ContainerTitle from '../../../Views/ElementPage/ContainerTitle/ContainerTitle';
import TrackDetails from './TrackDetails';
import OrderBaseDetails from '../OrderDetailsPersonalPage/OrderDetailsPersonalPageLayout/DetailsOrders/OrderBaseDetails';
import TextUnderTitle from '../../../Views/TextUnderTitle';
import { ROLE } from '../../../const';
import ListTable from '../../../Views/ElementPage/ListTable/ListTable';
import SectionWrapper from '../../../Views/ElementPage/SectionWrapper/SectionWrapper';
import LeftSideCol from '../../../Views/ElementPage/LeftSideCol/LeftSideCol';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Card from '../../../Views/ElementPage/CardOrder/Card';
import WrapperWhoosaleCard from '../../../Views/ElementPage/CardOrder/WrapperWhoosaleCard';
import RightSideCol from '../../../Views/ElementPage/RightSideCol/RightSideCol';
import Chat from '../../../Views/ElementPage/Chat/Chat';

const DetailsOrders = ({
    role,
    idOrder,
    status,
    weight,
    services,
    discount,
    currency,
    in_archive,
    total_cost,
    updated_at,
    order_cost,
    created_at,
    numberOrder,
    delivery_cost,
    delivery_method,
    delivery_address,
    fullNumberOrder,
    payment_method,
    specification,
    track_number,
    dataOrderItems,
    order_items_chat,
    order_chat,

    openModalPay,
    heandlerClickInfo,
    handlerSpecification,
    activeButtonSpecification,

    deleteElementOrder,
    sendCommentFromTextField,
    clickOpenCommit,
    openModalImage,
    openModalVideo,
    sendMessage,

}) => {

    return (
        <React.Fragment>
            <ContainerTitle
                variant={'create-order__title-container'}
            >
                <Title variant="cabinet_orders_details__title" type={'h1'}>
                    Заказ № {fullNumberOrder}
                </Title>
                <SubTitle
                    variant={'create-order__subtitle'}
                >
                    от {dayjs(api.language, created_at).format('DD.MM.YYYY')}
                </SubTitle>
            </ContainerTitle>

            {
                track_number ? (
                    <TrackDetails nubmerTrack={track_number} />
                ) : null
            }
            {/* 
//?! шапка с информацией о заказе
*/}
            <OrderBaseDetails
                role={role}
                idOrder={idOrder}
                status={status}
                weight={weight}
                services={services}
                discount={discount}
                in_archive={in_archive}
                total_cost={total_cost}
                updated_at={updated_at}
                order_cost={order_cost}
                created_at={created_at}
                currency={currency}
                delivery_cost={delivery_cost}
                delivery_method={delivery_method}
                numberOrder={numberOrder}
                delivery_address={delivery_address}
                payment_method={payment_method}
                specification={specification}
                track_number={track_number}

                openModalPay={openModalPay}
                heandlerClickInfo={heandlerClickInfo}
            />

            {
                role === ROLE.WHOLESALE ? (
                    <>
                        <TextUnderTitle variant={'text-content__order-info'}>
                            Возможна частичная отправка товара (если выкупленны не все заказанные единицы). В случае необходимости отправить выкупленный товар с заказа напишите об этом в "Чате по заказу".
                        </TextUnderTitle>
                        <TextUnderTitle variant={'text-content__order-info'}>
                            В случае необходимости отмены товара (ов) в заказе и возрата денег на баланс, напишите об этом комментарий под товаром/товарами, который (ые) необходимо отменить.
                        </TextUnderTitle>
                    </>
                ) : null
            }
            {/* 
        //?! количество товаров в заказе
        */}
            <ListTable
                count={dataOrderItems?.length ?? 0}  //{role !== ROLE.WHOLESALE ? orderItems.length : orderItemLength}
                handlerSpecification={handlerSpecification}
                activeButtonSpecification={activeButtonSpecification}
            />
            {/* 
        //?! Список товаров
        */}
        {
            dataOrderItems?.length?
            <SectionWrapper>
                <LeftSideCol>
                    {
                        role !== ROLE.WHOLESALE ? (
                            dataOrderItems.map((el, i) => {
                                let contextChats = [];
                                if(order_items_chat?.length){
                                    contextChats = order_items_chat.filter( message => message.item_id === el.id )
                                }
                                return (
                                    <Card
                                        {...el}
                                        key={el.id}
                                        title={el.title}
                                        size={el.size}
                                        color={el.color}
                                        status={el.status}
                                        prices={el.prices}
                                        order={el.order}
                                        brand={el.brand}
                                        change_agreement={el.change_agreement}
                                        image={el.image}
                                        url={el.product_url}
                                        can_cancel={el.can_cancel}
                                        redeemed = { el.redeemed }
                                        sended = { el.sended }
                                        currency = { currency } 
                                        contextChats = { contextChats[0] }

                                        deleteElementOrder={deleteElementOrder}
                                        sendCommentFromTextField = { sendCommentFromTextField }
                                        clickOpenCommit = { clickOpenCommit }
                                        openModalImage = { openModalImage }
                                        sendMessage = { sendMessage }
                                    />
                                );
                            })
                        ) : (
                            <React.Fragment>
                                {dataOrderItems.map((el, i) => {
                                    return (
                                        <WrapperWhoosaleCard key={i} brand={el.title}>
                                            {el.items.map((item) => {
                                                return (
                                                    <Card
                                                        {...item}
                                                        key={item.id}
                                                        title={item.title}
                                                        size={item.size}
                                                        color={item.color}
                                                        status={item.status}
                                                        prices={item.prices}
                                                        order={item.order}
                                                        brand={item.brand}
                                                        change_agreement={item.change_agreement}
                                                        comment={[]}
                                                        commentImage={item?.comment_image !== '-' ? item?.comment_image : null}
                                                        image={item.image}
                                                        id={item.id}
                                                        url={item.product_url}
                                                        role={role}
                                                        can_cancel={item.can_cancel}
                                                        currency = { currency }
                                                        redeemed = { item.redeemed }
                                                        sended = { item.sended }
                                                        
                                                        deleteElementOrder={deleteElementOrder}
                                                        sendCommentFromTextField = { sendCommentFromTextField }
                                                        clickOpenCommit = { clickOpenCommit }
                                                        openModalImage = { openModalImage }
                                                        sendMessage = { sendMessage }
                                                    />
                                                );
                                            })}
                                        </WrapperWhoosaleCard>
                                    );
                                })}
                            </React.Fragment>
                        )
                    }
                </LeftSideCol>
                <RightSideCol>
                    <Chat
                        idOrder = { idOrder }
                        heandlerClickInfo = { heandlerClickInfo }
                        sendMessage = { sendMessage }
                        order_chat = { order_chat }
                        openModalImage = { openModalImage }
                        openModalVideo = { openModalVideo }
                    />
                </RightSideCol>
            </SectionWrapper>
            : <BlockSpinner.SpinnerWrapperSpinnerCenterMargin>
                <BlockSpinner.Spinner sizeHeight='30' sizeWidth='30' />
            </BlockSpinner.SpinnerWrapperSpinnerCenterMargin>
        }

        </React.Fragment>
    )
}

export default DetailsOrders;