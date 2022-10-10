import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import ActiveAndArchivedOrders from '../../DetailsPage/ActiveAndArchivedOrders';

const OrdersPageLayout = ({
    cabinet_site_menu,
    dateFilterData,
    tableBodyData,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    profileId,
    username,
    statuses,
    profile,
    balance,
    orders,
    shop,
    role,

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
                            balance={balance}
                            username={username}
                            role={role}
                        />
                        </BlockGrid.GridPageLeftLK>

                        <BlockGrid.GridPageRightLK>
                        <ActiveAndArchivedOrders
                            dateFilterData = { dateFilterData }
                            tableBodyData = { tableBodyData }
                            statuses = {statuses}
                            profile = {profile}
                            orders = { orders }
                        />
                        </BlockGrid.GridPageRightLK>
                    </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default OrdersPageLayout;