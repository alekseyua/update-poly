import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';

import { secretWordEncoding, serializerUserDataDencrypt, serializerUserDataEncript } from '../../../helpers/encrypt';
import { checkLocalStorage, getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../helpers/helpers';
import AuthorizationAndRegViews from '../../../Views/AuthorizationAndRegViews';
import AuthorizationForm from './AuthorizationForm';
import Text from '../../../helpers/Text';
import { useNavigate } from 'react-router-dom';

import style from '../styles/auth-regist.module.scss';


const Authorization = (props) => {
  const { site_configuration } = props.context;
  const { dispatch } = useStoreon();
  const { page_type_reg, video_page } = site_configuration;
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);

  const errorsMessenge = {
    longUsername: Text({ text: 'long.nickname' }),
    notValidPass: Text({ text: 'notValidPass' }),
    shortPass: Text({ text: 'shortPass' }),
    longPass: Text({ text: 'longPass' }),
    requiredField: Text({ text: 'requiredField' }),
    invalidAuthData: Text({ text: 'invalid.auth.data' }),
  };

  const initialValueAuthorization = {
    username: checkLocalStorage(secretWordEncoding('username')) ? serializerUserDataDencrypt(getLocalStorage(secretWordEncoding('username'))) : '',
    password: checkLocalStorage(secretWordEncoding('password')) ? serializerUserDataDencrypt(getLocalStorage(secretWordEncoding('password'))) : '',
    remember: checkLocalStorage(secretWordEncoding('remember')) ? getLocalStorage(secretWordEncoding('remember')) : false
  };

  const openModalRestorePassword = (e) => {
    e.preventDefault();
    dispatch('openModalRestorePassword')
  };

  const onHandleChangeRemember = (setValues, values) => {
    setValues({ ...values, remember: !values.remember })
    if (!values.remember) {
      setLocalStorage(secretWordEncoding('username'), serializerUserDataEncript(values.username));
      setLocalStorage(secretWordEncoding('password'), serializerUserDataEncript(values.password));
      setLocalStorage(secretWordEncoding('remember'), !values.remember);
    } else {
      if (checkLocalStorage(secretWordEncoding('username'))) {
        removeLocalStorage(secretWordEncoding('username'));
      }
      if (checkLocalStorage(secretWordEncoding('password'))) {
        removeLocalStorage(secretWordEncoding('password'));
      }
      if (checkLocalStorage(secretWordEncoding('remember'))) {
        removeLocalStorage(secretWordEncoding('remember'));
      }
    }
  }

  const onSubmit = (data, { setFieldError }) => {
    data.remember? onHandleChangeRemember(()=>{},data) : null;
    setLoading(true)
    const params = {
      username: data.username,
      password: data.password,
      setFieldError: setFieldError,
      setLoading: setLoading,
      redirectTo: (to) => {
        const timerTimeout = setTimeout(()=>{
          navigate(to);
          return () => clearTimeout(timerTimeout);          
        },3000)
      }
    }
    dispatch('setModalState', {
      show: true,      
    })

    dispatch('loginIn', params)
  };


  return (
    <div className={style['auth-regist__container']}>
      <div className={style['auth-regist__block']}>
        <AuthorizationAndRegViews.LeftSide
          video_page={video_page}
        />
      </div>

      <div className={style['auth-regist__block']}>
        <AuthorizationAndRegViews.RightSide
          site_configuration={site_configuration}
        >
          <AuthorizationAndRegViews.RegistrationBlock to={page_type_reg} />
          <AuthorizationAndRegViews.FormSingnIn>
            <AuthorizationForm
              onSubmit={onSubmit}
              initialValueAuthorization={initialValueAuthorization}
              errorsMessenge={errorsMessenge}
              onHandleChangeRemember={onHandleChangeRemember}
              openModalRestorePassword={openModalRestorePassword}
              loading = { loading }
            />
          </AuthorizationAndRegViews.FormSingnIn>
        </AuthorizationAndRegViews.RightSide>
      </div>

    </div>

  );
};

export default Authorization;
