import React from 'react';
import { Form, Formik } from 'formik';
import Phone from 'react-phone-number-input'
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
import Labels from '../../../Views/ProductDetailsViews/Labels/Labels';
import SubTitle from '../../../Views/InformationViews/HowTo/SubTitle';

const ContentEntryPersonalPage = ({
  email, 
  first_name, 
  last_name, 
  middle_name, 
  phone,
  insta_link, 
  site_link, 
  vk_link,
  organization,
  receive_newsletter,

  role,

  changePhone,
  updateDataUser,
  changePassword,
  deleteAccaunt,
  changeReiciveNewLatters,
}) => {

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
       last_name: last_name? last_name : '',
       first_name: first_name? first_name : '',
       middle_name: middle_name? middle_name : '', 
       phone: phone? phone : '',
       email: email? email : '',
       receive_newsletter: receive_newsletter !== undefined? receive_newsletter : false,
       inn: organization?.inn? organization?.inn : '',
       companyName: organization?.organization? organization.organization : '',
       addresSite: '',
       vk: vk_link? vk_link : '',
       instagram: insta_link? insta_link : '',
       otherSocialLink: site_link? site_link : '',
       changePhone: changePhone,
       changePassword: changePassword,
       changeReiciveNewLatters: changeReiciveNewLatters,
       isSaved: true,
     };  
 
     const checkRoleForAddFields = ({role}) => {
        let result = true;
        if (role === ROLE.DROPSHIPPER || ROLE.RETAIL === role) result = false;
        return result;
      }

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
         <PersonalPageViews.HeaderForm
          deleteAccaunt = { deleteAccaunt }
         />
           <Formik
            validationSchema={changeUserDataSchema(errorsMessenge, checkRoleForAddFields(role))}
            initialValues={initialValues}
            onSubmit={updateDataUser}
          >
             {({ handleSubmit, handleChange, values, errors, setValues, setFieldValue }) => {

               return (
                 <Form onSubmit={ handleSubmit }>
                   <PersonalPageViews.FormBlockContent>
                     {/* top Row */}
                     <PersonalPageViews.FormRow>

                       <PersonalPageViews.FormColl>
                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.last_name}
                             name={'last_name'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={ errors.last_name ? 'input__error' : '' }
                             helpText={
                               errors.last_name ? <ErrorField message={errors.last_name} /> : null
                             }
                             label={Text({ text: 'lastname' })}
                             placeholder={'Укажите фамилию'}
                           />
                         </PersonalPageViews.FormGroup>

                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.first_name}
                             name={'first_name'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={errors.first_name ? 'input__error' : ''}
                             helpText={
                               errors.first_name ? <ErrorField message={errors.first_name} /> : null
                             }
                             label={Text({ text: 'firstname' })}
                             placeholder={'Укажите имя'}
                           ></Input>
                         </PersonalPageViews.FormGroup>
                         <PersonalPageViews.FormGroup>
                           <Input
                             value={values.middle_name}
                             name={'middle_name'}
                             autocomplete={'off'}
                             onChange={handleChange}
                             className={errors.middle_name ? 'input__error' : ''}
                             helpText={ errors.middle_name ? <ErrorField message={errors.middle_name} /> : null }
                             label={Text({ text: 'patronymic' })}
                             placeholder={'Укажите отчество'}
                           ></Input>
                         </PersonalPageViews.FormGroup>
                       </PersonalPageViews.FormColl>

                       <PersonalPageViews.FormColl>
                         <p>
                          Номер телефона
                         </p>
                         <PersonalPageViews.FormGroup phone>
                           <Phone
                              disabled
                              placeholder="Введите номер телефона"
                              value = { values.phone }
                              defaultCountry = {'RU'}
                              smartCaret = { true }
                              limitMaxLength = { true }
                              className = { 'form-input-number-phone-lk--phone'}       
                              onChange = { () => {}}                 
                           />
                           <PersonalPageViews.FormBottom
                              onClickChangePassword = {() => values.changePhone(values.phone)}
                              phone                           
                           >
                           </PersonalPageViews.FormBottom>   
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
                               checked={values.receive_newsletter}
                               name={'receive_newsletter'}    
                               onChange = { (e) => values.changeReiciveNewLatters(e, values, setValues) }
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
                               disabled
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
                       </PersonalPageViews.FormRow>
                     ) : null
                     
                     }

                     {                     
                        role === ROLE.DROPSHIPPER ? (
                          <PersonalPageViews.FormRow>
                            <PersonalPageViews.FormColl>
                              <PersonalPageViews.FormGroup>
                                <Input
                                  name = { 'vk' }
                                  label = { 'VK *' } 
                                  value = { values.vk }
                                  autocomplete = { 'off' }
                                  onChange = { handleChange }
                                  className={errors.vk ? 'error' : ''}
                                  helpText={errors.vk ? <ErrorField message={errors.vk} /> : null}
                                  placeholder={'Ссылка на профиль '}
                                >
                                  <Icon src={vkIcon} alt="" slot={'suffix'} height={20} width={20} />
                                </Input>
                              </PersonalPageViews.FormGroup>
                              <PersonalPageViews.FormGroup>
                                <Input
                                  name={'instagram'}
                                  value={values.instagram}
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
                                  value = { values.otherSocialLink }
                                  name = { 'otherSocialLink' }
                                  autocomplete = { 'off' }
                                  onChange={handleChange}
                                  className = { errors.otherSocialLink ? 'error' : ''}
                                  helpText = { errors.otherSocialLink ?  <ErrorField message={errors.otherSocialLink} />  : null }
                                  label = { 'Другая соц. сеть *' }
                                  placeholder = { 'Ссылка на профиль' }
                                >
                                  {/* <Icon src={fbIcon} alt="" slot={'suffix'} /> */}
                                </Input>
                              </PersonalPageViews.FormGroup>
                            </PersonalPageViews.FormColl>
                          </PersonalPageViews.FormRow>
                        ) : null
                     }
                     
                     {/* END bottom Row */}
                     <PersonalPageViews.FormBottom onClickChangePassword = { values.changePassword } >
                       <Button 
                        type = {'submit'} 
                        variant = {'cabinet_default'} 
                       >
                         <Text text={'save'} />
                         { !values.isSaved ? <BlockSpinner.Spinner sizeWidth='20' sizeHeight='20' slot={'icon-left'} bodrad = { 50 }/> : null }
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
