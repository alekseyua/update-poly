import React from 'react';
import Icon from '../Icon/Icon';
import { ROLE } from '../../const';
import { retailtRegIcon, dropshipperRegIcon, wholesaleRegIcon, arrowRight } from '../../images';
import Button from '../Button';
import Text from '../../helpers/Text';

import style from './styles/registrationSelectRole.module.scss';

const RegistrationSelectRole = ({ setNextStep }) => {
  const setRoleDec = (roleRegister) => {
    setNextStep(roleRegister)
  };

  return (
    <div className={style['registrationSelectRole__wrapper']}>
      <Button
        onClick={() => setRoleDec(ROLE.RETAIL)}
        full
        className={style['registrationSelectRole__wrapper-btn']}
        variant={'changeRole'}
        data-cy={'role_retail_buyer'}
      >

        <div className={style['registrationSelectRole__wrapper-btn-icon--left']} slot={'icon-left'}>
          <Icon className={style['registrationSelectRole__wrapper-btn-icon--left-icon']} src={retailtRegIcon} />
        </div>
        
        <div className={style['registrationSelectRole__wrapper-btn-group-label']}>
          <span className={style['registrationSelectRole__wrapper-btn-label']}>
            <Text text={'retailBuyer'} />
          </span>
          <span className={style['registrationSelectRole__wrapper-btn-help--text']}>
            <Text text={'retailBuyer_HelpText'} />
          </span>
        </div>

        <Icon
          className={style['registrationSelectRole__wrapper-btn-icon--right']}
          src={arrowRight}
          slot={'icon-right'}
        />

      </Button>

      <Button
        onClick={() => setRoleDec(ROLE.WHOLESALE)}
        full
        className={style['registrationSelectRole__wrapper-btn']}
        variant={'changeRole'}
        data-cy={'role_wholesale_buyer'}
      >
        <div className={style['registrationSelectRole__wrapper-btn-icon--left']} slot={'icon-left'}>
          <Icon className={style['registrationSelectRole__wrapper-btn-icon--left-icon']} src={wholesaleRegIcon} />
        </div>
        <div className={style['registrationSelectRole__wrapper-btn-group-label']}>
          <span className={style['registrationSelectRole__wrapper-btn-label']}>
            <Text text={'wholesaleBuyer'} />
          </span>
          <span className={style['registrationSelectRole__wrapper-btn-help--text']}>
            <Text text={'wholesaleBuyer_HelpText'} />
          </span>
        </div>
        <Icon
          className={style['registrationSelectRole__wrapper-btn-icon--right']}
          src={arrowRight}
          slot={'icon-right'}
        />
      </Button>

      <Button
        onClick={() => setRoleDec(ROLE.DROPSHIPPER)}
        full
        className={style['registrationSelectRole__wrapper-btn']}
        variant={'changeRole'}
        data-cy={'role_dropshipper'}
      >
        <div className={style['registrationSelectRole__wrapper-btn-icon--left']} slot={'icon-left'}>
          <Icon className={style['registrationSelectRole__wrapper-btn-icon--left-icon']} src={dropshipperRegIcon} />
        </div>
        <div className={style['registrationSelectRole__wrapper-btn-group-label']}>
          <span className={style['registrationSelectRole__wrapper-btn-label']}>
            <Text text={'dropshipper'} />
          </span>
          <span className={style['registrationSelectRole__wrapper-btn-help--text']}>
            <Text text={'dropshipper_HelpText'} />
          </span>
        </div>
        <Icon
          className={style['registrationSelectRole__wrapper-btn-icon--right']}
          src={arrowRight}
          slot={'icon-right'}
        />
      </Button>
    </div>
  );
};

export default React.memo(RegistrationSelectRole);
