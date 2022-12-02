import React from 'react';
import { Formik } from 'formik';
import Input from '../../../Views/Input';
import ErrorField from '../../../Views/ErrorField';
import Button from '../../../Views/Button';
import CheckBox from '../../../Views/CheckBox';
import Text from '../../../helpers/Text';
import { signUpFirstFormSchema } from '../../../helpers/schemesFormic';
import AuthorizationAndRegViews from '../../../Views/AuthorizationAndRegViews';
import { toolTipIcon } from '../../../images';
import Error from '../../../Views/Error';
import Icon from '../../../Views/Icon/Icon';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Form from '../../../Views/Form';
import Offset from '../../../Views/Offset';
const errorsMessenge = {
  requiredField: Text({ text: 'requiredField' }),
  shortLastName: Text({ text: 'short.last.name' }),
  longLastName: Text({ text: 'longLastName' }),
  shortFirstname: '',
  longFirstname: Text({ text: 'long.first.name' }),
  shortPatronymic: '',
  longPatronymic: Text({ text: 'long.patronymic' }),
  shortusername: Text({ text: 'short.nickname' }),
  longusername: Text({ text: 'long.nickname' }),
  username: Text({ text: 'incorect.username' }),
  symbol: Text({ text: 'symbol' })
};


const RegistrationFormFirst = ({ 
  onSaveFormData, 
  initialValues,
  loading,
}) => {
console.log({initialValues})
  return (
    <Formik
      validationSchema={signUpFirstFormSchema(errorsMessenge)}
      initialValues={initialValues}
      onSubmit={onSaveFormData}
    >
      {
        ({ values, handleBlur, errors, touched, setFieldValue, handleSubmit })=>{
          console.log({values})
          return (
            <Form id={'form-second-data'} onSubmit={handleSubmit}>
              <Input
                autofocus
                value={values.lastname}
                variant={'largeCustomLabel'}
                className={'input-mt_20'}
                name={'lastname'}
                data-cy={'registration_last_name'}
                autocomplete={'off'}
                onBlur={handleBlur}
                onChange={(e) => {setFieldValue('lastname', e.target.value.trim())}}
                placeholder={Text({ text: 'enterLastName' })}
                label={Text({ text: 'lastname' })}
                helpText={errors.lastname && touched.lastname ? <ErrorField message={errors.lastname} /> : null}
              />
              <Input
                className={'input-mt_20'}
                value={values.firstname}
                variant={'largeCustomLabel'}
                name={'firstname'}
                data-cy={'registration_first_name'}
                autocomplete={'off'}
                onBlur={handleBlur}
                label={Text({ text: 'firstname' })}
                placeholder={Text({ text: 'enterFirstName' })}
                onChange={(e) => setFieldValue('firstname', e.target.value.trim())}
                helpText={errors.firstname && touched.firstname ? <ErrorField message={errors.firstname} /> : null}
              />
              <Input
                className={'input-mt_20'}
                value={values.patronymic}
                variant={'largeCustomLabel'}
                placeholder={Text({ text: 'enterPatronymic' })}
                name={'patronymic'}
                onBlur={handleBlur}
                data-cy={'registration_middle_name'}
                autocomplete={'off'}
                label={Text({ text: 'patronymic' })}
                onChange={(e) => setFieldValue('patronymic', e.target.value.trim())}
                helpText={errors.patronymic && touched.patronymic ? <ErrorField message={errors.patronymic} /> : null}
              />
              <AuthorizationAndRegViews.WrapperInputForTooltip
                content={Text({ text: 'tooltipDatausername' })}
                trigger={'hover'}
                local={'top'}
              >
                <Input
                  className={'input-mt_20'}
                  value = {values.username}
                  variant={'largeCustomLabel'}
                  placeholder={Text({ text: 'enterusername' })}
                  name={'username'}
                  onBlur={handleBlur} 
                  data-cy={'registration_nick_name'}
                  autocomplete={'off'}
                  label={Text({ text: 'username' })}
                  onChange={(e) => setFieldValue('username', e.target.value.trim())}
                  helpText={errors.username && touched.username ? <ErrorField message={errors.username} /> : null}
                >
                  <Icon slot={'suffix'} src={toolTipIcon} height={20} width={20} />
                </Input>
              </AuthorizationAndRegViews.WrapperInputForTooltip>

              <AuthorizationAndRegViews.WrapperCheckBox>
                <CheckBox 
                   checked = { values.iAgreeDataProcessing }
                   name = {'iAgreeDataProcessing'}
                   className = { 'input-mt_20' }
                   data-cy = { 'registration_check_box' }
                   label = { Text({ text: 'iAgreeDataProcessing' }) }
                   value = { values.iAgreeDataProcessing } 
                   onChange = { e => {
                     let checked = e.checked;
                     if (checked === null) return;
                     setFieldValue('iAgreeDataProcessing', !checked);
                   }}
                />
                  { values.iAgreeDataProcessing ? <ErrorField message={errors.iAgreeDataProcessing} /> : null }
                  {errors.iAgreeDataProcessing && touched.iAgreeDataProcessing ? <Error message={!!errors.iAgreeDataProcessing?'необходимо соглассие на обработку данных': null} /> : null}
              </AuthorizationAndRegViews.WrapperCheckBox>
                <Button
                  form={'form-second-data'}
                  variant={'black_btn_full_width'}
                  type={'submit'}
                  data-cy={'registration_button'}
                >
                  <Text text={'saveAndContinue'} />
                  {loading ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null}
                </Button>

            </Form>
          )
        }
      }
    </Formik>
  );
};

export default React.memo(RegistrationFormFirst);
