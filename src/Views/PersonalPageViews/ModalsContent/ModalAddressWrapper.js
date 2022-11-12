import React, { useState } from 'react';
import Text from '../../../helpers/Text';
import Button from '../../Button';
import Spinner from '../../SpinnerWrapper/Spinner';

import style from '../styles/wrapper.module.scss';

const ModalAddressWrapper = ({ children, closeModal, isSaved}) => {
  const { dispatch, faq } = useStoreon('faq');
  const [isShowChat, setisShowChat] = useState(faq.show);

  const openFormRequest = () => {
    console.log(`open form request`)
    dispatch('faq/update', {
      show: !isShowChat,
    });
  }

  return (
    <div className="cabinet-modal__wrap">
      <div 
        onClick={closeModal} 
        slot={"close-button"} 
        className="cabinet-modal__close-btn" 
        data-cy={'modal_add_address_close_modal'}
      >
        <i></i>
      </div>
      <div className="cabinet-modal__heading">Адрес доставки</div>
      <div>Если Вашей страны нет в списке, просьба создать запрос на добавление страны через 
            <span
              className={style["cabinet-form__link-feedback"]}
              onClick={()=>openFormRequest()}  
            > окно </span>
      обратной связи</div>
      <div className="cabinet-modal__content">
        {children}
        <div className={style["cabinet-form__end"]}>
          <div className={style["cabinet-form__end--left"]}>
            <Button onClick={closeModal} type={'button'} variant={'cabinet_default_border'} data-cy={'modal_add_address_cancel_button'}>
              <Text text={'cancellation'} />
            </Button>
          </div>
          <div className={style['cabinet-form__end--right']}>
            <Button type={'submit'} variant={'cabinet_default'} data-cy={'modal_add_address_save_button'}>
              <Text text={'save'} />
              {!isSaved ? <Spinner slot="icon-right" /> : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(ModalAddressWrapper);
