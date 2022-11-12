import api from '../../api/api';
import Text from '../../helpers/Text';
import { errorAlertIcon } from '../../images';
import { textErrorMessage } from '../modalStorage/modalWindow/modalWindow';

export const authorization = store => {
    const apiUser = api.userApi;
    const initAuth = {};
    store.on('@init', ()=>({logout: false}));
    store.on('@init', ()=>({authorization: initAuth}))
    //?! вход в аккаунт
    store.on('loginIn', async ( {}, obj, {dispatch} )=>{
        const { username, password, redirectTo } = obj;
        try{            
            const params = {
                username: username,
                password: password
            }            
            const res = await apiUser.loginByUsername(params);
            if (!!res?.token){
                redirectTo('/catalog')
            }else{
                dispatch('setModalState', {
                    show: true,
                    iconImage: errorAlertIcon,
                    content: (
                        <div>
                            <p>
                                Произошла ошибка,
                            </p>
                            <p>
                            попробуйте повторить операцию немного позже
                            </p>
                        </div>
                    )
                })
            }

        }catch(err){
            console.log('ERROR log in', err)
            if(err.status === 400){
                dispatch('setModalState', {
                    show: true,
                    iconImage: errorAlertIcon,
                    content: (
                        <div>
                            <p>
                                Произошла ошибка,
                            </p>
                            <p>
                            не коректно введены данные для авторизации
                            </p>
                        </div>
                    )
                })
            }
        }
    })
    //?! Выход с аккаунта
    store.on('logoutOut', async ( {logout, closeModalState}, obj, {dispatch} )=>{
        // try{
            console.log('check logout')
            const { redirectTo } = obj;

            logout = await apiUser.logout();

            redirectTo('/authorization');

        // } catch (err) {
        //     console.log('ERROR EXIT LOGOUT', err)
        //     let error = [Text({text: 'error-on-server'})];
        //     if (err?.data) {
        //         const errors = err.data;
        //         if (typeof errors !== 'object') {
        //             error.push(`${errors}`)
        //         } else {
        //             error.push(`${errors[0]}`)
        //         }
        //     }
        //     dispatch('setModalState', {
        //         show: true,
        //         content: textErrorMessage(error),
        //         iconImage: errorAlertIcon,
        //         addClass: 'modal-alert-error',
        //         action: {
        //             title: ['продолжить', null]
        //         },
        //         onClick: () => closeModalState()
        //     })
        // }
    })

}