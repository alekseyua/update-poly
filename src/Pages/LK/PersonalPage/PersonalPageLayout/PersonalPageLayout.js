import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import ContentEntryPersonalPage from '../../DetailsPage/ContentEntryPersonalPage';
import DeliveryAddresses from '../../DetailsPage/DeliveryAddresses';
import CreateStore from '../../../../Views/PersonalPageViews/CreateStore';


const PersonalPageLayout = ({
    amountNotifications,
    receive_newsletter,
    cabinet_site_menu,
    addressDilivery,
    organization,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    username,
    currency,
    balance,
    profile,
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

    changePhone,
    updateDataUser,
    changePassword,
    deleteAccaunt,
    changeReiciveNewLatters,
}) => {

    console.log('is_has_shop', !!!is_has_shop)
    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <BlockGrid.GridPageLK>

                    <BlockGrid.GridPageLeftLK>
                        <SidebarPersonalPage    
                            amountNotifications = { amountNotifications }
                            cabinet_site_menu={cabinet_site_menu}
                            cabinet_menu={cabinet_menu}
                            create_shop={create_shop}
                            is_has_shop={is_has_shop}
                            currency={currency}
                            username={username}
                            balance={balance}
                            shop={shop}
                            role={role}
                        />
                    </BlockGrid.GridPageLeftLK>

                    <BlockGrid.GridPageRightLK>
                        <ContentEntryPersonalPage
                            role={role}
                            email={email}
                            phone={phone}
                            vk_link={vk_link}
                            last_name={last_name}
                            site_link={site_link}
                            insta_link={insta_link}
                            first_name={first_name}
                            middle_name={middle_name}
                            organization={organization}
                            receive_newsletter={receive_newsletter}

                            changePhone={changePhone}
                            updateDataUser={updateDataUser}
                            changePassword={changePassword}
                            deleteAccaunt={deleteAccaunt}
                            changeReiciveNewLatters={changeReiciveNewLatters}
                        />
                        <DeliveryAddresses
                            addressDilivery={addressDilivery}
                            profileId={profile.id}
                        />
                        {
                            !!!is_has_shop ? (
                                <CreateStore
                                    role={role}
                                    className={'mobile'}
                                    create_shop={'/sozdanie-internet-magazina'} //create_shop
                                />
                            ) : null
                        }

                    </BlockGrid.GridPageRightLK>
                </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default PersonalPageLayout;