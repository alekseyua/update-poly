import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DropDownHeaderLK from '../../Views/DropDownHeaderLK';
import Text from '../../helpers/Text';

const Retailer = ({
  first_name = 'first_name',
  last_name = 'last_name',
  cabinet_menu,
  shop,
  logOut,
  openMenuRef,
  stateOpen,
  amountNotifications,
}) => {
  return (
    <LayoutDropDownMenuAccount
      stateOpen={stateOpen}
      openMenuRef={openMenuRef}
    >
      <DropDownHeaderLK.PersonalInfo
        first_name={first_name}
        last_name={last_name}
        titleRole={Text({ text: 'retailBuyer' })}
      />
      <DropDownHeaderLK.Line />
      <DropDownHeaderLK.Menu
        cabinet_menu={cabinet_menu}
        amountNotifications={amountNotifications}
      />

      {shop?.is_has_shop ? (
        <DropDownHeaderLK.MarketInfo
          is_has_shop={shop.is_has_shop}
          shop_id={shop.shop_id}
          to={"/moj-magazin"}
          image={shop.shop_logo}
          title={shop.shop_title}
        />
      ) : null}
      <DropDownHeaderLK.Line />
      <DropDownHeaderLK.Logout onClick={logOut} />
    </LayoutDropDownMenuAccount>
  );
};

export default React.memo(Retailer);
