import React from 'react';
import Button from '../Button';
import Text from '../../helpers/Text';

const Logout = ({ onClick }) => {
  return (
    <Button variant={"logout"} data-cy={'logout_profile'} onClick={onClick}>
      <Text text={'logout'} />
    </Button>
  );
};

export default React.memo(Logout);
