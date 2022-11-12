import React from 'react';
import { searchIcon } from '../../../images';
import Icon from '../../Icon';
import Input from '../../Input';

import style from '../styles/index.module.scss';

const OrderingAddressSearcheInput = ({ searchAddressRenderData }) => {
  return (
    <Input
      onChange={(e) => {
        searchAddressRenderData(e.target.value);
      }}
      placeholder="Поиск по ФИО"
      className={style['ordering__address-search']}
    >
      <Icon slot="prefix" className={style['ordering__address-search-icon']} src={searchIcon} height={20} width={20}/>
    </Input>
  );
};

export default React.memo(OrderingAddressSearcheInput);
