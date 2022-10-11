import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import Notifications from '../../DetailsPage/Notifications';


const NotificationsPageLayout = ({
    breadcrumbs,
    shop,
    create_shop,
    is_has_shop,
    cabinet_menu,
    cabinet_site_menu,
    balance,
    username,
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
                            <Notifications
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