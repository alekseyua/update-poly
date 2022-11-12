import React, { useEffect } from 'react';
import PersonalPageLayoutContainer from './PersonalPageLayout/PersonalPageLayoutContainer';


const PersonalPage = ({
    context
}) => {
    // console.log({ PersonalPage: context })
    const {        
        cabinet_site_menu,
        cabinet_menu,
        breadcrumbs,
        currency,
        profile,
        order,
        shop,
    } = context;

    const { user = {}, role, balance, organization, links, receive_newsletter } = profile;
    const email = user?.email;
    const first_name = user?.first_name;
    const last_name = user?.last_name;
    const middle_name = user?.middle_name;
    const phone = user?.phone;
    const insta_link = links?.insta_link;
    const site_link = links?.site_link;
    const vk_link = links?.vk_link;
    const { addressDilivery } = order;
    const { username } = user;



    return (
        <>
        <PersonalPageLayoutContainer
           receive_newsletter = { receive_newsletter }
           cabinet_site_menu = { cabinet_site_menu }
           addressDilivery = { addressDilivery }
           is_has_shop = { shop?.is_has_shop }
           create_shop = { shop?.shop_link }
           cabinet_menu = { cabinet_menu }
           organization = { organization }
           breadcrumbs = { breadcrumbs }
           username = { username }
           currency = { currency }
           balance = { balance }
           profile = { profile }
           links = { links } 
           shop = { shop }
           role = { role }

           email = { email }
           phone = { phone }
           vk_link = { vk_link }
           last_name = { last_name }
           site_link = { site_link }
           insta_link = { insta_link }
           first_name = { first_name }
           middle_name = { middle_name }
        />
        </>
    )
}

export default PersonalPage;