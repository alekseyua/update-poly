import React from 'react';
import { Formik } from 'formik';
import { fbIcon, igIcon, vkContrastIcon } from '../../../images';
import { ROLE } from '../../../const';
import Input from '../../../Views/Input';
import ErrorField from '../../../Views/ErrorField';
import HelpTextAndLine from '../../../Views/HelpTextAndLine';
import Button from '../../../Views/Button';
import Text from '../../../helpers/Text';
import AuthorizationAndRegViews from '../../../Views/AuthorizationAndRegViews';
import {
  signUpFirstFormSchema,
  signUpSocialMediaFormSchema,
  signUpSocialMediaNotRequiredFormSchema,
} from '../../../helpers/schemesFormic';

import Select from '../../../Views/Select';
import Icon from '../../../Views/Icon/Icon';

const SocialMediaCompanyData = ({ onSaveFormData, initialValues, role, serverError }) => {
  const errorsMessenge = {
    requiredField: Text({ text: 'requiredField' }),
    invalidInn: Text({ text: 'invalidInn' }),
    shortCompanyName: Text({ text: 'shortCompanyName' }),
    shortInn: Text({ text: 'shortInn' }),
    longInn: Text({ text: 'longInn' }),
    inn: Text({ text: 'invalidInn' }),
  };
  const shema =
    role !== ROLE.DROPSHIPPER
      ? signUpSocialMediaFormSchema(errorsMessenge)
      : signUpSocialMediaNotRequiredFormSchema(errorsMessenge);

  return (
    <Formik
      validationSchema={shema}
      initialValues={initialValues}
      onSubmit={onSaveFormData}
    >
      {
        (props)=>{
          const {values, handleBlur, errors, touched, setFieldValue, handleSubmit} = props
          // console.log('props formik errors', errors)

          return (
            <form onSubmit={handleSubmit}>
              {
                role !== ROLE.DROPSHIPPER ? (
                  <>
                    <Input
                      value={values.companyName}
                      variant={'largeCustomLabel'}
                      className={'input-mt_20'}
                      autocomplete={'off'}
                      name={'companyName'}
                      placeholder={Text({ text: 'enterCompanyName' })}
                      onChange={(e) => setFieldValue('companyName', e.target.value.trim())}
                      label={Text({ text: 'companyName' })}
                      helpText={errors.companyName && touched.companyName? <ErrorField message={errors.companyName} /> : null}
                      data-cy={'registration_company_name'}
                    />
                    <Input
                      value={values.inn}
                      variant={'largeCustomLabel'}
                      className={'input-mt_20'}
                      autocomplete={'off'}
                      name={'inn'}
                      placeholder={Text({ text: 'enterInn' })}
                      onChange={(e) => setFieldValue('inn', e.target.value.trim())}
                      label={Text({ text: 'inn' })}
                      helpText={errors.inn && touched.inn ? <ErrorField message={errors.inn} /> : null}
                      data-cy={'registration_inn'}
                    />
                    <HelpTextAndLine>
                      <Text text={'linksSocialNetworks'} />
                    </HelpTextAndLine>
                  </>
                ) : null
              }

              <Input
                value={values.vk}
                variant={'largeCustomLabel'}
                className={'input-mt_20'}
                autocomplete={'off'}
                name={'vk'}
                placeholder={Text({ text: 'enterPageID' })}
                onChange={(e) => setFieldValue('vk', e.target.value.trim())}
                label={'VK'}
                helpText={errors.vk && touched.vk? <ErrorField message={errors.vk} /> : null}
                data-cy={'registration_vk_pageID'}
              >
                <Icon slot={'suffix'} src={vkContrastIcon} />
              </Input>

              <Input
                value={values.instagram}
                variant={'largeCustomLabel'}
                autocomplete={'off'}
                className={'input-mt_20'}
                name={'instagram'}
                placeholder={Text({ text: 'enterAccName' })}
                onChange={(e) => setFieldValue('instagram', e.target.value.trim())}
                label={'Instagram'}
                helpText={errors.instagram && touched.instagram? <ErrorField message={errors.instagram} /> : null}
                data-cy={'registration_instagram_pageID'}
              >
                <Icon slot={'suffix'} src={igIcon} />
              </Input>

              <Input
                value={values.other}
                variant={'largeCustomLabel'}
                className={'input-mt_20'}
                autocomplete={'off'}
                name={'other'}
                onChange={(e) => setFieldValue('other', e.target.value.trim())}
                placeholder={Text({ text: 'enterPageID' })}
                label={Text({ text: 'other' })}
                helpText={errors.other && touched.other? <ErrorField message={errors.other} /> : null}
                data-cy={'registration_facebook_pageID'}
              />
   
              <AuthorizationAndRegViews.ErrorBlock helpText={serverError} />
              <AuthorizationAndRegViews.ErrorBlock helpText={errors.error} />


              <Button
                variant={'black_btn_full_width'}
                type={'submit'}
                data-cy={'registration_button_step_3'}
              >
                <Text text={'registration'} />
              </Button>
            </form>
          )
        }
      }
    </Formik>
  );
};

export default React.memo(SocialMediaCompanyData);
