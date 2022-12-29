import React, { useState } from "react";
import BurgerMenu from "./BurgerMenu";

const BurgerMenuContainer = ({ site_configuration, header_menu }) => {
    const [stateOpenBurgerMenu, setStateOpenBurgerMenu] = useState(false);
    const itemsListBurgerMenu = header_menu[4].children

    const hendlerToggleBurgerMenu = () => {
        setStateOpenBurgerMenu(c => !c);
    }

    return (
        <BurgerMenu
            itemsListBurgerMenu={itemsListBurgerMenu}
            hendlerToggleBurgerMenu={hendlerToggleBurgerMenu}
            stateOpenBurgerMenu={stateOpenBurgerMenu}
            site_configuration={site_configuration}
        />
    )
}

export default BurgerMenuContainer;