import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import Notifications from '../../DetailsPage/Notifications';


const NotificationsPageLayout = ({
    notificationsPrifile,
    breadcrumbs,
    shop,
    create_shop,
    is_has_shop,
    cabinet_menu,
    cabinet_site_menu,
    balance,
    username,
    currency,
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
                            shop={shop}
                            cabinet_site_menu = { cabinet_site_menu }
                            cabinet_menu = { cabinet_menu }
                            create_shop = { create_shop }
                            is_has_shop = { is_has_shop }
                            currency = { currency }
                            username = { username }
                            balance = { balance }
                            role = { role }
                        />
                        </BlockGrid.GridPageLeftLK>

                        <BlockGrid.GridPageRightLK>
                            <Notifications
                                notificationsPrifile = { notificationsPrifile }
                                notifications = { notifications }
                                heandlerReedNotic={heandlerReedNotic} 
                                heandlerDelNotic={heandlerDelNotic} 
                                heandlerCheckAllNotice = { heandlerCheckAllNotice }
                                stateActiveCheckNotice = { stateActiveCheckNotice }
                                heandlerCheckNotice = { heandlerCheckNotice }
                                changePaginations = { changePaginations }
                            />
                        </BlockGrid.GridPageRightLK>
                    </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default NotificationsPageLayout;