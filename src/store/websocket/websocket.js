import api from "../../api/api";
import { getCookie } from "../../helpers/helpers";

export const websocket = store => {
  let messageArr = []
  store.on('@init', ()=>({chatOrdersMessage: []}))

  store.on('chatOrdersMessage/set', ({chatOrdersMessage},obj)=>{

      if(obj.order_items_chat !== undefined){
          messageArr = obj.order_items_chat;
      }else if(obj.order_item_message !== undefined){
          let newObj = obj.order_item_message;
          messageArr = messageArr.map(item=>{
                      if(item.item_id === newObj.order_item_id){
                         item = { 
                                  chat_order_items: item.chat_order_items.concat(newObj).reverse(),
                                  item_id: item.item_id
                              }
                      }
                      return item
                  })
      }
      return {chatOrdersMessage : messageArr}
  })



  store.on('correspondence', async ({ context }, obj, { dispatch }) => {

    const order_id = context.init_state.page_info.id;
    const urlChatItem = `wss://back.ftownpl.com:8443/ws/chat/${order_id}/?token=$${getCookie('ft_token')}`;

    
    let ws = {};
    
    const startWs = () => {
      ws = new WebSocket(urlChatItem); // создаем ws соединение
      console.log('create ws connect', { urlChatItem })
      
    }
    
          console.log({ws})
    // const newWS = () => {
      if (!!getCookie('ft_token')) {
        startWs()
        ws.onopen = (open) => {
          console.log({open})
          gettingData()
        }
        ws.onclose = (close) => {
          console.log({close})
          setTimeout(startWs(), 3000);
        }
      }
    // }
    // newWS()
    // return () => {
    //   if (!!ws.current) {
    //     ws.current.onopen = () => {
    //       ws.current.send(JSON.stringify({ disconnect: true }));
    //       ws.current.close(); // кода меняется isState - соединение закрывается
    //     }
    //   }
    // }


      const gettingData = () => {
        if (!ws) return;    
        ws.onmessage = e => {                //подписка на получение данных по вебсокету
          const message = JSON.parse(e.data);
          console.log({message})
          if(Object.keys(message)){
            let { order_chat, order_items_chat, order_message, order_item_message } = message;

            dispatch('chatOrdersMessage/set',message)
            if(order_chat !== undefined){
               if(order_chat.length > 0){

              }
            }else if(order_message !== undefined){

              // setcorrespondenceState(prev=> ([...[message.order_message], ...prev]));
            }
          }
          
          return ()=>{
            console.log('return ???')
            if(!!ws){
              console.log('return 2 ???')
              
              ws.onopen = () =>{ 
                console.log('return 3 ???')
                ws.send(JSON.stringify({disconnect:true}));
                ws.close(); // кода меняется isState - соединение закрывается
              }
            }
          }
      }
    }

  })
}