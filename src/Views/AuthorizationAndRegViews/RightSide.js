import React from 'react';
import style from './styles/rightSide.module.scss';
import { ROLE } from '../../const';

const RightSide = ({ children, role, openModalFeedbackReedFile, site_configuration }) => {
  const privacyPolicy = () => {
    openModalFeedbackReedFile(site_configuration.policy, 'Политика конфиденциальности');
  }
  const heandlerPolicy = () => {
    openModalFeedbackReedFile(site_configuration.public_offer_1, 'Пользовательское соглашение');
  }
  
  return (
    <div className={style['rightSide__right-side']}>
      <div className={style['rightSide__wrapper']}>{children}</div>
      {ROLE.UNREGISTRED === role ? (
        <div className={style['rightSide__links']}>
          <div onClick={privacyPolicy}>Политика конфиденциальности</div>
          <div onClick={heandlerPolicy}>Пользовательское соглашение</div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(RightSide);
