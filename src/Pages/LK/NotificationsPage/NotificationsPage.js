import React from 'react';
import NotificationsPageLayoutContainer from './NotificationsPageLayout/NotificationsPageLayoutContainer';

const NotificationsPage = ({
    context
}) => {

    console.log({ NotificationsPage: context })

    const {        
        cabinet_site_menu,
        notifications,
        cabinet_menu,
        breadcrumbs,
        profile,
        shop,
    } = context;
    
    const { user = {}, role, balance } = profile;
    const notificationsPrifile = profile?.notifications
    const { username } = user;
    const stateActiveCheckNotice = false
    return (
        <NotificationsPageLayoutContainer
            notificationsPrifile = { notificationsPrifile }
            notifications = { notifications }
            breadcrumbs = { breadcrumbs }
            shop={shop}
            create_shop = { shop?.shop_link }
            is_has_shop = { shop?.is_has_shop }
            cabinet_menu={cabinet_menu}
            cabinet_site_menu={cabinet_site_menu}
            balance={balance}
            username={username}
            role={role}

            stateActiveCheckNotice = { stateActiveCheckNotice }
        />
    )
}

export default NotificationsPage;