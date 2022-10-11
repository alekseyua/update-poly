import React from 'react';
import Title from '../Title';
import { vectorIcon } from '../../images';
import Icon from '../Icon';

import style from './styles/index.module.scss';

const InfoCard = ({
  title = '1. Упрощение процессов поиска и закупки товаров',
  content = null,
}) => {
  return (
    <div className={style['wrapper-card_info-card']}>
      <div className={style['wrapper-card_info-title']}>
        <Icon className={style['wrapper-card_info-icon']} src={vectorIcon} height={20} width={20}/>
        <Title variant={'min_card'} type={'h3'}>
          {title}
        </Title>
      </div>
      <div className={style['wrapper-card_info-content']}>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

export default React.memo(InfoCard);

