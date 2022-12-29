import api from '../../api/api';
import { serializeNotifications } from '../../api/ProfileApi/serializers';
import { errorAlertIcon } from '../../images';


export const notifications = store => {
    const apiProfile = api.profileApi;

    store.on('getNotice', async ({ context }, obj, { dispatch }) => {

        const params = {
            page: obj?.page ?? 1,
        }
        const res = await apiProfile.getNotifications(params);

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
        !selectItemsNotice.includes(obj.idItem) ?
            newSelectItemsNotice = [...selectItemsNotice, obj.idItem]
            : newSelectItemsNotice = selectItemsNotice.filter(el => el !== obj.idItem);

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

    //?! выбираем и отменяем выбор всех элементов уведомлений
    store.on('checkedAllItemsNotice', ({ context }, obj, { dispatch }) => {

        const { notifications } = context.init_state

        newSelectItemsNotice.length > 0 ?
            newSelectItemsNotice = []
            : newSelectItemsNotice = [...context.init_state.notifications.results.map(el => el.id)]

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

    //?! выбранные элементы  уведомлений удаляем
    store.on('deleteItemsNotice', async ({ context }, obj, { dispatch }) => {
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
        const messageList = context.init_state.notifications.results;
        let res = await apiProfile.postNotificationsDel({ 'ids': newSelectItemsNotice })
        
        res = serializeNotifications({ results: res });
        const countNoReadMessage = messageList.reduce((acc, cur) => {
            if (newSelectItemsNotice.includes(cur.id) && !cur.is_read) return ++acc
            return acc
        }, 0)
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                notifications: {
                    ...context.init_state.notifications,
                    count: res.results.length,
                    results: res.results.filter(el => res.results.length = 30),
                    selectItemsNotice: [],
                },
                profile: {
                    ...context.init_state.profile,
                    notifications: context.init_state.profile.notifications - countNoReadMessage,
                }
            }
        }
        dispatch('context', newContext);
    })

    //?! выбранные элементы  уведомлений меняем статус на прочитанные
    store.on('reedItemsNotice', async ({ context }, obj, { dispatch }) => {

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
        const messageList = context.init_state.notifications.results;

        let res = await apiProfile.postNotificationsReed({ 'ids': newSelectItemsNotice });
        res = serializeNotifications({ results: res })
        const countNoReadMessage = messageList.reduce((acc, cur) => {
            if (newSelectItemsNotice.includes(cur.id) && !cur.is_read) return ++acc
            return acc
        }, 0)

        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                notifications: {
                    ...context.init_state.notifications,
                    results: res.results.filter(el => res.results.length = 30),
                    selectItemsNotice: [],
                },
                profile: {
                    ...context.init_state.profile,
                    notifications: context.init_state.profile.notifications - countNoReadMessage,
                }
            },
        }
        dispatch('context', newContext);

    })

}   