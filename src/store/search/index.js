import api from '../../api/api';


const search = store =>{
    // let text = '';

    store.on('@init',()=>({search : []}))

    store.on( 'resSearch', ({search}, q ) => ({ search : q }))

    store.on('@init', (_, text = '')=>({textSearch: text}))
    store.on('changeTextSearch', (_,t)=>({textSearch: t}))
    store.on('setInputSearchValue', async ({search}, value)=>{
        try{
            store.dispatch('changeTextSearch', value)
            const resultSearch = await api.getSearch(
                {
                    q: value,
                    role: 0
                }
                )
            store.dispatch( 'resSearch', resultSearch );
        }catch(err){
            new Error(`Error has in search ${err}`)
            return console.log('massage error: ', err.message)
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