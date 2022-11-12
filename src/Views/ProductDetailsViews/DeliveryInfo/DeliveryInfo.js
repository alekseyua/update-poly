import React from 'react';
import { deliveryIcon } from '../../../images';
import Text from '../../../helpers/Text';
import { ROLE } from '../../../const';
import { Link } from 'react-router-dom';

import style from './styles/index.module.scss';
import Icon from '../../Icon';

const DeliveryInfo = ({ description = '', role }) => {
  
  return (
    <div className={style['prodpage__delivery-info']}> 
      <Link className={style['prodpage__delivery-info-title']}
        to={'/delivery'}
      >
        <Icon src={deliveryIcon} className={style['prodpage__delivery-info-icon']} width = { 35 } height = { 35 } />
        <span>
          {role === ROLE.RETAIL ? <Text text="options.free.delivery" /> : <Text text="deliveryOptions" />}
        </span>
      </Link>
      <div className={style['prodpage__delivery-info-description']}>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
};

export default React.memo(DeliveryInfo);
