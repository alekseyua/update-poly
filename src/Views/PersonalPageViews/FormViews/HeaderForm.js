import React from 'react';
import Text from '../../../helpers/Text';
import { warningIcon } from '../../../images';
import Button from '../../Button';
import ToolTip from '../../ToolTip';

import style from '../styles/wrapper.module.scss';

const HeaderForm = ({ deleteAccaunt, title = Text({ text: 'delete.account' }) }) => {
  return (
    <div className={style['cabinet-form-block__top']}>
      <div className={style['cabinet-form-block__heading']}>
        <Text text={'personal.data'} />
      </div>
      <Button
        onClick={deleteAccaunt}
        variant={'cabinet-delaccount'}
        className={style['cabinet-delaccount']}
        data-cy={'Button_cabinet_delaccount'}
      >
        <span className={style['cabinet-delaccount__text']}>
          {title}
        </span>
        <ToolTip
          placement="bottom"
          slot={'icon-right'}
          className={style['tooltip']}
          content={
            'Вместе с аккаунтом мы удалим из системы вашу личную информацию, историю заказов и покупок.'
          }
        >
        <img
          slot={'icon-right'}
          className={style['cabinet-delaccount__icon']}
          src={warningIcon}
          alt="warning"
        />
        
        </ToolTip>
      </Button>
    </div>
  );
};
export default React.memo(HeaderForm);
