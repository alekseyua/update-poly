import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import Balance from '../../DetailsPage/Balance';
import WithdrawalFunds from '../../DetailsPage/WithdrawalFunds';
import HistoryPayments from '../../DetailsPage/HistoryPayments';


const BalancePageLayout = ({
    cabinet_site_menu,
    passive_balance,
    historyPayment,
    cabinet_menu,
    is_has_shop,
    create_shop,
    breadcrumbs,
    username,
    currency,
    balance,
    shop,
    role,

    openModalTopUpYouBalance,
    openModalGetMyCache,
    changePaginationsPayments,
}) => {

    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <BlockGrid.GridPageLK>
                        
                        <BlockGrid.GridPageLeftLK>
                            <SidebarPersonalPage
                                cabinet_site_menu = { cabinet_site_menu }
                                cabinet_menu = { cabinet_menu }
                                create_shop = { create_shop }
                                is_has_shop = { is_has_shop }
                                currency = { currency }
                                username = { username }
                                balance = { balance }
                                shop = { shop }
                                role = { role }
                            />
                            </BlockGrid.GridPageLeftLK>
                            <BlockGrid.GridPageRightLK>
                                <Balance
                                    balance={balance}
                                    passive_balance = { passive_balance }
                                    currency = { currency }
                                    openModalTopUpYouBalance = { openModalTopUpYouBalance }
                                />
                                <WithdrawalFunds
                                    openModalGetMyCache = { openModalGetMyCache }
                                />
                                <HistoryPayments
                                    historyPayment = { historyPayment }
                                    currency = { currency }
                                    
                                    changePaginationsPayments = { changePaginationsPayments }
                                />                        
                            </BlockGrid.GridPageRightLK>
                    </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default BalancePageLayout;