import api from "../../api/api";

export const websocket = store => {

    store.on('correspondence', ( { context }, obj, { dispatch } ) => {
        const urlChatItem = `wss://back.ftownpl.com:8443/ws/chat/${order_id}/?token=$${getCookie('ft_token')}`;

        useEffect(() => {
          console.log('create ws connect')
              const newWS = () => {
                ws.current = new WebSocket(urlChatItem); // создаем ws соединение
              } 
              if(!!getCookie('ft_token')){
                newWS()
                ws.current.onopen = () =>{                  
                  setIsState(!isState)
                  gettingData();
                }
                ws.current.onclose = () => {
                  setTimeout(newWS(), 3000);
                  setIsState(!isState)        
                }
              }
          return () => {
            if(!!ws.current){
              ws.current.onopen = () =>{ 
                ws.current.send(JSON.stringify({disconnect:true}));
                ws.current.close(); // кода меняется isState - соединение закрывается
              }
            }
          }
      
        }, [ws]);


  const gettingData = useCallback(() => {
    if (!ws.current) return;    
    ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
      const message = JSON.parse(e.data);
      if(message?.status !== false){
        let { order_chat, order_message, order_item_message } = message;
        dispatch('chatOrdersMessage/set',message)
        if(order_chat !== undefined){
           if(order_chat.length > 0){
            setcorrespondenceState(order_chat)
           }
        }else if(order_message !== undefined){
         setcorrespondenceState(prev=> ([...[message.order_message], ...prev]));
        }
      }
    };
    return ()=>{
      if(!!ws.current){
        ws.current.onopen = () =>{ 
          ws.current.send(JSON.stringify({disconnect:true}));
          ws.current.close(); // кода меняется isState - соединение закрывается
        }
      }
    }
}, [isState]);
    })
}