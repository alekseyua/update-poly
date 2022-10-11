import React from 'react';
import { Form, Formik } from 'formik';
import PersonalPageViews from '../../../Views/PersonalPageViews';
import { changeUserDataSchema } from '../../../helpers/schemesFormic';
import Input from '../../../Views/Input';
import Button from '../../../Views/Button';
import CheckBox from '../../../Views/CheckBox';
import Icon from '../../../Views/Icon';
import Text from '../../../helpers/Text';
import ErrorField from '../../../Views/ErrorField';
import { ROLE } from '../../../const';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import { igIcon, vkIcon } from '../../../images';


const checkRoleForAddFields = (role) => {
  let result = true;
  if (role === ROLE.DROPSHIPPER || ROLE.RETAIL === role) result = false;
  return result;
};



   const isConcatReqFildsFromRole = false

   const errorsMessenge = {
     shortLastName: Text({ text: 'short.last.name' }),
     longLastName: Text({ text: 'longLastName' }),
     requiredField: Text({ text: 'requiredField' }),
     longFirstname: Text({ text: 'long.first.name' }),
     longPatronymic: Text({ text: 'long.patronymic' }),
     email: Text({ text: 'notValidEmail' }),
     phone: Text({ text: 'invalid.phone' }),
     shortCompanyName: Text({ text: 'shortCompanyName' }),
     inn: Text({ text: 'invalid.inn' }),
     shortInn: Text({ text: 'shortInn' }),
     longInn: Text({ text: 'longInn' }),
   };

   const initialValues = {
     lastname: '',
     firstname: '',
     patronymic: '',
     phone: '',
     email: '',
     receiveNewsletters: '',
     inn: '',
     companyName: '',
     addresSite: '',
     vk: '',
     instagram: '',
     otherSocialLink: '',
   };

   const onSubmit = () => {

   }

   const changePhone = () => {}

   const changePassword = () => {}

   const isSaved = false


const ContentEntryPersonalPage = ({
  profile,

  role,
}) => {

  if(role === ROLE.UNREGISTRED){
    return (
      <BlockSpinner.SpinnerWrapper>
        <BlockSpinner.SpinnerCenter>
          <BlockSpinner.Spinner />
        </BlockSpinner.SpinnerCenter>
      </BlockSpinner.SpinnerWrapper>
    )
  }else{
      return (
    <React.Fragment>

       <PersonalPageViews.WrapperForm>
         <PersonalPageViews.HeaderForm/>
           <Formik
            validationSchema={changeUserDataSchema(errorsMessenge, checkRoleForAddFields(role))}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
             {({ handleSubmit, handleChange, values, errors, setValues }) => {
               return (
                 <Form noValidate onChange={handleSubmit}>
                   <PersonalPageViews.FormBlockContent>
                     {/* top Row */}
                     <PersonalPageViews.FormRow>

                       <PersonalPageViews.FormColl>
                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.lastname}
                             name={'lastname'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={ errors.lastname ? 'input__error' : '' }
                             helpText={
                               errors.lastname ? <ErrorField message={errors.lastname} /> : null
                             }
                             label={Text({ text: 'lastname' })}
                             placeholder={'Укажите фамилию'}
                           />
                         </PersonalPageViews.FormGroup>

                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.firstname}
                             name={'firstname'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={errors.firstname ? 'input__error' : ''}
                             helpText={
                               errors.firstname ? <ErrorField message={errors.firstname} /> : null
                             }
                             label={Text({ text: 'firstname' })}
                             placeholder={'Укажите имя'}
                           ></Input>
                         </PersonalPageViews.FormGroup>
                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.patronymic}
                             name={'patronymic'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={errors.patronymic ? 'input__error' : ''}
                             helpText={
                               errors.patronymic ? <ErrorField message={errors.patronymic} /> : null
                             }
                             label={Text({ text: 'patronymic' })}
                             placeholder={'Укажите отчество'}
                           ></Input>
                         </PersonalPageViews.FormGroup>
                       </PersonalPageViews.FormColl>

                       <PersonalPageViews.FormColl>
                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.phone}
                             name={'phone'}
                             disabled
                             readonly
                             label={'Номер телефона'}
                             placeholder={'+7 (   )  '}
                           >
                             <Button
                               onClick={changePhone}
                               variant={'cabinet-linkblue'}
                               slot={'suffix'}
                             >
                               Сменить номер
                             </Button>
                           </Input>
                         </PersonalPageViews.FormGroup>

                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.email}
                             name={'email'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={errors.email ? 'input__error' : ''}
                             helpText={errors.email ? <ErrorField message={errors.email} /> : null}
                             label={'Email'}
                             placeholder={'Укажите email'}
                           ></Input>

                           <PersonalPageViews.FormAlignRight>
                             <CheckBox
                               checked={values.receiveNewsletters}
                               name={'receiveNewsletters'}    
                               onChange={(e) => {
                                 setValues({
                                   ...values,
                                   'receiveNewsletters':  e.checked });
                               }}
                               label={Text({ text: 'receiveNewsletters' })}
                             ></CheckBox>

                           </PersonalPageViews.FormAlignRight>
                         </PersonalPageViews.FormGroup>
                       </PersonalPageViews.FormColl>

                     </PersonalPageViews.FormRow>
                     {/* END top Row */}

                     {/* bottom Row */}
                     {
                     
                     checkRoleForAddFields(role) ? (
                       <PersonalPageViews.FormRow>
                         <PersonalPageViews.FormColl>
                           <PersonalPageViews.FormGroup>
                             <Input
                               value={values.inn}
                               name={'inn'}
                               autocomplete={'off'}
                               onChange={handleChange}
                               className={errors.inn ? 'error' : ''}
                               helpText={errors.inn ? <ErrorField message={errors.inn} /> : null}
                               label={'ИНН'}
                               placeholder={'Укажите ИНН'}
                             ></Input>
                           </PersonalPageViews.FormGroup>
                           <PersonalPageViews.FormGroup>
                             <Input
                               value={values.companyName}
                               name={'companyName'}
                               autocomplete={'off'}
                               onChange={handleChange}
                               className={errors.companyName ? 'error' : ''}
                               helpText={
                                 errors.companyName ? (
                                   <ErrorField message={errors.companyName} />
                                 ) : null
                               }
                               label={'Название организации'}
                               placeholder={'ООО ИП и тд'}
                             ></Input>
                           </PersonalPageViews.FormGroup>
                           <PersonalPageViews.FormGroup>
                             <Input
                               value={values.addresSite}
                               name={'addresSite'}
                               autocomplete={'off'}
                               onChange={handleChange}
                               className={errors.addresSite ? 'error' : ''}
                               helpText={
                                 errors.addresSite ? <ErrorField message={errors.addresSite} /> : null
                               }
                               label={'Адрес вебсайта'}
                               placeholder={'Ссылка на сайт'}
                             ></Input>
                           </PersonalPageViews.FormGroup>
                         </PersonalPageViews.FormColl>

                         <PersonalPageViews.FormColl>
                           <PersonalPageViews.FormGroup>
                             <Input
                               value={values.vk}
                               name={'vk'}
                               autocomplete={'off'}
                               onChange={handleChange}
                               className={errors.vk ? 'error' : ''}
                               helpText={errors.vk ? <ErrorField message={errors.vk} /> : null}
                               label={'VK *'}
                               placeholder={'Ссылка на профиль '}
                             >
                               <Icon src={vkIcon} alt="" slot={'suffix'} height={20} width={20} />
                             </Input>
                           </PersonalPageViews.FormGroup>
                           <PersonalPageViews.FormGroup>
                             <Input
                               value={values.instagram}
                               name={'instagram'}
                               autocomplete={'off'}
                               onChange={handleChange}
                               className={errors.instagram ? 'error' : ''}
                               helpText={
                                 errors.instagram ? <ErrorField message={errors.instagram} /> : null
                               }
                               label={'Instagram *'}
                               placeholder={'Ссылка на профиль '}
                             >
                               <Icon src={igIcon} alt="" slot={'suffix'} height={20} width={20} />
                             </Input>
                           </PersonalPageViews.FormGroup>
                           <PersonalPageViews.FormGroup>
                             <Input
                               value={values.otherSocialLink}
                               name={'otherSocialLink'}
                               autocomplete={'off'}
                               onChange={handleChange}
                               className={errors.otherSocialLink ? 'error' : ''}
                               helpText={
                                 errors.otherSocialLink ? (
                                   <ErrorField message={errors.otherSocialLink} />
                                 ) : null
                               }
                               label={'Другая соц. сеть *'}
                               placeholder={'Ссылка на профиль '}
                             >
                               {/* <Icon src={fbIcon} alt="" slot={'suffix'} /> */}
                             </Input>
                           </PersonalPageViews.FormGroup>
                         </PersonalPageViews.FormColl>
                       </PersonalPageViews.FormRow>
                     ) : null
                     
                     }

                     {                     
                        role === ROLE.DROPSHIPPER ? (
                          <PersonalPageViews.FormRow>
                            <PersonalPageViews.FormColl>
                              <PersonalPageViews.FormGroup>
                                <Input
                                  value={values.vk}
                                  name={'vk'}
                                  autocomplete={'off'}
                                  onChange={handleChange}
                                  className={errors.vk ? 'error' : ''}
                                  helpText={errors.vk ? <ErrorField message={errors.vk} /> : null}
                                  label={'VK *'}
                                  placeholder={'Ссылка на профиль '}
                                >
                                  <Icon src={vkIcon} alt="" slot={'suffix'} height={20} width={20} />
                                </Input>
                              </PersonalPageViews.FormGroup>
                              <PersonalPageViews.FormGroup>
                                <Input
                                  value={values.instagram}
                                  name={'instagram'}
                                  autocomplete={'off'}
                                  onChange={handleChange}
                                  className={errors.instagram ? 'error' : ''}
                                  helpText={
                                    errors.instagram ? <ErrorField message={errors.instagram} /> : null
                                  }
                                  label={'Instagram *'}
                                  placeholder={'Ссылка на профиль '}
                                >
                                  <Icon src={igIcon} alt="" slot={'suffix'} height={20} width={20} />
                                </Input>
                              </PersonalPageViews.FormGroup>
                              <PersonalPageViews.FormGroup>
                                <Input
                                  value={values.otherSocialLink}
                                  name={'otherSocialLink'}
                                  autocomplete={'off'}
                                  onChange={handleChange}
                                  className={errors.otherSocialLink ? 'error' : ''}
                                  helpText={
                                    errors.otherSocialLink ? (
                                      <ErrorField message={errors.otherSocialLink} />
                                    ) : null
                                  }
                                  label={'Другая соц. сеть *'}
                                  placeholder={'Ссылка на профиль '}
                                >
                                  {/* <Icon src={fbIcon} alt="" slot={'suffix'} /> */}
                                </Input>
                              </PersonalPageViews.FormGroup>
                            </PersonalPageViews.FormColl>
                          </PersonalPageViews.FormRow>
                        ) : null
                     }
                     
                     {/* END bottom Row */}
                     <PersonalPageViews.FormBottom onClickChangePassword={changePassword}>
                       <Button type={'submit'} variant={'cabinet_default'}>
                         <Text text={'save'} />
                         {!isSaved ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null}
                       </Button>
                     </PersonalPageViews.FormBottom>
                   </PersonalPageViews.FormBlockContent>
                 </Form>
               );
             }}
          </Formik>
      </PersonalPageViews.WrapperForm>
    </React.Fragment>
  );
  }
};

export default React.memo(ContentEntryPersonalPage);
