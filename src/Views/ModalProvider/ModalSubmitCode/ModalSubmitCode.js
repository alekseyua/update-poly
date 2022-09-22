import { Formik } from 'formik';
import React from 'react';
import ModalProvider from '../ModalProvider';
import ErrorField from '../../ErrorField';
import Button from '../../Button';
import Input from '../../Input';
import Form from '../../Form';


const ModalSubmitCode = ({ initialValuesSubmitCode, handleSubmit, postKeyFromMail }) => {


  return (
    <>
      <ModalProvider.ModalRestorePasswordTitle title={'Введите код'} mb={'10px'} />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValuesSubmitCode}
      >
        {(props) => {
          const { setValues, values, errors, setErrors, handleSubmit} = props;
          // console.log('values submit code = ', values)
          return (
            <Form
              id={'modal-submit-code'}
              className={"form-horizontal"}
              onSubmit={(e) => handleSubmit(e, values, setErrors)}
            >
              <ModalProvider.ModalRestorePasswordDesc mb={'5px'}>
                {/* добавить надписи для разных ролей */}
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
                helpText={!!errors.errorCod ? <ErrorField message={errors.errorCod} /> : null}
              />
              <br />
              <Button
                form={'modal-submit-code'}
                variant={'black_btn_full_width'}
                type={'submit'}
                disabled={values.activeBtn}
              >
                отправить код
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