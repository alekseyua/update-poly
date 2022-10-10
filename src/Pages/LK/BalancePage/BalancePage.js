import React from 'react';
import BalancePageLayoutContainer from './BalancePageLayout/BalancePageLayoutContainer';

const BalancePage = ({
    context
}) => {

    console.log({ BalancePage: context })

    const {        
        cabinet_site_menu,
        historyPayment,
        cabinet_menu,
        breadcrumbs,
        profile,
        shop,
        currency,

    } = context;
    
    const { user = {}, role, balance, passive_balance } = profile;
    const { username } = user;

    return (
        <BalancePageLayoutContainer
            cabinet_site_menu = { cabinet_site_menu }
            passive_balance = { passive_balance }
            historyPayment = { historyPayment }
            cabinet_menu = { cabinet_menu }
            breadcrumbs = { breadcrumbs }
            create_shop = { shop?.shop_link }
            is_has_shop = { shop?.is_has_shop }
            currency = { currency }
            username = { username }
            balance = { balance }
            role = { role }
            shop = { shop }
        />
    )
}

export default BalancePage;