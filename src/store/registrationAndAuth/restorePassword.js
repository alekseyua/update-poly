import { initialValuesModalNewPassword, initialValuesSubmitCode } from '../../helpers/initialValues/initialValues'
import ModalProvider from '../../Views/ModalProvider/ModalProvider';
import api from '../../api/api';
import { errorAlertIcon, successAlertIcon } from '../../images';

export const restorePassword = store => {
    const apiUser = api.userApi;



    const openModalFinallyRestorePassword = (data) => {
        // return setModalStates({
        //     content: (
        //         <ModalContentViews.ModalWrapper>
        //             <ModalContentViews.CloseBtn closeModal={() => closeModal(data)} />
        //             <ModalContentViews.ContentBlock>
        //                 <ModalContentViews.CenterPosition>
        //                     <ModalContentViews.SuccessOrError
        //                         closeModal={() => closeModal(data)}
        //                         success={data}
        //                         content={data ? 'Ваш пароль успешно изменен' : 'Ошибка при смене пароля'}
        //                     />
        //                 </ModalContentViews.CenterPosition>
        //             </ModalContentViews.ContentBlock>
        //         </ModalContentViews.ModalWrapper>
        //     ),
        //     show: true,
        //     addClass: 'modal-success_error',
        // });
    };


    const initialValueRestorePassword = {
        email: '',
        type: 'restore'
    }
    store.on('openModalRestorePassword', ({ }, obj, { dispatch }) => {
        const resetUserPassword = (values, { setFieldError }) => {
            //?! сделать переходы по шагам
            //?! послеввода пороля отправляем запрос на смену пароля 
            //?! type = 'restore'
            //?! при успешном запросе приходит уведомление о отправленом запросе на почту и при нажитии но "ок" выполняем func nextStep
            const params = {
                ...values,
                nextStep: nextStep,
                setFieldError: setFieldError
            }
            dispatch('getNewSubmitCode', params);
        }

        const nextStep = (email) => {
            const newInitialValuesSubmitCode = {
                ...initialValuesSubmitCode,
                email: email
            }

            const postKeyFromMail = (email) => {
                dispatch('getNewSubmitCode', { email: email, type: 'restore' });
            }


            dispatch('setModalState', {
                show: true,
                content: (
                    <ModalProvider.ModalSubmitCode
                        initialValuesSubmitCode={newInitialValuesSubmitCode}
                        handleSubmit={nextStepNewPassword}
                        postKeyFromMail={postKeyFromMail}
                    />
                ),
            })
        }

        const nextStepNewPassword = (values, setErrors) => {
            const newInitialValuesModalNewPassword = {
                ...initialValuesModalNewPassword,
                key: values.submit_code,
                email: values.email
            }
            dispatch('setModalState', {
                show: true,
                content: (
                    <ModalProvider.ModalNewPassword
                        initialValuesModalNewPassword={newInitialValuesModalNewPassword}
                        openModalFinallyRestorePassword={null}
                        resetUserPassword={nextStepRequestPassword}
                    />
                ),
            })
        }

        const nextStepRequestPassword = (values) => {
            apiUser
                .resetUserPassword(values)
                .then(res => {

                    dispatch('setModalState', {
                        show: true,
                        action: {
                          title: ['Продолжить', null]
                        },
                        className: null,
                        iconImage: successAlertIcon,
                        title: res.username,
                        onClick: () => dispatch('goToPage', {path: values.path}),
                        content: (
                          <div>
                            Вы успешно изминили пароль
                          </div>
                        ),
                      })

                })
                .catch(err => {
                    console.log(`ERROR `, err.response.data)
                    if (!!err.response) {
                        if (err.response.data.status === "Неправильный код") {
                            // ???? getNewSubmitCode(param)                        
                        }
                        setFieldError({ email: err.response.data?.status });
                    }
                    openModalFinallyRestorePassword(false);
                }
                )
        }
        dispatch('setModalState', {
            show: true,
            content: (
                <ModalProvider.ModalRestorePassword
                    initialValueRestorePassword={initialValueRestorePassword}
                    resetUserPassword={resetUserPassword}
                />
            ),
        })


    })
}



                            // 3: dispatch('setModalState', {
                            //     title: 'Admine',
                            //     show: true,
                            //     action: { title: ['next', null] },
                            //     // onClick: () => dispatch('closeModalState'),
                            //     content: (<>
                            //         Ваш пароль успешно изменен
                            //     </>
                            //     )
                            // })


