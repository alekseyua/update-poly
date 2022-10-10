import api from '../../api/api';


export const notifications = store => {
    const apiProfile = api.profileApi;
    
    store.on('getNotice', async ({ context }, obj, { dispatch }) => {
        const params = {
            page: obj?.page ?? 1,
        }
        const res = await apiProfile.getNotifications(params);

        console.log({resultNotiseStore: res})
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                notifications: {
                    ...context.init_state.notifications,
                    ...res
                }
            }
        }

        dispatch('context', newContext);

    })

    //?! выделяем и сбрасываем выделение уведомления
    let newSelectItemsNotice = []
    store.on('checkedItemsNotice', ({ context }, obj, { dispatch }) => {
        
        const { notifications } = context.init_state;
        const { selectItemsNotice } = notifications;
        !selectItemsNotice.includes(obj.idItem)?
            newSelectItemsNotice = [...selectItemsNotice, obj.idItem]
            : newSelectItemsNotice = selectItemsNotice.filter( el => el !== obj.idItem );         

            const newContext = {
                ...context,
            "init_state": {
                ...context.init_state,
                notifications: {
                    ...context.init_state.notifications,
                    selectItemsNotice: newSelectItemsNotice
                } 
            }
        }        
        dispatch('context', newContext);
    })

    //?! выбераем и отменяем выбор всех элементов уведомлений
    store.on('checkedAllItemsNotice', ({ context }, obj, { dispatch }) => {
        
        const { notifications } = context.init_state
        
        newSelectItemsNotice.length > 0?
            newSelectItemsNotice = []
            : newSelectItemsNotice = [...context.init_state.notifications.results.map( el => el.id )]

        const newContext = {
            ...context,
            "init_state": {
            ...context.init_state,
                notifications: {
                    ...context.init_state.notifications,
                    selectItemsNotice: newSelectItemsNotice
                }
            }
        }

        dispatch('context', newContext);

    })

     //?! выбраные элементы  уведомлений удаляем
     store.on('deleteItemsNotice', async ({ context }, obj, { dispatch }) => {
        

         
         if (!!!newSelectItemsNotice.length) return dispatch('setModalState',{
                                                        show: true,
                                                        content: 'You not select items'
                                                    })
        
        const res = await apiProfile.postNotificationsDel({'ids': newSelectItemsNotice})

        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                notifications: {
                    ...context.init_state.notifications,
                    count: res.length,
                    results: res.filter( el => res.lenth = 30 ),
                    selectItemsNotice: [],
                }
            }
        }
        
        dispatch('context', newContext);

    })
    
     //?! выбраные элементы  уведомлений меняем статус
     store.on('reedItemsNotice', async ({ context }, obj, { dispatch }) => {

        if (!!!newSelectItemsNotice.length) return dispatch('setModalState',{
                                                        show: true,
                                                        content: 'You not select items'
                                                    })
       
       const res = await apiProfile.postNotificationsReed({ 'ids': newSelectItemsNotice });     

       const newContext = {
           ...context,
           "init_state": {
               ...context.init_state,
               notifications: {
                    ...context.init_state.notifications,
                    count: res.length,
                    results: res.filter( el => res.lenth = 30 ),
                    selectItemsNotice: [],
                }
               },
               profile:{
                    ...context.init_state.profile,
                    notifications: res.length,
               }
           }
       dispatch('context', newContext);

   })
}   