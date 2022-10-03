import React from 'react';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderBottom from './HeaderBottom/HeaderBottom'

const Header = (props) => {

    return (
        <>
            <HeaderTop {...props}
                logo={props.logo}
                logoLinkGoto={props.logoLinkGoto}
                header_menu={props.header_menu}
                currencies={props.currencies}
                setCurrencyCurrencies={props.setCurrencyCurrencies}
            />
            <HeaderBottom 
               logo={props.logo}
               logoLinkGoto={props.logoLinkGoto} 
               main_menu={props.main_menu}
               cabinet_menu={props.cabinet_menu}
               profile={props.profile}
               site_configuration={props.site_configuration}
            />
        </>
    )
}

export default Header;