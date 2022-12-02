import React from 'react';
import { useStoreon } from 'storeon/react';
import BalancePageLayout from './BalancePageLayout';

const BalancePageLayoutContainer = ({
    confirm_payments_cost,
    amountNotifications,
    cabinet_site_menu,
    passive_balance,
    historyPayment,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    username,
    currency,
    balance,
    shop,
    role,

}) => {
    const { dispatch } = useStoreon();

    const openModalTopUpYouBalance = () => {
        dispatch('modalCheckPayment')
    }

    const openModalGetMyCache = () => {
        dispatch('modalGetMyCach')
    }

    const changePaginationsPayments = (page) => {
        const params = {
            page: page
        }
        dispatch('getPayments', params)
    }

    return (
        <BalancePageLayout
            amountNotifications={amountNotifications}
            cabinet_site_menu={cabinet_site_menu}
            passive_balance={passive_balance}
            historyPayment={historyPayment}
            cabinet_menu={cabinet_menu}
            create_shop={create_shop}
            is_has_shop={is_has_shop}
            breadcrumbs={breadcrumbs}
            currency={currency}
            username={username}
            balance={balance}
            shop={shop}
            role={role}

            confirm_payments_cost={confirm_payments_cost}
            openModalTopUpYouBalance={openModalTopUpYouBalance}
            openModalGetMyCache={openModalGetMyCache}
            changePaginationsPayments={changePaginationsPayments}
        />
    )
}

export default BalancePageLayoutContainer;