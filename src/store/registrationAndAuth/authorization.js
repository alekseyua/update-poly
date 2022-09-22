import api from '../../api/api';

export const authorization = store => {
    const apiUser = api.userApi;
    const initAuth = {};

    //?! Вход в аккаунт
    store.on('@init', ()=>({authorization: initAuth}))
    store.on('setAuthorithation', ({closeModalState}, obj, {dispatch} )=>{

        return(    
                apiUser
                    .loginByUsername(
                        {
                        username: obj.username,
                        password: obj.password,
                        },
                    )
                    .then(res => {
                        let path = obj.type === 'restore'? '/catalog' : '/catalog';

                        dispatch('getContextPage', path)
                        // ? запрос на подтверждение почты (авторизация при первой регистрации)
                        obj.email?
                            dispatch( 'keyRegistration/set',{ 
                                username: obj.username, 
                                password: obj.password ,
                                type : 'resend',
                                email: obj.email,
                                path: path
                            }                         
                            )
                            : null
   
                            //  необходимо написать логикудля обычного входа
                            //  сдесь мы реализовываем вход в аккаунт в нашем локальном хранилище меняем статус,
                            // ! роль, те данные пользователя и делаем переход в каталог
                        
                    })
                    .catch((err) => {
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
                    })     
    )
    })

    //?! Выход с аккаунта
    store.on('@init', ()=>({logout: false}));
    store.on('logoutOut', ( {logout}, obj, {dispatch} )=>{
        logout = apiUser.logout();
        dispatch('getContextPage', '/catalog');
    })
}