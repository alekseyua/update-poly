import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import Notifications from '../../DetailsPage/Notifications';


const NotificationsPageLayout = ({
    amountNotifications,
    cabinet_site_menu,
    isLoadingAction,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    isLoading,
    username,
    currency,
    balance,
    shop,
    role,

    notifications,
    heandlerReedNotic,
    heandlerDelNotic,
    heandlerCheckAllNotice,
    stateActiveCheckNotice,
    changePaginations,
    heandlerCheckNotice,
}) => {

    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <BlockGrid.GridPageLK>

                    <BlockGrid.GridPageLeftLK>
                        <SidebarPersonalPage
                            amountNotifications={amountNotifications}
                            cabinet_site_menu={cabinet_site_menu}
                            cabinet_menu={cabinet_menu}
                            create_shop={create_shop}
                            is_has_shop={is_has_shop}
                            currency={currency}
                            username={username}
                            balance={balance}
                            role={role}
                            shop={shop}
                        />
                    </BlockGrid.GridPageLeftLK>

                    <BlockGrid.GridPageRightLK>
                        <Notifications
                            heandlerCheckAllNotice={heandlerCheckAllNotice}
                            stateActiveCheckNotice={stateActiveCheckNotice}
                            amountNotifications={amountNotifications}
                            heandlerCheckNotice={heandlerCheckNotice}
                            changePaginations={changePaginations}
                            heandlerReedNotic={heandlerReedNotic}
                            heandlerDelNotic={heandlerDelNotic}
                            isLoadingAction={isLoadingAction}
                            notifications={notifications}
                            isLoading={isLoading}
                        />
                    </BlockGrid.GridPageRightLK>
                </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default NotificationsPageLayout;