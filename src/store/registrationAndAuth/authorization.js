import api from '../../api/api';
import { errorAlertIcon } from '../../images';

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
    store.on('logoutOut', async ( {logout}, obj, {dispatch} )=>{
        try{

            const { redirectTo } = obj;

            logout = await apiUser.logout();

            redirectTo('/authorization');

        }catch(err){
            console.log('ERROR EXIT LOGOUT', err)
        }
    })

}