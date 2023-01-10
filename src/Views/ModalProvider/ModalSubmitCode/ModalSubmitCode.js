import { Formik } from 'formik';
import React from 'react';
import ModalProvider from '../ModalProvider';
import BlockSpinner from '../../SpinnerWrapper';
import ErrorField from '../../ErrorField';
import Button from '../../Button';
import Input from '../../Input';
import Form from '../../Form';
import Text from '../../../helpers/Text';
import { ROLE } from '../../../const';


const ModalSubmitCode = ({ initialValuesSubmitCode, handleSubmit, postKeyFromMail, roleRegister }) => {
  
  return (
    <>
      <ModalProvider.ModalRestorePasswordTitle title={'Введите код'} mb={'10px'} />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValuesSubmitCode}
      >
        {(props) => {
          const { setValues, values, errors, setErrors, handleSubmit} = props;
          return (
            <Form
              id={'modal-submit-code'}
              className={"form-horizontal"}
              onSubmit={(e) => handleSubmit(e, values, setErrors)}
            >
              <ModalProvider.ModalRestorePasswordDesc mb={'5px'}>
                {/* добавить надписи для разных ролей */}
                <div className={'modal-message'}>                  
                  {/* Чтобы воспользоваться всеми возможностями сотрудничества, подтвердите почту и дождитесь проверки администратора */}
                  {
                    roleRegister === ROLE.RETAIL?
                       null
                      : Text({ text: 'lk_confirm_email'})
                  }
                </div>
                Мы отправили код подтверждения на Ваш e-mail
              </ModalProvider.ModalRestorePasswordDesc>
              <Input
                type={'text'}
                value={values.submit_code}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'submit_code'}
                placeholder={'Введите код'}
                // label={''}
                onChange={(e) => {
                  let value = e.target.value.trim();
                  setValues(
                    {
                      ...values,
                      'submit_code': value,
                      'activeBtn': value.length > 5 ? false : true
                    }
                  )
                }}
                helpText={ !!values.errorCod || !!errors.errorCod ? <ErrorField message={values.errorCod ?? errors.errorCod} /> : null}
              />
              <br />
              <Button
                form={'modal-submit-code'}
                variant={'black_btn_full_width'}
                type={'submit'}
                disabled={values.activeBtn}
              >
                отправить код
                {!values.activeBtn && values.activeSpinner ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad={50} /> : null}
              </Button>
              <ModalProvider.ModalSubmitCodeView email={values.email} postKeyFromMail={postKeyFromMail} />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default React.memo(ModalSubmitCode);
