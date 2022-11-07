import api from "../../api/api";
import { getCookie } from "../../helpers/helpers";

export const websocket = store => {
  const orderApi = api.orderApi;
  
  store.on('chatOrdersMessage/set', ({ context }, obj, { dispatch }) => {
    let messageChat = undefined;
    let messageItemsChat = undefined;
    const messageOrderFromContext = context.init_state.order.correspondence?.order_chat;
    const messagesItemsOrderFromContext = context.init_state.order.correspondence?.order_items_chat;

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
      messageItemsChat = messagesItemsOrderFromContext.map(item => {
        if (item.item_id === newObj.order_item_id) {
          item = {
            chat_order_items: item.chat_order_items.concat(newObj).sort( (a,b)  => b.message_id - a.message_id),
            item_id: item.item_id
          }
        }
        return item
      })
    }

    const newContext = {
      ...context,
      "init_state": {
          ...context.init_state,
          order: {
              ...context.init_state.order,
              correspondence: {
                order_chat: messageChat ?? messageOrderFromContext ?? [],
                order_items_chat: messageItemsChat ?? messagesItemsOrderFromContext ?? [],
              }
          },
          numberCurrentOrderForAddProduct: null,
      },
  }
  
  dispatch('context', newContext)

  })

  store.on('correspondence', async ({ context }, obj, { dispatch }) => {
  
    const order_id = context.init_state.page_info.id;
    const urlChatItem = `wss://back.ftownpl.com:8443/ws/chat/${order_id}/?token=$${getCookie('ft_token')}`;
    let ws = {};
    const startWs = () => {
      ws = new WebSocket(urlChatItem); // создаем ws соединение
    }

    if (!!getCookie('ft_token')) {
      startWs()
      ws.onopen = (open) => {
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
      alert(`[error] ${error.message}`);
    };

    const gettingData = () => {
      if (!ws) return;
      ws.onmessage = e => {                //подписка на получение данных по вебсокету
        const message = JSON.parse(e.data);
        if (Object.keys(message)) {
          dispatch('chatOrdersMessage/set', message)
        }
      }
    }

  })

  store.on('changeStateIsnewMessage', async ({ context, closeModalState }, obj, { dispatch }) => {
      
  try{
    const { idProduct } = obj;
    const messagesItemsOrderFromContext = context.init_state.order.correspondence?.order_items_chat;
    let massiveIdIsnew = []
    let resChangeIsnew = []
    // const newMessage = messagesItemsOrderFromContext.map( el => )
    const newMessage = messagesItemsOrderFromContext.map(item => {
      if (item.item_id === idProduct) {
        item.chat_order_items.filter( el => {
          if(el.is_new) massiveIdIsnew.push(el.message_id)
        })
         item = {
           chat_order_items: item.chat_order_items.map( el => ({ ...el, is_new: false })),
           item_id: item.item_id
         }
      }
       return item
    })
    if ( !!massiveIdIsnew.length ){
      resChangeIsnew  = await orderApi.postCorrespondence_order_item_remake_is_new({
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
  
  dispatch('context', newContext)
  
  } catch (err) {
    console.log('ERROR removeItemFromOrder = ', err);
    let error = [Text({text: 'error-on-server'})];
    if (err?.data) {
        const errors = err.data;
        if ( typeof errors !== 'object') {
            error.push(`${errors}`)
        }else{
            error.push(`${errors[0]}`)
        }
        console.log({errors}, {err: typeof errors})
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