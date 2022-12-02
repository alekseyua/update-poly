import React from 'react';
import AccessCheck from '../../../../Views/ContentDropDownAccount/AccessCheck';
import RejectedAccount from '../../../../Views/ContentDropDownAccount/RejectedAccount';
import Unregistred from '../../../../Views/ContentDropDownAccount/Unregistred';
import Retailer from '../../../../Views/ContentDropDownAccount/Retailer';
import Dropshipper from '../../../../Views/ContentDropDownAccount/Dropshipper';
import Wholesale from '../../../../Views/ContentDropDownAccount/Wholesale';

import { ROLE } from '../../../../const';

const DropdownMenuAccount = (props) =>{
    const { stateOpen, getKeyForAccess, logOut, openMenuRef, openModalFeedback, profile,site_configuration, cabinet_menu } = props;
    const { role, status, user = {}, shop = { is_has_shop: false } } = profile;
    const amountNotifications = profile?.notifications;
    const {
      page_type_auth,
      page_type_reg,
    } = site_configuration;

    const { first_name = 'Имя', last_name = 'Фамилия', email = '', checkEmail = false } = user;
  
    const variantDropDown = {
        accessCheck: (
          <AccessCheck
            first_name={first_name}
            last_name={last_name}
            logOut={logOut}
            page_type_auth={page_type_auth}
            checkEmail = { user.checkEmail }
            role={role}
            email={email}
            stateOpen={stateOpen}
            openMenuRef={openMenuRef}
            
            getKeyForAccess = { getKeyForAccess }
            openModalFeedback = { openModalFeedback }
          />
        ),
        rejectedAccount: (
          <RejectedAccount
            first_name={first_name}
            last_name={last_name}
            logOut={logOut}
            page_type_auth={page_type_auth}
            openMenuRef={openMenuRef}
            stateOpen={stateOpen}
          />
        ),
        unregistred: (
            <Unregistred 
                page_type_auth={page_type_auth} 
                page_type_reg={page_type_reg} 
                openMenuRef={openMenuRef}
                stateOpen={stateOpen}
            />
        ),
        retail: (
          <Retailer
            first_name={first_name}
            last_name={last_name}
            cabinet_menu={cabinet_menu}        
            logOut={logOut}
            page_type_auth={page_type_auth}
            openMenuRef={openMenuRef}
            stateOpen={stateOpen}
            amountNotifications={amountNotifications}
          />
        ),
        dropshipper: (
          <Dropshipper
            first_name={first_name}
            last_name={last_name}
            cabinet_menu={cabinet_menu}
            shop={shop}
            logOut={logOut}
            stateOpen={stateOpen}
            openMenuRef={openMenuRef}
            amountNotifications={amountNotifications}
          />
        ),
        wholesale: (
          <Wholesale
            first_name={first_name}
            last_name={last_name}
            cabinet_menu={cabinet_menu}
            shop={shop}
            logOut={logOut}
            stateOpen={stateOpen}
            openMenuRef={openMenuRef}
            amountNotifications={amountNotifications}
          />
        ),
      };
      switch (status) {
        case 0:
          return variantDropDown.unregistred;
        case 1:
          return variantDropDown.accessCheck;
        case 2:
          return variantDropDown.rejectedAccount;
      }
      switch (role) {
        case ROLE.UNREGISTRED:
          return variantDropDown.unregistred;
        case ROLE.RETAIL:
          return variantDropDown.retail;
        case ROLE.DROPSHIPPER:
          return variantDropDown.dropshipper;
        case ROLE.WHOLESALE:
          return variantDropDown.wholesale;
        default:
          return null;
      }
}

export default DropdownMenuAccount;