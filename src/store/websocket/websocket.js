import api from "../../api/api";
import { serializeNotifications } from "../../api/ProfileApi/serializers";
import { delay, getCookie } from "../../helpers/helpers";

export const websocket = store => {
  const orderApi = api.orderApi;

  store.on('@init', () => ({correspondence: {
    order_chat: [],
    order_items_chat: [],
    } 
  }) 
  )
  store.on('chatOrdersMessage/set', ({ context, correspondence }, obj, { dispatch }) => {
    let messageChat = undefined;
    let messageItemsChat = undefined;
    const messageOrderFromContext = correspondence?.order_chat;
    const messagesItemsOrderFromContext = correspondence?.order_items_chat;
    // const messageOrderFromContext = context.init_state.order.correspondence?.order_chat;
    // const messagesItemsOrderFromContext = context.init_state.order.correspondence?.order_items_chat;
    const order_items_chat = obj?.order_items_chat;
    const order_message = obj?.order_message;
    const order_item_message = obj?.order_item_message;
    const order_chat = obj?.order_chat;
    if (order_chat !== undefined) {
      if (order_chat.length > 0) {
        messageChat = order_chat
      }
    } else if (order_message !== undefined) {
      messageChat = [...[order_message], ...messageOrderFromContext];
    }

    if (order_items_chat !== undefined) {
      messageItemsChat = order_items_chat;
    } else if (order_item_message !== undefined) {
      let newObj = order_item_message;
      console.log({messagesItemsOrderFromContext})
      messageItemsChat = messagesItemsOrderFromContext.map(item => {
        if (item.item_id === newObj.order_item_id) {
          item = {
            chat_order_items: item.chat_order_items.concat(newObj).sort((a, b) => b.message_id - a.message_id),
            item_id: item.item_id
          }
        }
        return item
      })
    }

    // console.log({messageItemsChat})
    // const newContext = {
    //   ...context,
    //   "init_state": {
    //     ...context.init_state,
    //     order: {
    //       ...context.init_state.order,
    //       correspondence: {
    //         ...context.init_state.order.correspondence,
    //         order_chat: messageChat ?? messageOrderFromContext ?? [],
    //         order_items_chat: messageItemsChat ?? messagesItemsOrderFromContext ?? [],
    //       }
    //     },
    //     numberCurrentOrderForAddProduct: null,
    //   },
    // }
    debugger
    return {
      correspondence: {
        ...correspondence,
        order_chat: messageChat ?? messageOrderFromContext ?? [],
        order_items_chat: messageItemsChat ?? messagesItemsOrderFromContext ?? [],
      }
    }
    // console.log(newContext.init_state.order.correspondence)
    console.log('add context chatOrdersMessage/set')
    // dispatch('context', newContext);
  })



// store.on('setChatOrder', ({chatOrder}, obj, {dispatch}) => {
// console.log({obj})
// const { message } = obj;
// return {
// chatOrder: {
// ...notificationTest,
// count: message.results.length,
// results: message.results.filter(el => message.results.length = 30),
// selectItemsNotice: [],
// }
// }
// })




  store.on('correspondence', async ({ context }, obj, { dispatch }) => {
    console.log('call chat messages')
    const order_id = context.init_state.page_info.id;
    const urlChatItem = `wss://back.ftownpl.com:8443/ws/chat/${order_id}/?token=$${getCookie('ft_token')}`;
    let ws = {};
    const startWs = () => {
      ws = new WebSocket(urlChatItem); // создаем ws соединение
    }

    if (!!getCookie('ft_token')) {
      startWs()
      ws.onopen = (open) => {
        console.log('auto call chat messages')
        gettingData()
      }
      ws.onclose = (close) => {
        setTimeout(startWs(), 3000);
        if (close.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${close.code} причина=${close.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          console.log(`[close] Соединение прервано, код=${close.code}`);
        }
      }
    }

    ws.onerror = (error) => {
      alert(`[error] ${error.message} ${JSON.stringify(error, null, 4)}`);
    };

    const gettingData = () => {
      if (!ws) return;
      ws.onmessage = e => {                //подписка на получение данных по вебсокету
        const message = JSON.parse(e.data);
        console.log({messageSW: message})
        if (Object.keys(message)) {
          dispatch('chatOrdersMessage/set', message)
        }
      }
    }

  })

  store.on('changeStateIsnewMessage', async ({ context, closeModalState }, obj, { dispatch }) => {

    try {
      const { idProduct } = obj;
      const messagesItemsOrderFromContext = context.init_state.order.correspondence?.order_items_chat;
      let massiveIdIsnew = []
      let resChangeIsnew = []
      const newMessage = messagesItemsOrderFromContext.map(item => {
        if (item.item_id === idProduct) {
          item.chat_order_items.filter(el => {
            if (el.is_new) massiveIdIsnew.push(el.message_id)
          })
          item = {
            chat_order_items: item.chat_order_items.map(el => ({ ...el, is_new: false })),
            item_id: item.item_id
          }
        }
        return item
      })
      if (!!massiveIdIsnew.length) {
        resChangeIsnew = await orderApi.postCorrespondence_order_item_remake_is_new({
          order_item_id: idProduct,
          ids: massiveIdIsnew
        })
      }

      const newContext = {
        ...context,
        "init_state": {
          ...context.init_state,
          order: {
            ...context.init_state.order,
            correspondence: {
              ...context.init_state.order.correspondence,
              order_items_chat: newMessage ?? messagesItemsOrderFromContext ?? [],
            }
          },
          numberCurrentOrderForAddProduct: null,
        },
      }
      console.log('add context changeStateIsnewMessage')
      dispatch('context', newContext)

    } catch (err) {
      console.log('ERROR removeItemFromOrder = ', err);
      let error = [Text({ text: 'error-on-server' })];
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

  store.on('notification', async ({ context }, obj, { dispatch }) => {
    console.log('call when arrive notification')
    let newContext = context;
    const user_id = obj
    const urlChatItem = `wss://back.ftownpl.com:8443/ws/notifications/${user_id}/?token=$${getCookie('ft_token')}`;
    let ws = {};
    const startWs = () => {
      ws = new WebSocket(urlChatItem); // создаем ws соединение
    }

    if (!!getCookie('ft_token')) {
      startWs()
      ws.onopen = (open) => {
        console.log('auto call notifications')
        gettingData()
      }
      ws.onclose = (close) => {
        console.log({ close })
        setTimeout(startWs(), 3000);
        if (close.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${close.code} причина=${close.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          console.log(`[close] Соединение прервано, код=${close.code}`);
        }
      }
    }

    ws.onerror = (error) => {
      alert(`[error] ${error.message} ${JSON.stringify(error, null, 4)}`);
    };

    const gettingData = () => {
      if (!ws) return;
      ws.onmessage = async e => {                //подписка на получение данных по вебсокету
        let message = JSON.parse(e.data);
        
        
        if (message?.notifications?.length) {          
          message = serializeNotifications({ results: message.notifications })
          dispatch('setNotificationTest', {message})
        } else if(message?.notification){
          message = serializeNotifications({ results: [message.notification] })
          newContext = {
            ...newContext,
            "init_state": {
              ...newContext.init_state,
              profile: {
                ...newContext.init_state.profile,
                notifications: newContext.init_state.profile.notifications + 1,
              }
            },
          }          
          dispatch('context', newContext);
          console.log('add context notification')
          return dispatch('getNotice');
        };
      };
    };
  })
  
  store.on('@init', () => ({notificationTest: {
                                                count: 0, 
                                                selectItemsNotice:[],
                                                isSelectAllItems: false,               
                                                results: []
                                              }
                          }) 
  )

  store.on('setNotificationTest', ({notificationTest}, obj, {dispatch}) => {
    console.log({obj})
    const { message } = obj;
    return {
      notificationTest: {
        ...notificationTest,
        count: message.results.length,
        results: message.results.filter(el => message.results.length = 30),
        selectItemsNotice: [],
      }
    }
  })


}
