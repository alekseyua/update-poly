import React from 'react';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import BlockGrid from '../../../../Views/GridContainerBlock';
import CreateStore from '../../../../Views/PersonalPageViews/CreateStore';
import DetailsOrders from '../../DetailsPage/DetailsOrders';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';

const OrderDetailsPersonalPageLayout = ({
    cabinet_site_menu,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    currency,
    username,
    balance,
    shop,
    role,

    idOrder,
    status,
    weight,
    services,
    discount,
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
    dataOrderItems,

    openModalPay,
    heandlerClickInfo,
    handlerSpecification,
    activeButtonSpecification,
    deleteElementOrder,
    sendCommentFromTextField,
    order_items_chat,
    order_chat,
    clickOpenCommit,
    openModalImage,
    sendMessage,

}) => {

    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <BlockGrid.GridPageLK>
                        
                        <BlockGrid.GridPageLeftLK>
                        <SidebarPersonalPage
                            shop={shop}
                            create_shop={create_shop}
                            is_has_shop={is_has_shop}
                            cabinet_menu={cabinet_menu}
                            cabinet_site_menu={cabinet_site_menu}
                            currency = { currency }
                            balance = { balance }
                            username = { username }
                            role = { role }
                        />
                        </BlockGrid.GridPageLeftLK>
                        <BlockGrid.GridPageRightLK>
                            <DetailsOrders
                                role = { role }
                                idOrder = { idOrder }
                                status = { status }
                                weight = { weight }
                                services = { services }
                                discount = { discount }
                                currency = { currency }
                                in_archive = { in_archive }
                                total_cost = { total_cost }
                                updated_at = { updated_at }
                                order_cost = { order_cost }
                                created_at = { created_at }
                                delivery_cost = { delivery_cost }
                                delivery_method = { delivery_method }
                                fullNumberOrder = { fullNumberOrder }
                                delivery_address = { delivery_address }
                                payment_method = { payment_method }
                                specification = { specification }
                                track_number = { track_number }
                                dataOrderItems = { dataOrderItems }

                                order_items_chat = { order_items_chat }
                                order_chat = { order_chat }

                                openModalPay = { openModalPay }
                                heandlerClickInfo = { heandlerClickInfo }
                                handlerSpecification = { handlerSpecification }
                                activeButtonSpecification = { activeButtonSpecification }
                                deleteElementOrder = { deleteElementOrder }
                                sendCommentFromTextField = { sendCommentFromTextField }
                                clickOpenCommit = { clickOpenCommit }
                                openModalImage = { openModalImage }
                                sendMessage = { sendMessage }
                            />

                        {
                            !!!is_has_shop ? (
                                <CreateStore
                                    role = { role } 
                                    className = { 'mobile' }
                                    create_shop = { '/sozdanie-internet-magazina' } //create_shop
                                />
                            ) : null
                        } 

                        </BlockGrid.GridPageRightLK>
                    </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default OrderDetailsPersonalPageLayout;