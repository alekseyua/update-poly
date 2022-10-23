import api from "../../api/api";
import { getCookie } from "../../helpers/helpers";

export const websocket = store => {

  store.on('correspondence', async ({ context }, obj, { dispatch }) => {

    const order_id = context.init_state.page_info.id;
    const urlChatItem = `wss://back.ftownpl.com:8443/ws/chat/${order_id}/?token=$${getCookie('ft_token')}`;

    console.log('create ws connect', { urlChatItem })

    const ws = new WebSocket(urlChatItem); // создаем ws соединение
    
          console.log({ws})
    // const newWS = () => {
      if (!!getCookie('ft_token')) {
        
        ws.onopen = (open) => {
          // setIsState(!isState)
          // gettingData();
          console.log({open})

        }
        ws.onclose = (close) => {
          console.log({close})

          // setTimeout(newWS(), 3000);
          // setIsState(!isState)
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


    //   const gettingData = useCallback(() => {
    //     if (!ws.current) return;    
    //     ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
    //       const message = JSON.parse(e.data);
    //       if(message?.status !== false){
    //         let { order_chat, order_message, order_item_message } = message;
    //         dispatch('chatOrdersMessage/set',message)
    //         if(order_chat !== undefined){
    //            if(order_chat.length > 0){
    //             setcorrespondenceState(order_chat)
    //            }
    //         }else if(order_message !== undefined){
    //          setcorrespondenceState(prev=> ([...[message.order_message], ...prev]));
    //         }
    //       }
    //     };
    //     return ()=>{
    //       if(!!ws.current){
    //         ws.current.onopen = () =>{ 
    //           ws.current.send(JSON.stringify({disconnect:true}));
    //           ws.current.close(); // кода меняется isState - соединение закрывается
    //         }
    //       }
    //     }
    // }, [isState]);


  })
}