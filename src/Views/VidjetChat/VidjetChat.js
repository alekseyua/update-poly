import React, { useEffect } from 'react';
import { chats } from '../../images';
import Icon from '../Icon';

const VidjetChat = ({
    toggleOpenChats
}) => {
    // useEffect(() => {
    //     var body=document.querySelector('.inner-chat');
    //     var script=document.createElement('script');
    //     script.async=true;        
    //     script.src='//fbstore.sendpulse.com/loader.js';
    //     script.setAttribute('data-sp-widget-id','b1560591-3230-457b-9299-a4cc02ba5876');
    //     body.appendChild(script);
    // },[])
    // кнопка вверх
    return <div className={'inner-chat'}><Icon onClick={toggleOpenChats} className={'chats-icon'} src={chats} alt={'chat'} /></div>
}

export default VidjetChat;

{/* <script src="//fbstore.sendpulse.com/loader.js" data-sp-widget-id="b1560591-3230-457b-9299-a4cc02ba5876" async></script> */}