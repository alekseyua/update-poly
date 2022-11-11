import React from 'react';
import { useStoreon } from 'storeon/react';
import VidjetChat from './VidjetChat';

const VidjetChatComponent = ({
  isShowChat
}) => {
  const { dispatch } = useStoreon();

  const toggleOpenChats = () => {
    dispatch('openModalVidjetChat');
    // setisShowChat(!isShowChat);
  };

 
  if (!isShowChat) {
    return (
    <VidjetChat
      toggleOpenChats = { toggleOpenChats }
    />
    )
  }else{
    return (
      <></>
    )
  }

};

export default React.memo(VidjetChatComponent);
