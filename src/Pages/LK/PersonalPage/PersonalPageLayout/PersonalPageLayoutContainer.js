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

            email, 
            first_name, 
            last_name, 
            middle_name, 
            phone,
            insta_link, 
            site_link, 
            vk_link,
}) => {

    return (
        <>
        <PersonalPageLayout
            cabinet_site_menu = { cabinet_site_menu }
            addressDilivery = { addressDilivery }
            cabinet_menu = { cabinet_menu }
            organization={organization}
            breadcrumbs = { breadcrumbs }
            create_shop = { create_shop }
            is_has_shop = { is_has_shop }
            username = { username }
            profile = { profile }
            balance = { balance }
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

export default PersonalPageLayoutContainer;