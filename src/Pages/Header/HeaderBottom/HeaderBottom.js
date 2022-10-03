import React from 'react';
import Logo from '../../../Views/Logo/Logo';
import classNames from 'classnames';
import BottomHeaderMenu from './BottomHeaderMenu/BottomHeaderMenu';
import HeaderButtonsBottomLK from './HeaderButtonsBottomLK/HeaderButtonsBottomLK';
import style from './headerbottom.module.scss';

const HeaderBottom = ({
    ...props
}) => {
//  console.log('headerBottom props',props )
 const { profile } = props;
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
                    cabinet_menu={props.cabinet_menu}
                    profile={profile}
                />

            </div>
        </div>

    )
}

export default HeaderBottom;