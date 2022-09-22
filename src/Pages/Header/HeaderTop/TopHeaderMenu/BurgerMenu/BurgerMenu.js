import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "../../../../../Views/SocialLinks/SocialLinks";

import style from './styles/burger-menu.module.scss';


const BurgerMenu = ({
    itemsListBurgerMenu,
    hendlerToggleBurgerMenu,
    stateOpenBurgerMenu,
    site_configuration,
}) => {
    
    return <div
        className={style['burger-menu__wrapper']}
    >
        <div
            className={classNames({
                    [style['burger-menu__body']]:true,
                    [style['burger-menu__body--active']]: stateOpenBurgerMenu
                })
            }
        >
            {/* <div
                className={style['burger-menu__wrapper-list']}
            > */}
                <ul
                    className={style['burger-menu__list']}
                >                
                {
                    itemsListBurgerMenu.map( item => {
                        return <li
                        key={item.id}
                        className={style['burger-menu__item']}
                        >   
                        <Link 
                            onClick={hendlerToggleBurgerMenu}
                            className={style['burger-menu__link']}
                            to={item.url.split('/').pop()}
                        >
                            {item.title}
                        </Link>
                        </li>
                    })
                }
                <div
                    className={style['burger-menu__social']}
                >
                    <SocialLinks
                        site_configuration={site_configuration}
                    />
                </div>
                </ul>
            {/* </div> */}

        </div>
        <div
            className={classNames({
                [style['burger-menu__box-cross']]: true,
                [style['active']]: stateOpenBurgerMenu
            })
            }
            onClick={hendlerToggleBurgerMenu}
        >
            <span
            className={style['burger-menu__cross']}
            ></span>
        </div>
        
    </div>
}

export default BurgerMenu;
