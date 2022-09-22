import { Formik } from 'formik';
import React from 'react';
import ModalProvider from '../ModalProvider';
import Button from '../../Button';
import Form from '../../Form';
import Input from '../../Input';
import { restorePasswordFormScheme } from '../../../helpers/schemesFormic';
import Text from '../../../helpers/Text';
import ErrorField from '../../ErrorField';

const ModalNewPassword = ({ initialValuesModalNewPassword, resetUserPassword }) => {

  const errorsMessenge = {
    shortPass: Text({ text: 'shortPass' }),
    longPass: Text({ text: 'longPass' }),
    requiredField: Text({ text: 'requiredField' }),
    confirm_password: Text({ text: 'invalid.confirm.password' }),
  };

  return (
    <>
      <ModalProvider.ModalRestorePasswordTitle
        title={'Введите новый пароль'}
        mb={'30px'}
      />
      <Formik 
        onSubmit={resetUserPassword} 
        initialValues={initialValuesModalNewPassword}
        validationSchema={restorePasswordFormScheme(errorsMessenge)}
      >
        {({ handleSubmit, handleChange, handleBlur,  values, touched, isSubmitting, errors }) => {

          return (
            <Form
              onSubmit={handleSubmit}
              className="form-horizontal"
            >
              <Input
                type={'password'}
                className={'input-mt_20'}
                value={values.password}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'password'}
                label={'Новый пароль'}
                onChange={handleChange}
                onBlur={handleBlur}
                helpText={
                  errors.password ? <ErrorField message={errors.password} /> : null
                }
              />
              <Input
                type={'password'}
                className={'input-mt_20'}
                value={values.confirm_password}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                name={'confirm_password'}
                label={'Подтвердите новый пароль'}
                onChange={handleChange}
                onBlur={handleBlur}
                helpText={
                  errors.confirm_password  ? <ErrorField message={errors.confirm_password} /> : null
                }
              />
              <Button
                variant={'black_btn_full_width'}
                type={'submit'}
                disabled={!values.confirm_password || errors.confirm_password}
              >
                Изменить пароль
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default React.memo(ModalNewPassword);
