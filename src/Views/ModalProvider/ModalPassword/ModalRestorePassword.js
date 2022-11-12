import React from 'react';
import { Formik } from 'formik';
import { confirmEmail } from '../../../helpers/schemesFormic';
import ModalProvider from '../ModalProvider';
import ErrorBlock from '../../AuthorizationAndRegViews/ErrorBlock';
import ErrorField from '../../ErrorField';
import Text from '../../../helpers/Text';
import Button from '../../Button';
import Input from '../../Input';
import Form from '../../Form';


const ModalRestorePassword = ({ initialValueRestorePassword, resetUserPassword }) => {

  const errorsMessenge = {
    requiredField: Text({ text: 'requiredField' }),
    email: Text({ text: 'notValidEmail' }),
  };
  
  return (
    <>
      <ModalProvider.ModalRestorePasswordTitle title={'Сброс пароля'} mb={'30px'} />
      <Formik
        onSubmit={resetUserPassword}
        initialValues={initialValueRestorePassword}
        validationSchema={confirmEmail(errorsMessenge)}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isSubmitting, errors }) => {
          // console.log('values reset password', values)
          return (
            <Form 
              className="form-horizontal"
              onSubmit={handleSubmit}
            >
              <Input
                type={'email'}
                className={'input-mt_20'}
                value={values.email}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'email'}
                label={'Введите Ваш E-mail, указанный при регистрации'}
                onChange={handleChange}
                onBlur={handleBlur}
                helpText={
                  !!errors.email && touched.email ? <ErrorField message={errors.email} /> : null
                }
              />

              <ErrorBlock helpText={errors.serverError} />

              <Button
                variant={'black_btn_full_width'}
                type={'submit'}
                disabled={!values.email || errors.email}
              >
                Отправить код
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default React.memo(ModalRestorePassword);
