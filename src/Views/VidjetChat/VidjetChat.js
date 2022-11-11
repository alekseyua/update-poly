import React from 'react';
import { chats } from '../../images';
import Icon from '../Icon';

const VidjetChat = ({
    toggleOpenChats
}) => {
    return <div className={'inner-chat'}><Icon onClick={toggleOpenChats} className={'chats-icon'} src={chats} alt={'chat'} /></div>;
}

export default VidjetChat;