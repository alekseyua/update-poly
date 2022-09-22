import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DefaultAuthText from '../../Views/DefaultAuthText';
import CustomStylelink from '../../Views/CustomStylelink';
// import Text from '../Text';

const Unregistred = ({ page_type_auth, page_type_reg, stateOpen, openMenuRef }) => {
  return (
    <LayoutDropDownMenuAccount
      stateOpen={stateOpen}
      openMenuRef={openMenuRef}
    >
      <DefaultAuthText.HelpText>
        {/* <Text text={'signInToShop'} /> */}
        Войдите, чтобы делать покупки, отслеживать заказы и пользоваться личным кабинетом
      </DefaultAuthText.HelpText>
      <CustomStylelink variant={'black_full_width'} to={page_type_auth}>
        {/* <Text text={'signIn'} /> */}
        Вход
      </CustomStylelink>
      <DefaultAuthText.RegistrLink to={page_type_reg} />
    </LayoutDropDownMenuAccount>
  );
};

export default React.memo(Unregistred);
