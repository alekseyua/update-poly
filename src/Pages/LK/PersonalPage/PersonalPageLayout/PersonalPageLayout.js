import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import ContentEntryPersonalPage from '../../DetailsPage/ContentEntryPersonalPage';
import DeliveryAddresses from '../../DetailsPage/DeliveryAddresses';
import CreateStore from '../../../../Views/PersonalPageViews/CreateStore';


const PersonalPageLayout = ({
    cabinet_site_menu,
    addressDilivery,
    organization,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    username,
    balance,
    profile,
    links,
    shop,
    user,
    role,
}) => {

    console.log('is_has_shop', !!!is_has_shop)
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
                        <ContentEntryPersonalPage
                            profile={profile}  
                            role = { role }           
                        />
                        <DeliveryAddresses
                            addressDilivery = { addressDilivery }
                            profileId = { profile.id }
                        />
                        {
                            !!!is_has_shop ? (
                                <CreateStore
                                    className={'mobile'}
                                    role={role}
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