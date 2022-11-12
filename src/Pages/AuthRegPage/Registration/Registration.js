import React, { useState, useEffect } from 'react';
import AuthorizationAndRegViews from '../../../Views/AuthorizationAndRegViews';
import RegistrationFormFirst from './RegistrationFormFirst';
import RegistrationFormBaseInfo from './RegistrationFormBaseInfo';
import SocialMediaCompanyData from './SocialMediaCompanyData';
import { ROLE } from '../../../const';
import Text from '../../../helpers/Text';
import { useStoreon } from 'storeon/react';

import style from '../styles/auth-regist.module.scss';
import { useNavigate } from "react-router-dom";

const initialState = {
  step: 1, //0
  role: ROLE.UNREGISTRED,
  allSteps: 2,
};
const initialValuesFirstStep = {
  lastname: '',
  firstname: '',
  patronymic: '',
  username: '',
  iAgreeDataProcessing: true,
};
const initialValuesMiddleStep = {
  email: '',
  phone: '',
  password: '',
  whereDidYouHearAboutService: '',
  otherWhereDidHearAbout: '',
  receiveNewsletters: true,
};
const initialValuesLastStep = {
  companyName: '',
  inn: '',
  vk: '',
  instagram: '',
  facebook: '',
};
const initialValues = {
  lastname: '',
  firstname: '',
  patronymic: '',
  username: '',
  iAgreeDataProcessing: null,
  email: '',
  phone: '',
  password: '',
  whereDidYouHearAboutService: '',
  otherWhereDidHearAbout: '',
  receiveNewsletters: false,
  companyName: '',
  inn: '',
  vk: '',
  instagram: '',
  other: '',
  error: '',
};

const Registration = (props) => {
  const { site_configuration } = props.context;
  const { page_type_auth, video_page } = site_configuration;
  const { roleRegister, step, registration, allSteps, dispatch } = useStoreon('roleRegister', 'step', 'registration', 'allSteps');  
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const redirectTo = (path) => {
    const timerTimeout = setTimeout(()=>{
        navigate(path);
        return () => clearTimeout(timerTimeout);
    },2000)
  }
  const nextStepOrSubmitRegData = (newValues, setFieldError) => { 
    console.log({step})
    if (step >= 0) {
      dispatch('setRegistration', { newValues, setFieldError, setLoading, redirectTo})
    } else {
      setNextStep();
    }
  };

  const onSaveFormData = (data, callbacks = {}) => {
    const { setFieldError = () => {} } = callbacks;
    dispatch('setDataRegistration', data);
    nextStepOrSubmitRegData(data, setFieldError);
    setLoading(true)
  };

  const setNextStep = (roleRegister) => {
    if (roleRegister === ROLE.RETAIL) {
      dispatch('setAllSteps', 2)
    }else{
      dispatch('setAllSteps', 3)
    }
    dispatch('stepIncrement', step)
    roleRegister? dispatch('setRoleRegister', roleRegister) : null
  };

  const setPrevStep = () => {
    dispatch('stepDecrement', step)
  };
  
      const openModalFeedbackReedFile = (link, title) => { 
           dispatch('pdf-viewer', {
              link: link,
              title: title,
              addClass: 'modal-policy'
           })  
      }
    

 
  return (
<div className={style['auth-regist__container']}>
  <div className={style['auth-regist__block']}>
    <AuthorizationAndRegViews.LeftSide 
      video_page = {video_page}
    />
  </div>

  <div className={style['auth-regist__block']}>
    <AuthorizationAndRegViews.RightSide 
      role={roleRegister}
      site_configuration={site_configuration}
      openModalFeedbackReedFile={openModalFeedbackReedFile}
    >
    {step !== 0 ? (
        <AuthorizationAndRegViews.StepsBreadcrumbs
          setPrevStep={setPrevStep}
          step={step}
          allSteps={allSteps}
        />
      ) : (
        <AuthorizationAndRegViews.AuthorizationBlock to={page_type_auth} />
      )}

      <AuthorizationAndRegViews.FormSingnUp role={roleRegister} step={step}>
        {{
          0: (
            <AuthorizationAndRegViews.RegistrationSelectRole
              setNextStep={setNextStep}
            />
          ),
          1: (
            <RegistrationFormFirst
              initialValues={registration}
              onSaveFormData={onSaveFormData}
              loading = { loading }
            />
          ),
          2: (
            <RegistrationFormBaseInfo
              initialValues={registration}
              role={roleRegister}
              onSaveFormData={onSaveFormData}
              loading = { loading }
            />
          ),
          3: (
            <SocialMediaCompanyData
              initialValues={registration}
              role={roleRegister}
              onSaveFormData={onSaveFormData} 
              loading = { loading }
            />
          ),
        }[step] || (
          <div>
            <Text text={'incorrectFormConfiguration'} /> 
          </div>
        )}

      
      </AuthorizationAndRegViews.FormSingnUp> 
      
      

    </AuthorizationAndRegViews.RightSide>
  </div>

</div>
  );
};

export default Registration;
