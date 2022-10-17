import React from 'react';
import Logo from '../../../Views/Logo/Logo';
import classNames from 'classnames';
import BottomHeaderMenu from './BottomHeaderMenu/BottomHeaderMenu';
import HeaderButtonsBottomLK from './HeaderButtonsBottomLK/HeaderButtonsBottomLK';
import style from './headerbottom.module.scss';

const HeaderBottom = ({
    cabinet_menu,
    currency,
    profile,
    ...props
}) => {
//  console.log('headerBottom props',props )

return (
        <div
            className={classNames({
                [style['bottom-header']]: true,
                // [style['scrolled']]: isScrolled,
                // [style['top']]: !promotionsAdds.isOpen,
            })}
        >
            <div className={style['bottom-header-wrapper']}>
                <div className={style['bottom-header__group']}>
                    <div className={style['bottom-header-logo']}>
                        <Logo
                            logo={props.logo}
                            logoLinkGoto={props.logoLinkGoto} 
                            siteLocation={'head-bottom'}
                        />
                    </div>

                    <div className={style['bottom-header__group-menu']}>
                        <BottomHeaderMenu main_menu={props.main_menu} />
                    </div>
                </div>

                <HeaderButtonsBottomLK 
                    site_configuration={props.site_configuration}
                    cabinet_menu = { cabinet_menu }
                    currency = { currency }
                    profile = { profile }
                />

            </div>
        </div>

    )
}

export default HeaderBottom;