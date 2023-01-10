import api from '../../api/api';
import { serializeNotifications } from '../../api/ProfileApi/serializers';
import Text from '../../helpers/Text';
import { errorAlertIcon } from '../../images';
import { textErrorMessage } from '../modalStorage/modalWindow/modalWindow';


export const notifications = store => {
    const apiProfile = api.profileApi;

    store.on('getNotice', async ({ context, closeModalState }, obj, { dispatch }) => {
        try{
            const params = {
                page: obj?.page ?? 1,
            }
            const res = await apiProfile.getNotifications(params);
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                isLoading: {
                    ...context.init_state.isLoading,
                    isLoadingNotice: true,
                }
            }
        }
        
        dispatch('context', newContext);
        dispatch('setNotificationTest', {message: res} )
    }catch(err){
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                isLoading: {
                    ...context.init_state.isLoading,
                    isLoadingNotice: true,
                }
            }
        }        
        dispatch('context', newContext);

        console.log('ERROR GET NOTIFICATIONS = ', err);
            let error = [Text({text: 'error-on-server'}), 'проблема в запросе на получение уведомления'];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    //?! выделяем и сбрасываем выделение уведомления
    let newSelectItemsNotice = []

    store.on('checkedItemsNotice', ({ notificationTest }, obj, { dispatch }) => {
        const { selectItemsNotice } = notificationTest;
        !selectItemsNotice.includes(obj.idItem) ?
            newSelectItemsNotice = [...selectItemsNotice, obj.idItem]
            : newSelectItemsNotice = selectItemsNotice.filter(el => el !== obj.idItem);
        let resChecked = {
            notificationTest: {
                ...notificationTest,
                selectItemsNotice: newSelectItemsNotice,
            }
        }
        const countCheckedMessage = notificationTest.results.reduce((acc, cur) => {
            
            if (newSelectItemsNotice.includes(cur.id)) return ++acc
            return acc
        }, 0)

        if(notificationTest.results.length === countCheckedMessage ){
            resChecked = {
                notificationTest: {
                    ...resChecked.notificationTest,
                    isSelectAllItems: true
                }
            }
        }else{
            resChecked = {
                notificationTest: {
                    ...resChecked.notificationTest,
                    isSelectAllItems: false
                }
            }
        }
        return resChecked;
    })

    //?! выбираем и отменяем выбор всех элементов уведомлений
    store.on('checkedAllItemsNotice', ({ notificationTest }, obj, { dispatch }) => {
        let resCheckedAll = {
            notificationTest: {
                ...notificationTest,
            }
        }
        newSelectItemsNotice.length > 0 ?
                (
                    newSelectItemsNotice = [],
                    resCheckedAll = {
                        notificationTest: {
                            ...resCheckedAll.notificationTest,
                            selectItemsNotice: newSelectItemsNotice,
                            isSelectAllItems: false
                        }
                    }
                )
            : (
                newSelectItemsNotice = [...notificationTest.results.map(el => el.id)],
                resCheckedAll = {
                    notificationTest: {
                        ...resCheckedAll.notificationTest,
                        selectItemsNotice: newSelectItemsNotice,
                        isSelectAllItems: true
                    }
                }
                )
        return resCheckedAll
    })

    //?! выбранные элементы  уведомлений удаляем
    store.on('deleteItemsNotice', async ({ context,notificationTest }, obj, { dispatch }) => {
        let newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                isLoading:{
                    ...context.init_state.isLoading,
                    isLoadingActionNotice: true
                }
            }
        }
        dispatch('context', newContext);
        if (!!!newSelectItemsNotice.length) return dispatch('setModalState', {
            show: true,
            title: 'Уведомление',
            iconImage: errorAlertIcon,
            content: <div
                className={'modal-notification--noselect'}
            >
                Вы не выбрали ни одного элемента для удаления
            </div>
        })
        const messageList = notificationTest.results;
        let res = await apiProfile.postNotificationsDel({ 'ids': newSelectItemsNotice })
        
        res = serializeNotifications({ results: res });
        const countNoReadMessage = messageList.reduce((acc, cur) => {
            if (newSelectItemsNotice.includes(cur.id) && !cur.is_read) return ++acc
            return acc
        }, 0)
        newContext = {
            ...newContext,
            "init_state": {
                ...newContext.init_state,
                profile: {
                    ...newContext.init_state.profile,
                    notifications: newContext.init_state.profile.notifications - countNoReadMessage,
                },
                isLoading:{
                    ...newContext.init_state.isLoading,
                    isLoadingActionNotice: false
                }
            }
        }
        dispatch('context', newContext);
        newSelectItemsNotice = [];
        dispatch('setNotificationTest', {message: res} )
    })

    //?! выбранные элементы  уведомлений меняем статус на прочитанные
    store.on('reedItemsNotice', async ({ context, notificationTest }, obj, { dispatch }) => {
        let newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                isLoading:{
                    ...context.init_state.isLoading,
                    isLoadingActionNotice: true
                }
            }
        }
        dispatch('context', newContext);
        if (!!!newSelectItemsNotice.length) return dispatch('setModalState', {
            show: true,
            title: 'Уведомление',
            iconImage: errorAlertIcon,
            content: <div
                className={'modal-notification--noselect'}
            >
                Вы не выбрали ни одного элемента для изменений
            </div>
        });
        const messageList = notificationTest.results;

        let res = await apiProfile.postNotificationsReed({ 'ids': newSelectItemsNotice });
        res = serializeNotifications({ results: res })
        const countNoReadMessage = messageList.reduce((acc, cur) => {
            if (newSelectItemsNotice.includes(cur.id) && !cur.is_read) return ++acc
            return acc
        }, 0)

        newContext = {
            ...newContext,
            "init_state": {
                ...newContext.init_state,
                profile: {
                    ...newContext.init_state.profile,
                    notifications: newContext.init_state.profile.notifications - countNoReadMessage,
                },
                isLoading:{
                    ...newContext.init_state.isLoading,
                    isLoadingActionNotice: false
                }
            },
        }
        dispatch('context', newContext);
        newSelectItemsNotice = [];
        dispatch('setNotificationTest', {message: res} )
    })

}   