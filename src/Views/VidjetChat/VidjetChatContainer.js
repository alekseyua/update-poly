import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import VidjetChat from './VidjetChat';
import VidjetChatViews from './VidjetChatViews';

const VidjetChatContainer = ({
  answers,
  categorys,
}) => {

  const { dispatch } = useStoreon();
  const [isShowChat, setIsShowChat] = useState(false);
  const options = categorys.map(el => {
    return (
      {
        title: el.category,
        value: el.id
      }
    )
  })

  const toggleOpenChats = () => {
    dispatch('getFaq');
    setIsShowChat(c => !c)
  }

  const submitQuestrion = (data, func) => {
    const params = {
      name: data.name,
      email: data.email,
      category: data.category,
      question: data.question,
      toggleOpenChats: data.toggleOpenChats,
      func: func
    };
    dispatch('sendMessageAdministrator', params);
  };

  const successResponse = false;
  if (!isShowChat) {
    return (
      <VidjetChat
        toggleOpenChats={toggleOpenChats}
      />
    )
  } else {
    return (
      <VidjetChatViews.Wrapper>
        <VidjetChatViews.HeadChat toggleOpenChats={toggleOpenChats} />
        <VidjetChatViews.FieldsChat
          isShowChat={isShowChat}
          answers={answers}
          options={options}
          successResponse={successResponse}
          submitQuestrion={submitQuestrion}
          toggleOpenChats={toggleOpenChats}
        />
      </VidjetChatViews.Wrapper>
    )
  }

};

export default React.memo(VidjetChatContainer);
