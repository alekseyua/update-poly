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
  store.on('setRegistration', ({ registration, step, roleRegister }, obj, { dispatch }) => {
    const { newValues, setFieldError } = obj;
    let params = serializeDataRegistration(newValues, roleRegister);
    apiUser
      .registration(params)
      .then((res) => {
        dispatch('setModalState', {
          show: true,
          action: {
            title: ['Продолжить', null]
          },
          className: null,
          iconImage: successAlertIcon,
          title: res.username,
          onClick: () => {
            dispatch('setAuthorithation', {
              // ? после регистрации авто авторизируемся
              username: params.username,
              password: params.password,
              email: params.email,
            })
          },
          content: (
            <>
            {
              Text({text: 'goodRegistration'})
            }
            </>
          ),
        })

      }).catch((err) => {
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
      });
  })
  //?! проверка ключа с указаной почты
  store.on('checkKey', ({ checkKey, closeModalState }, obj, { dispatch }) => {
    //'auth',
    //'resend'
    /**
     *    @param {
     *    type: {
     *            auth    - проверка ключа полученого на указаную почту при регистрации
     *            !?-resend  - проверка ключа полученого на указаную почту при востановлении пароля
     *          }
     *    }
     *    @returns
     */
    const param = {
      key: +obj.submit_code,
      type: 'auth',
      email: obj.email,
      username: obj.username,
      password: obj.password
    }

    return (
      apiUser
        .checkKey(param)
        .then(res => {

          dispatch('setModalState', {
            show: true,
            action: {
              title: ['Продолжить', null]
            },
            className: null,
            iconImage: successAlertIcon,
            title: param.username,
            onClick: () => closeModalState(),
            content: (<div>
              {`${Text({ text: 'fun_shoping' })}`}
            </div>)
          })
        })
        .catch(err => {
          if (err.response.status === 400) {
            obj.setErrors({ 'errorCod': `${Text({ text: 'inputCod' })}` })
          }
          console.log(err)
        }
        )
    )
  })
  //?! запрос на получение нового кода на почту
  store.on('getNewSubmitCode', ({ getNewSubmitCode, closeModalState }, obj, { dispatch }) => {

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

    let path = obj.type === 'restore' ? '/catalog' : '';
    const param = {
      email: obj.email,
      path: path,
      type: obj.type,
      password: obj.password,
      username: obj.username
    }

    return (
        apiUser
          .resendUserKey(param)
          .then(res => {
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
                        <br/>
                      </div>
                    : <div>                  
                        код для "подтверждения почты" отправлен на указаную почту
                        <br/>
                      </div>
                }
                </>
              ),
              onClick: () => obj.type === 'restore' ? obj.nextStep(obj.email) : dispatch('keyRegistration/set', param)
            })
          })
          .catch(err => {
            const data = err.data;
            for (const key in data) {
                let element = Array.isArray(data[key]) ? data[key][0] : data[key];
                if (element === 'wrong auth data') element = 'Неправильно введены учётные данные'
                obj?.setFieldError('serverError', element)
            }
            dispatch('setModalState', {
              show: true,
              className: null,
              iconImage: errorAlertIcon,
              title: obj.username,
              //! можно добавить кнопку обратной связи 
              content: (
                <div>
                  <i>{Text({ text: 'error_server' })}</i>
                  <p>{Text({ text: 'call_admin' })}</p>
                </div>
              ),
            })
          }
          )
      )
  }
  )
  //?! форма ввода ключа с почты и подтверждение его
  store.on('keyRegistration/set', ({ keyRegistration, closeModalState }, obj, { dispatch }) => {

    const handleSubmit = (values, setErrors) => {
      const params = {
        username: obj.username,
        password: obj.password,
        email: obj.email,
        path: obj.path,
        type: obj.type,
        submit_code: values.submit_code,
        setErrors: setErrors,
      }
      dispatch('checkKey', params)
    };



    const postKeyFromMail = (email) => {
      dispatch('getNewSubmitCode', { email: email, type: 'resend' });
    }
    dispatch('setModalState', {
      show: true,
      title: obj.username,
      content: <ModalSubmitCode initialValuesSubmitCode={initialValuesSubmitCode} handleSubmit={handleSubmit} postKeyFromMail={postKeyFromMail} />
    })
  })











}