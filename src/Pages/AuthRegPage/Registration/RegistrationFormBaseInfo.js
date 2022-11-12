import React from 'react';
import { Formik } from 'formik';
import Phone from 'react-phone-number-input'
import { ROLE } from '../../../const';
import Input from '../../../Views/Input';
import ErrorField from '../../../Views/ErrorField';
import { toolTipIcon, successIcon } from '../../../images';
import Button from '../../../Views/Button';
import CheckBox from '../../../Views/CheckBox';
import { signUpBaseInfoFormSchema } from '../../../helpers/schemesFormic';
import Select from '../../../Views/Select';
import AuthorizationAndRegViews from '../../../Views/AuthorizationAndRegViews';
import Text from '../../../helpers/Text';
import Icon from '../../../Views/Icon/Icon';
import Form from '../../../Views/Form';

import BlockSpinner from '../../../Views/SpinnerWrapper';
import PersonalPageViews from '../../../Views/PersonalPageViews';

const RegistrationFormBaseInfo = ({
  onSaveFormData,
  initialValues,
  serverError,
  loading,
  role,
}) => {
  const getIconSuccess = (error, value) => {
    // !!errors.password || !!!values.password ? toolTipIcon : successIcon;
    if (!!error || value === '' || value === undefined) {
      return toolTipIcon;
    } else {
      return successIcon;
    }
  };
  const errorsMessenge = {
    phone: Text({ text: 'notValidPass' }),
    shortPass: Text({ text: 'shortPass' }),
    longPass: Text({ text: 'longPass' }),
    requiredField: Text({ text: 'requiredField' }),
    email: Text({ text: 'notValidEmail' }),
    longEmail: Text({ text: 'notValidEmail' }),
    confirm_password: Text({ text: 'invalid.confirm.password' }),
  };
  const whereDidYouHearAboutServiceOptions = [
    {
      title: Text({ text: 'internetAdvertising' }),
      value: Text({ text: 'internetAdvertising' }),
    },
    {
      title: Text({ text: 'fromSocialNetworks' }),
      value: Text({ text: 'fromSocialNetworks' }),
    },
    {
      title: Text({ text: 'fromFrends' }),
      value: Text({ text: 'fromFrends' }),
    },
    {
      title: Text({ text: 'other' }),
      value: Text({ text: 'other' }),
    },
  ];

  return (
    <Formik
      validationSchema={signUpBaseInfoFormSchema(errorsMessenge)}
      initialValues={initialValues}
      onSubmit={onSaveFormData}
    >
      {
        (props)=>{
          const {values, handleBlur, errors, touched, setFieldError, setFieldValue, handleSubmit} = props;

          return (
            <Form id={'form-first-data'} onSubmit={handleSubmit}>
              {/* //! email */}
              <Input
                value={values.email}
                variant={'largeCustomLabel'}
                className={'input-mt_20'}
                name={'email'}
                validateOnBlur
                placeholder={Text({ text: 'enterEmail' })}
                autocomplete={'off'}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue('email', e.target.value.trim())}
                label={Text({ text: 'email_address' })}
                helpText={errors.email && touched.email ? <ErrorField message={errors.email} /> : null}
                data-cy={'registration_email'}
              />

              {/* //! phone */}
              {/* <Input
                type={'phone'}
                className={'input-mt_20'}
                variant={'largeCustomLabel'}
                value={values.phone} 
                name={'phone'}
                placeholder={Text({ text: 'enterPhone' })}
                autocomplete={'off'}
                label={Text({ text: 'mobPhone' })}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue('phone', e.target.value);
                }}
                helpText={errors.phone && touched.phone? <ErrorField message={errors.phone} /> : null}
                data-cy={'registration_phone'}
              /> */}
              <PersonalPageViews.FormGroup phoneAuth>

               <Phone
                placeholder = { Text({ text: 'enterPhone' }) }
                value = { values.phone }
                onChange = { phone => {
                  setFieldValue('phone', phone) 
                }}
                defaultCountry = {'RU'}
                smartCaret = { true }
                limitMaxLength = { true }
                className = { 'form-input-number-phone-lk'}                        
                />
                {errors.phone && touched.phone? <ErrorField message={errors.phone} /> : null}
              </PersonalPageViews.FormGroup>
              
              {/* //! password */}
              <AuthorizationAndRegViews.WrapperInputForTooltip
                content={Text({ text: 'tooltipDataPassword' })}
                trigger={'hover'}
              >
                <Input
                  className={'input-mt_20'}
                  value={values.password}
                  variant={'largeCustomLabel'}
                  placeholder={Text({ text: 'enterPassword' })}
                  name={'password'}
                  autocomplete={'off'}
                  label={Text({ text: 'password' })}
                  type={'password'}
                  onChange={(e) => setFieldValue('password', e.target.value.trim())}
                  onBlur={handleBlur}
                  helpText={errors.password && touched.password ? <ErrorField message={errors.password} /> : null}
                  data-cy={'registration_password'}
                >
                  <Icon slot={'suffix'} src={getIconSuccess(errors.password, values.password)} height={20} width={20} />
                </Input>
              </AuthorizationAndRegViews.WrapperInputForTooltip >

              {/* //! confirm_password */}

              <AuthorizationAndRegViews.WrapperInputForTooltip
                content={Text({ text: 'tooltipDataConfirmPassword' })}
                trigger={'hover'}
              >
              <Input
                className={'input-mt_20'}
                value={values.confirm_password}
                variant={'largeCustomLabel'}
                placeholder={Text({ text: 'confirm_password' })}
                name={'confirm_password'}
                autocomplete={'off'}
                label={Text({ text: 'confirm_password' })}
                type={'password'}
                onChange={(e) => setFieldValue('confirm_password', e.target.value.trim())}
                onBlur={handleBlur}
                helpText={
                  errors.confirm_password && touched.confirm_password? <ErrorField message={errors.confirm_password} /> : null
                }
                data-cy={'registration_confirm_password'}
              >
                <Icon slot={'suffix'} src={getIconSuccess( errors.confirm_password, values.confirm_password)} height={20} width={20}/>
              </Input>

              </AuthorizationAndRegViews.WrapperInputForTooltip >
              {/* //! дополнительное поле для других форм */}  
              {values.whereDidYouHearAboutService === Text({ text: 'other' }) ? (
                <Input
                  value={values.otherWhereDidHearAbout}
                  variant={'largeCustomLabel'}
                  className={'input-mt_20'}
                  name={'otherWhereDidHearAbout'}
                  placeholder={Text({ text: 'other' })}
                  autocomplete={'off'}
                  onChange={(e) => setFieldValue('otherWhereDidHearAbout', e.target.value.trim())}
                  label={Text({ text: 'other' })}
                  onBlur={handleBlur}
                  helpText={
                    errors.otherWhereDidHearAbout && touched.otherWhereDidHearAbout? (
                      <ErrorField message={errors.otherWhereDidHearAbout} />
                    ) : null
                  }
                  data-cy={'another_field'}
                />
              ) : null}

              {/* //! выбор соц сетей или другое поле */}
              <Select
                className={'select-mb_30'}
                value={values.whereDidYouHearAboutService}
                variant={'largeCustomLabel'}
                name={'whereDidYouHearAboutService'}
                placeholder={Text({ text: 'whereDidYouHearAboutService' })}
                label={Text({ text: 'whereDidYouHearAboutService' })}
                onClick={(e) => {
                  const value = e.target.getAttribute('value');
                  setFieldValue('whereDidYouHearAboutService', value)
                }}
                onBlur={handleBlur}
                helpText={
                  errors.whereDidYouHearAboutService ? (
                    <ErrorField message={errors.whereDidYouHearAboutService} />
                  ) : null
                }
                options={whereDidYouHearAboutServiceOptions}
                data-cy={'registration_where_Did_You_Hear_About_Service'}
              />
              

                {/* //! получать рассылку */}
              <AuthorizationAndRegViews.WrapperCheckBox>
                <CheckBox
                    checked={values.receiveNewsletters}
                    name={'receiveNewsletters'}
                    className={'input-mt_20'}
                    data-cy={'registration_checkbox_drop'}
                    label={Text({ text: 'receiveNewsletters' })}
                    value={''} 
                    onBlur={handleBlur}
                    onChange={(e) => {
                      let checked = e.checked;
                      if (checked === null) return;
                      setFieldValue('receiveNewsletters', !checked);
                    }}
                    helpText={!values.receiveNewsletters && touched.receiveNewsletters? <ErrorField message={errors.receiveNewsletters} /> : null}

                />
              </AuthorizationAndRegViews.WrapperCheckBox>


              {
                role === ROLE.RETAIL ? (
                  <AuthorizationAndRegViews.ErrorBlock helpText={serverError} />
                ) : null
              }

              <Button
                form={'form-first-data'}
                variant={'black_btn_full_width'}
                type={'submit'}
                data-cy={'button_registration'}
              >
                {role === ROLE.RETAIL ? (
                  <Text text={'registration'} />
                ) : (
                  <Text text={'saveAndContinue'} />
                )}
                  {loading ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null}
              </Button>
            </Form>
        )}
      }
    </Formik>
  );
};

export default React.memo(RegistrationFormBaseInfo);

