import React from 'react';
import PersonalPageLayout from './PersonalPageLayout';

const PersonalPageLayoutContainer = ({
            cabinet_site_menu,
            addressDilivery,
            organization,
            cabinet_menu,
            breadcrumbs,
            create_shop,
            is_has_shop,
            username,
            profile,
            balance,
            shop,
            role,
            links,
            user,
}) => {

    return (
        <>
        <PersonalPageLayout
            cabinet_site_menu = { cabinet_site_menu }
            addressDilivery = { addressDilivery }
            cabinet_menu = { cabinet_menu }
            breadcrumbs = { breadcrumbs }
            create_shop = { create_shop }
            is_has_shop = { is_has_shop }
            profile = { profile }
            username = { username }
            balance = { balance }
            shop = { shop }
            role = { role }
            user={user}
            organization={organization}
            links={links} 
        />
        </>
    )
}

export default PersonalPageLayoutContainer;