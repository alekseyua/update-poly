import React from 'react';
import {toolTipIcon} from '../../../images';
import Icon from '../../Icon';
import Button from '../../Button';

import style from './styles/headchat.module.scss';

const HeadChat = ({ }) => {

  const heandlerClickInfo = () => {
    // setModalStates({
    //   content: (<>
    //     <ModalContentViews.CloseBtn closeModal={closeModal} />
    //     <p
    //       style={
    //         {
    //           fontSize: '18px',
    //           padding: '10px 25px',

    //         }
    //       }
    //     >
    //       Сообщения в чате отправляются только для Менеджера по упаковке. Как только статус заказа будет «Заказ на упаковке», Ваши сообщения станут доступны Менеджеру, и  в случае необходимости, он сможет ответить в этом же чате
    //     </p>

    //   </>),
    //   show: true,
    //   addClass: 'modal-info-order',
    // });
  }

  return (
    <div className={style['cabinet-orders-details__chat-head']}>
      <div className={style['cabinet-orders-details__pay-status']}>
        <div className='inner-areon'>
          <Button
            variant="info"
            className={style['cabinet-orders-details__tooltip-icon']}
            onClick={heandlerClickInfo}
          >
            <Icon src={toolTipIcon} with={20} height = {20} />
          </Button>
        </div>
      </div>      
      Чат по заказу
      <div className={style['cabinet-orders-details__chat-mobbtn']}>&#9660;</div>
    </div>
  );
};

export default React.memo(HeadChat);
