import React from 'react';
import dayjs from '../../../helpers/dayjs';
import Title from '../../../Views/Title';
import api from '../../../api/api';
import SubTitle from '../../../Views/ElementPage/SubTitle/SubTitle';
import ContainerTitle from '../../../Views/ElementPage/ContainerTitle/ContainerTitle';
import TrackDetails from './TrackDetails';
import OrderBaseDetails from '../OrderDetailsPersonalPage/OrderDetailsPersonalPageLayout/DetailsOrders/OrderBaseDetails';

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
    delivery_cost,
    delivery_method,
    delivery_address,
    fullNumberOrder,
    payment_method,
    specification,
    track_number,

    openModalPay,
    heandlerClickInfo,

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

            <OrderBaseDetails
                role = { role }
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
                currency = { currency }
                delivery_cost={delivery_cost}
                delivery_method={delivery_method}
                fullNumberOrder={fullNumberOrder}
                delivery_address={delivery_address}
                payment_method={payment_method}
                specification={specification}
                track_number={track_number}

                openModalPay = { openModalPay }
                heandlerClickInfo = { heandlerClickInfo }
            />



        </React.Fragment>
    )
}

export default DetailsOrders;