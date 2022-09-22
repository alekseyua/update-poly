import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../helpers/Text';
import { defaultImageMarketInfo } from '../../images';
import Icon from '../Icon';

import style from './styles/marketInfo.module.scss';

const MarketInfo = ({ image, to = '#', title = 'FASHION STORE' }) => {
  return (
    <div className={style['marketInfo__wrapper']}>
      <div className={style['marketInfo__wrapper-ellipse']}>
        <Icon  src={image ? image : defaultImageMarketInfo} />
      </div>
      <div className={style['marketInfo__wrapper-name_and_link']}>
        <p className={style['marketInfo__wrapper-name_and_link-name']}>
          {title}
          <br />
          <span className={style['marketInfo__wrapper-name_and_link-link']}>
            <Link target="_blank" to={to}>
              <Text text={'onlineStore'} />
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default React.memo(MarketInfo);
