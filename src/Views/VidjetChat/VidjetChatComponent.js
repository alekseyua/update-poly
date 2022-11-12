import React from 'react';
import { useStoreon } from 'storeon/react';
import VidjetChat from './VidjetChat';
import VidjetChatViews from './VidjetChatViews';

const VidjetChatComponent = ({
  answers,
  isShowChat,
  answerCategorys,
  successResponse,
  toggleOpenChats,
  submitQuestrion
}) => {
  const { dispatch } = useStoreon();


  if (!isShowChat) {
    return (
    <VidjetChat
      toggleOpenChats = { toggleOpenChats }
    />
    )
  }else{
    return (
      <VidjetChatViews.Wrapper>
      <VidjetChatViews.HeadChat toggleOpenChats={toggleOpenChats} />
      <VidjetChatViews.FieldsChat
        isShowChat = { isShowChat }
        answers={answers}
        categorys={answerCategorys}
        successResponse={successResponse}
        submitQuestrion={submitQuestrion}
      />
    </VidjetChatViews.Wrapper>
    )
  }

};

export default React.memo(VidjetChatComponent);
