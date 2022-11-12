import React from 'react';
import Text from '../../../helpers/Text';
import style from '../styles/wrapper.module.scss';

const BalanceStatus = ({ status }) => {
  
  return (
    <span 
    className = {!(status === 'Успешно') ? style["cabinet-status--graytext"] : style['cabinet-status--greentext']}>
      {!(status === 'Успешно') ? <Text text="expected" /> : <Text text="success" />}
    </span>
  );
};
export default React.memo(BalanceStatus);
