import React from 'react';
import PersonalPageLayoutContainer from './PersonalPageLayout/PersonalPageLayoutContainer';


const PersonalPage = ({
    context
}) => {
    console.log({ PersonalPage: context })
    const {        
        cabinet_site_menu,
        cabinet_menu,
        breadcrumbs,
        profile,
        order,
        shop,
    } = context;

    const { user = {}, role, balance, organization, links } = profile;
    const { addressDilivery } = order;
    const { username } = user;

    return (
        <>
        <PersonalPageLayoutContainer
           cabinet_site_menu = { cabinet_site_menu }
           addressDilivery = { addressDilivery }
           is_has_shop = { shop?.is_has_shop }
           create_shop = { shop?.shop_link }
           cabinet_menu = { cabinet_menu }
           organization = { organization }
           breadcrumbs = { breadcrumbs }
           username = { username }
           balance = { balance }
           profile = { profile }
           links = { links } 
           shop = { shop }
           role = { role }
           user = { user }
           

        />
        </>
    )
}

export default PersonalPage;