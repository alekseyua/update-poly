import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FooterMenu from '../../../Views/FooterMenu';
import { feedbackIcon, deliveryIcon } from '../../../images';
import Text from '../../../helpers/Text';
import Logo from '../../../Views/Logo';

import style1 from '../../../Views/FooterInfo/footerInfo.module.scss';
import style from './topFooter.module.scss';

const initialState = {
  menu: [],
  main_info_title: '',
  main_info: null,
  delivery_info: null,
  main_link: {
    name: Text({ text: 'feedback' }),
    icon: feedbackIcon,
  },
  delivery_link: {
    name: Text({ text: 'deliveryOptions' }),
    icon: deliveryIcon,
    url: '/',
  },
};

const TopFooter = ({
  footer_menu = [],
  site_configuration,
  role_configuration,
  openModalFeedback,
  role,
}) => {
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    let newState = {};
    newState.delivery_info = (
      <div dangerouslySetInnerHTML={{ __html: role_configuration.delivery_condition }}></div>
    );
    newState.main_info = (
      <div dangerouslySetInnerHTML={{ __html: site_configuration.contacts }}></div>
    );
    newState.menu = footer_menu.map((el) => {
      return {
        footer_menu_title: el.title,
        footer_menu: el.children.map((children) => {

          return {
            name: children.title,
            url: children.url.split('/').pop(),
          };
        }),
      };
    });
    setstate({
      ...initialState,
      ...newState,
    });
  }, []);


  return (
    <div className={style['top-footer']}>
      <div className={style['top-footer__container']}>
        <div className={style['top-footer__wrap']}>

          <div className={style['top-footer__inner']}>
            <div className={style['top-footer__left']}>
              <div className={style1['footer-logo']}>
                <Logo
                  logo={site_configuration.logo_2}
                  siteLocation={'footer'}
                />
              </div>
              <div>
                <div className={style1['footer-info__content']}>{state.main_info}</div>
                <div className={style1['footer-info__link']} onClick={openModalFeedback}>
                  <i className={style1['footer-info__link-img']}>
                    <img src={state.main_link.icon} alt="footer icon" width={'10px'} height={'10px'} />
                  </i>
                  <span className={style1['footer-info__link-name']}>{state.main_link.name}</span>
                </div>
              </div>
            </div>

            <div className={style['top-footer__center']}>
              {state.menu.map((el, i) => {
                return <FooterMenu key={i} menu={el.footer_menu} title={el.footer_menu_title} role={role} />;
              })}
            </div>

            <div className={style['top-footer__right']}>
              <h4 className={style1['footer-info__title']}>ДОСТАВКА</h4>
              <div className={style['footer-info__content']}>{state.delivery_info}</div>
              <Link className={style1['footer-info__link']} to={'delivery'}>
                <i className={style1['footer-info__link-img']}>
                  <img src={state.delivery_link.icon} alt="footer icon" width={'10px'} height={'10px'} />
                </i>
                <span className={style1['footer-info__link-name']}>{state.delivery_link.name}</span>
              </Link>
            </div>
          </div>

          <div className={style['top-footer__center--mob']}>
            {state.menu.map((el, i) => {
              return <FooterMenu key={i} menu={el.footer_menu} title={el.footer_menu_title} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopFooter);
