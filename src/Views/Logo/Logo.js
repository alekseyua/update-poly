import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import style from './logo.module.scss';


const Logo = (props) => {
    const { siteLocation = '', logo = '', logoLinkGoto = '/' } = props;
    
    return (
        <NavLink
            to={logoLinkGoto}
            className={classNames({
                [style['logo']]: true,
                [style['logo-footer']]: (siteLocation === 'footer'),
                [style['logo-head-top']]: (siteLocation === 'head-top'),
                [style['logo-head-bottom']]: (siteLocation === 'head-bottom'),
            })}
        >
            <div
                className={style["logo-img"]}
                style={{
                    backgroundImage: `url(${logo})`
                }}
            ></div>
        </NavLink>
    )
}

export default Logo;