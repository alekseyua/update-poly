import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SocialLinks from '../../../Views/SocialLinks';
import PaymentMethods from '../../../Views/PaymentMethods';
import { visaIcon, masterCardIcon, applePayIcon, mirIcon } from '../../../images';
// import Settings from '../../#lifehack/Settings';
import { ROLE } from '../../../const';

import style from './bottomFooter.module.scss';

const BottomFooter = ({ site_configuration, year, policy_1,policy_2, openModalFeedbackReedFile, front_admin, role }) => {
  // const {social_links, payment_methods} = props;

  const payment_methods = [
    {
      icon: visaIcon,
    },
    {
      icon: masterCardIcon,
    },
    {
      icon: applePayIcon,
    },
    {
      icon: mirIcon,
    },
  ];
  const heandlerPolicy = () => {
    let link = role === ROLE.WHOLESALE? site_configuration.public_offer_2 : site_configuration.public_offer_1;
    openModalFeedbackReedFile(link, 'Публичная оферта');
  }

  return (
    <div className={style['bottom-footer']}>
      <div className={'bottom-footer__container'}>
        <div className={style['bottom-footer__wrap']}>
          <div className={style['bottom-footer__info']}>
            <span className={style['bottom-footer__copyright']}>&copy; {year} FASHIONTOWN </span>
            {/* {front_admin?<Settings nameComponent={'BottomFooter-offer'} /> : null } */}
            <div
              className={style['bottom-footer__offer']}
              onClick={heandlerPolicy}
            >
              Публичная оферта
            </div>
          </div>
          <SocialLinks site_configuration={site_configuration} />
          <PaymentMethods payment_methods={payment_methods} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomFooter);
