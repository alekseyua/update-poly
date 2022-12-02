import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DefaultAuthText from '../../Views/DefaultAuthText';
import DropDownHeaderLK from '../../Views/DropDownHeaderLK';
import Button from '../../Views/Button';
import { ROLE } from '../../const';
import Text from '../../helpers/Text';
import BlockSpinner from '../../Views/SpinnerWrapper';

const AccessCheck = ({ 
  first_name = 'first_name', 
  last_name = 'last_name', 
  logOut, 
  role,
  checkEmail,
  email,
  stateOpen,
  openMenuRef,
  getKeyForAccess, 
  openModalFeedback,
  }) => {

  return (
    <LayoutDropDownMenuAccount
      stateOpen={stateOpen}
      openMenuRef={openMenuRef}
    >
      <DropDownHeaderLK.PersonalInfo
        first_name={first_name}
        last_name={last_name}
        titleRole={
          role === ROLE.RETAIL?
            Text({ text: 'retailBuyer' })
            : role === ROLE.DROPSHIPPER?
              Text({ text: 'dropshipper' })
              : role === ROLE.WHOLESALE?
                Text({ text: 'wholesaleBuyer' })
                : null
        }
      />
      <DropDownHeaderLK.Line /> 
      <DefaultAuthText.HelpText>
      {role === ROLE.RETAIL? 
        Text({ text: 'lk_success_info' })
        : !checkEmail? 
          Text({ text: 'lk_confirm_email' })
          : Text({ text: 'lk_admin_wait_status' })
      }
      </DefaultAuthText.HelpText>
      { role === ROLE.RETAIL?
          <Button full variant={'gray_full_width'} onClick={()=>getKeyForAccess({
            username: first_name,          
            email: email
          })} 
          >
            <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-right'} bodrad = { 50 }/>
            {Text({ text: 'confirm' })}
          </Button>
          : <Button 
              full 
              variant={'gray_full_width'} 
              to={'#'} 
              onClick={()=> checkEmail? openModalFeedback() : getKeyForAccess({
                                    username: first_name,          
                                    email: email
                                })
                      }
              addClass = { 'auth-email' } 
            >
              <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-right'} bodrad = { 50 }/>
              { !checkEmail? Text({text: 'confirm_mail'}) : Text({text: 'varify_access'}) }
            </Button>
      }
      <DropDownHeaderLK.Logout onClick={logOut} />
    </LayoutDropDownMenuAccount>
  );
};
export default React.memo(AccessCheck);
