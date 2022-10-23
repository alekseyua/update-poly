import React from 'react';
import {toolTipIcon} from '../../../images';
import Icon from '../../Icon';
import Button from '../../Button';

import style from './styles/headchat.module.scss';

const HeadChat = ({ 
  heandlerClickInfo 
}) => {

  return (
    <div className={style['cabinet-orders-details__chat-head']}>
      <div className={style['cabinet-orders-details__pay-status']}>
        <div className='inner-areon'>
          <Button
            variant="info"
            className={style['cabinet-orders-details__tooltip-icon']}
            onClick = { () => heandlerClickInfo({status: 'chat'}) }
          >
            <Icon src={toolTipIcon} width={20} height = {20} />
          </Button>
        </div>
      </div>      
      Чат по заказу
      <div className={style['cabinet-orders-details__chat-mobbtn']}>&#9660;</div>
    </div>
  );
};

export default React.memo(HeadChat);
