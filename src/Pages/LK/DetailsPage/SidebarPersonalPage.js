import React from 'react';
import PersonalPageViews from '../../../Views/PersonalPageViews';

// import introJs from 'intro.js';
  
  
  const SidebarPersonalPage = ({
    cabinet_site_menu,
    cabinet_menu,
    create_shop,
    is_has_shop,
    currency,
    username,
    balance,
    role,
    shop,
  }) => {

    return (
    <PersonalPageViews.Container >
      <PersonalPageViews.UserRoutingPanel 
        cabinet_menu = { cabinet_menu }
        username = { username }
        currency = { currency }
        balance = { balance }
        role = { role }
      />
      {
        !is_has_shop ? (
            <PersonalPageViews.CreateStore 
                create_shop = { 'motivacionnaya-strannica-im' }
                className = { 'desktop'}
                role = { role }
            />
            ) : (
                <PersonalPageViews.StoreRoutingPanel 
                    shop = { shop }
                    cabinet_site_menu = { cabinet_site_menu }
                />
            )
      }
    </PersonalPageViews.Container>
    );
  };
  
  export default React.memo(SidebarPersonalPage);
  