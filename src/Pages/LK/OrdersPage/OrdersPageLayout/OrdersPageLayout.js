import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import ActiveAndArchivedOrders from '../../DetailsPage/ActiveAndArchivedOrders';

const OrdersPageLayout = ({
    getDataOrdersFilters,
    searchOrderForFio,
    cabinet_site_menu,
    btnAddOrderItems,
    dateFilterData,
    tableBodyData,
    sendToArchive,
    cabinet_menu,
    btnDelOrder,
    breadcrumbs,
    create_shop,
    is_has_shop,
    profileId,
    username,
    currency,
    loading,
    profile,
    balance,
    options,
    orders,
    shop,
    role,

    changeStatusFilter,
    changeValueSearch,
    selectCreateFrom,
    selectCreateTo,
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
                            username = { username }
                            balance = { balance }
                            role = { role }
                        />
                        </BlockGrid.GridPageLeftLK>

                        <BlockGrid.GridPageRightLK>
                        <ActiveAndArchivedOrders
                            searchOrderForFio = { searchOrderForFio }
                            dateFilterData = { dateFilterData }
                            tableBodyData = { tableBodyData }
                            loading = {loading}
                            profile = {profile}
                            options = { options }              
                            orders = { orders }
                            currency = { currency }

                            getDataOrdersFilters = { getDataOrdersFilters }
                            changeStatusFilter = { changeStatusFilter }
                            changeValueSearch = { changeValueSearch }
                            selectCreateFrom = { selectCreateFrom }
                            selectCreateTo = { selectCreateTo }
                            btnAddOrderItems = { btnAddOrderItems }
                            sendToArchive = { sendToArchive }
                            btnDelOrder = { btnDelOrder }
                        />
                        </BlockGrid.GridPageRightLK>
                    </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default OrdersPageLayout;