import api from '../../api/api';
import { errorAlertIcon } from '../../images';
import { textErrorMessage } from '../modalStorage/modalWindow/modalWindow';


const search = store =>{
    // let text = '';

    store.on('@init',()=>({search : []}))

    store.on( 'resSearch', ({search}, q ) => ({ search : q }))

    store.on('@init', (_, text = '')=>({textSearch: text}))
    store.on('changeTextSearch', (_,t)=>({textSearch: t}))
    store.on('setInputSearchValue', async ({search, closeModalState}, value, { dispatch })=>{
        try{
            dispatch('changeTextSearch', value)
            const resultSearch = await api.getSearch(
                {
                    q: value,
                    role: 0
                }
                )
            dispatch( 'resSearch', resultSearch );
        } catch (err) {
            console.log('ERROR GET COUNTRY', err);
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
}

export { search };


// export default initialUsers => store => {
//     // Initial state
//     store.on('@init', { users: initialUsers })
//     // Reducers
//     store.on('users/save', ({ users }, user) => ({ users: users.concat([user]) }))
//     // Async event listeners ≈ redux thunk
//     store.on('users/add', async (state, user) => {
//       try {
//         await api.addUser(user)
//         store.dispatch('users/save', user)
//       } catch (e) {
//         store.dispatch('errors/server-error')
//       }
//     })
// }