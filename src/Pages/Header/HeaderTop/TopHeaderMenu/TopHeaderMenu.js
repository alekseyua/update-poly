import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { v4 } from 'uuid'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import style from './topheadermenu.module.scss';

const TopHeaderMenu = (props) => {
    const [markIntro, setMarkIntro] = useState(null);
    const location = useLocation();
    const currentPath = location.pathname;
    const { header_menu } = props;

    useEffect(()=>{
        setMarkIntro('step3')
    },[])

    return (
        <>
            <div className={style['top-header-menu']}>
                <ul className={style['top-header-menu__list']}>
                {
                    header_menu.map(elMenu => {
                        return(
                            <li
                                key={`${elMenu.title}-${v4()}`}
                                className={classNames({
                                    [style['top-header-menu__li']]: true,
                                  })}
                                dataintro={elMenu.id === 5? markIntro : null}
                            >
                                <NavLink
                                    to={elMenu.url && elMenu.children.length === 0 ? elMenu.url.split('/').pop() : currentPath}
                                    className={ elMenu.children.length? '_icon-common-dropdown' : '' }
                                >
                                    {elMenu.title}
                                </NavLink>
                                    {
                                        elMenu.children.length ? 
                                        <ul
                                            className={
                                                classNames({
                                                    [style['top-header-submenu']]: true,
                                                    [style['top-header-submenu__list']]: true 
                                                  })
                                            }
                                        >
                                            {  
                                                elMenu.children.map( menuChild => {
                                                    return(
                                                        <li
                                                            className={ classNames({[style['item-list']]:true}) }
                                                            key={`${menuChild.id} ${v4()}`}
                                                        >
                                                            <NavLink
                                                                // data-cy={`header_menu_dropdown_cypress-link-${menuChild.id}`}
                                                                to={menuChild.url ? menuChild.url.split('/').pop() : null}
                                                                className={classNames({
                                                                    [style['top-header-menu__li-item']]: true,
                                                                    [style['light']]: true,
                                                                    [style['item-modificator']]: true,
                                                                    })}
                                                            >
                                                                {menuChild.title}
                                                            </NavLink>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        : null
                                    } 

                                    
                            </li>
                        )
                    })
                }
                </ul>
        </div>
        </>
    )
}

export default TopHeaderMenu;