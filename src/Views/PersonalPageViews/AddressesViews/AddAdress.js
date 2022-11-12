import React from 'react';
import Button from '../../Button';
import Text from '../../../helpers/Text';

import style from '../styles/wrapper.module.scss';

const AddAdress = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick} 
      variant={'cabinet-addres'} 
      className={style['cabinet-address__new']} 
      data-cy={'create_address_button'}
    >
      <span className={style['cabinet-address__new-label']}>
        + <Text text={'add.adress'} />
      </span>
    </Button>
  );
};
export default React.memo(AddAdress);
