import api from '../../api/api'
import {
  initialValuesFirstStep,
  initialValuesMiddleStep,
  initialValuesRegistration,
  initialValuesSubmitCode
} from '../../helpers/initialValues/initialValues';
import { serializeDataRegistration } from '../../helpers/serializers/index';
import Text from '../../helpers/Text';
import { errorAlertIcon, successAlertIcon } from '../../images';
import ModalSubmitCode from '../../Views/ModalProvider/ModalSubmitCode/ModalSubmitCode';
import { textErrorMessage } from '../modalStorage/modalWindow/modalWindow';


export const registration = store => {
  const apiUser = api.userApi;


  store.on('@init', () => ({ registration: { ...initialValuesRegistration } }));
  store.on('@init', () => ({ allSteps: 3 }));
  store.on('@init', () => ({ step: 0 }));

  store.on('@init', () => ({ roleRegister: 0 }));

  store.on('setDataRegistration', ({ registration }, obj) => ({ registration: { ...registration, ...obj } }))

  store.on('setRoleRegister', ({ roleRegister }, role) => ({ roleRegister: role }));

  store.on('stepIncrement', ({ step }, s) => ({ step: s + 1 }))
  store.on('stepDecrement', ({ step }, s) => ({ step: s - 1 }))
  store.on('setAllSteps', ({ allSteps }, s) => ({ allSteps: s }))
  //?! регистрация пользователя

  store.on('setRegistration', async ({ registration, step, roleRegister }, obj, { dispatch }) => {
    const { newValues, setFieldError, setLoading, redirectTo } = obj;
    try {
      let params = serializeDataRegistration(newValues, roleRegister);
      const res = await apiUser.registration(params);
      setLoading(false)
      dispatch('setModalState', {
        show: true,
        action: {
          title: ['Продолжить', null]
        },
        className: null,
        iconImage: successAlertIcon,
        title: res.username,
        onClick: () => {
          dispatch('firstLogin', {
            // ? после регистрации авто авторизируемся
            username: params.username,
            password: params.password,
            email: params.email,
            redirectTo: redirectTo
          })
        },
        content: (
          <>
            {
              Text({ text: 'goodRegistration' })
            }
          </>
        ),
      })

    } catch (err) {
      if (err) {
        const data = err.data;
        let error = false;
        let status = true
        for (let key in data) {
          const element = Array.isArray(data[key]) ? data[key][0] : data[key];
          if (step === 1) {
            dispatch('setModalState', { show: false })
            if (initialValuesFirstStep.hasOwnProperty(key)) {
              setFieldError(key, element);
              status = false
              return error = false
            }
            (key === 'email' || key === 'phone' || key === 'whereDidYouHearAboutService' || key === 'password') && status ? error = true : error = false;
            dispatch('stepIncrement', step)
          } else if (step === 2) {
            dispatch('setModalState', { show: false })
            if (initialValuesMiddleStep.hasOwnProperty(key)) {
              setFieldError(key, element);
            }
            key === 'error' ? error = true : error = false;
            if (roleRegister !== 1) dispatch('stepIncrement', step)
          } else {
            setFieldError(key, element);
            error = true;
            dispatch('setModalState', { show: false })
          }
        }

        // if (error && step !== state.allSteps) setNextStep();

      }
      setLoading(false)
    }
  })
  //?! проверка ключа с указаной почты
  store.on('checkKey', async ({ closeModalState }, obj, { dispatch }) => {
    /**
     *    @param {
     *    type: {
     *            auth    - проверка ключа полученого на указаную почту при регистрации
     *            !?-resend  - проверка ключа полученого на указаную почту при востановлении пароля
     *          }
     *    }
     *    @returns
     */
    const { email, submit_code, username, password, redirectTo, setErrors } = obj;
    console.log('values submit code = ', {obj},{setErrors})

    try {

      const param = {
        key: +submit_code,
        type: 'auth',
        email: email,
        username: username,
        password: password
      }

      const res = await apiUser.checkKey(param)

      dispatch('setModalState', {
        show: true,
        action: {
          title: ['Продолжить', null]
        },
        className: null,
        iconImage: successAlertIcon,
        title: param.username,
        onClick: () => redirectTo('/juridical'),
        content: (<div>
          <p><code>Email: {email}</code> привязан к вашим учетным данным</p>
          <h5>{`${Text({ text: 'fun_shoping' })}`}</h5>
        </div>)
      })

    } catch (err) {
      console.log(err)
      if (err.status === 400) {
        setErrors({ 'errorCod': `${Text({ text: 'inputCod' })}` })
      }else{
        let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
            }
            dispatch('setModalState', {
                show: true,
                content: textErrorMessage(error),
                iconImage: errorAlertIcon,
                addClass: 'modal-alert-error',
                action: {
                    title: ['продолжить', null]
                },
                onClick: () => closeModalState()
            })
      }
    }
  })
  //?! запрос на получение нового кода на почту
  store.on('getNewSubmitCode', async ({ }, obj, { dispatch }) => {
    try {
      /**
       * @param {
       *    email - проверка пользователя по email
       *    type: {
       *            resend  - получение кода для регистрации
       *            restore - получение кода для востановления пароля
       *          }
       * } 
       * @returns @param
       */
      console.log('obj get submit code', obj)
      const param = {
        email: obj.email,
        type: obj.type,
      }
      const paramsInputKey = {
        email: obj.email,
        username: obj.username,
        redirectTo: obj.redirectTo
      }
      const res = await apiUser.resendUserKey(param);
      //! после реализации попапов добавить сообщение что код для "подтверждения почты" отправлен на указаную почту
      dispatch('setModalState', {
        show: true,
        className: null,
        iconImage: successAlertIcon,
        action: {
          title: ['Продолжить', null]
        },
        title: obj.username,
        //! можно добавить кнопку обратной связи 
        content: (
          <>
            {
              obj.type === 'restore' ?
                <div>
                  пороль сброшен, на почту отправлен новый код
                  <br />
                </div>
                : <div>
                  <h2>код для "подтверждения почты"</h2>
                  <p>отправлен на указаную Вами при регистрации почту</p>
                  <br />
                </div>
            }
          </>
        ),
        onClick: () => obj.type === 'restore' ? obj.nextStep(obj.email) : dispatch('inputKeyFromEmail', paramsInputKey)
      })
    } catch (err) {
      const data = err.data;
      for (const key in data) {
        let element = Array.isArray(data[key]) ? data[key][0] : data[key];
        if (element === 'wrong auth data') element = 'Неправильно введены учётные данные'
        obj?.setFieldError('serverError', element)
      }
      let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
            }
            dispatch('setModalState', {
                show: true,
                content: textErrorMessage(error),
                iconImage: errorAlertIcon,
                addClass: 'modal-alert-error',
                action: {
                    title: ['продолжить', null]
                },
                onClick: () => closeModalState()
            })
    }
  })
  //?! форма ввода ключа с почты и подтверждение его
  store.on('inputKeyFromEmail', ({ keyRegistration, closeModalState }, obj, { dispatch }) => {

    const { username, password, email, type, redirectTo } = obj;

    //?! проверяем код
    const handleSubmit = (values, callbacks) => {
      const { setErrors } = callbacks;
      const params = {
        username: username,
        password: password,
        email: values.email,
        path: obj.path,
        type: obj.type,
        submit_code: values.submit_code,
        setErrors: setErrors,
        redirectTo: redirectTo

      }
      dispatch('checkKey', params)
    };

    //?! запрос на получение нового кода
    const postKeyFromMail = (email) => {
      dispatch('getNewSubmitCode', {
        email: email,
        type: 'resend',
      });
    }
    //?! модалка с вводом ключа с почты
    dispatch('setModalState', {
      show: true,
      title: username,
      content: <ModalSubmitCode
        initialValuesSubmitCode={email ? { ...initialValuesSubmitCode, email } : initialValuesSubmitCode}
        handleSubmit={handleSubmit}
        postKeyFromMail={postKeyFromMail}
        redirectTo={redirectTo}
      />
    })
  })


  //?! Вход в аккаунт при регистрации
  store.on('firstLogin', async ({ closeModalState }, obj, { dispatch }) => {
    const { username, password, setLoading = () => { }, email, redirectTo } = obj;
    try {
      //?! отправляем запрос для получение ключа на почте

      const params = {
        username: username,
        password: password,
      }
      const res = await apiUser.loginByUsername(params)
      setLoading(false)
      console.log('log in', obj)

      // ? запрос на подтверждение почты (авторизация при первой регистрации)
      dispatch('inputKeyFromEmail', {
        username: username,
        password: password,
        type: 'resend',
        email: email,
        redirectTo: redirectTo,
      })

    } catch (err) {
      if (err) {
        dispatch('setModalState', {
          show: false,
        })
        const data = err.data;
        let error = false;
        for (const key in data) {
          let element = Array.isArray(data[key]) ? data[key][0] : data[key];
          if (element === 'wrong auth data') element = 'Неправильно введены учётные данные'
          obj?.setFieldError('serverError', element)
        }
      }
    }
  })

}