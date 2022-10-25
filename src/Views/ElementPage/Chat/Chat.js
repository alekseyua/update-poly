import React, { useState } from 'react';
import { Formik } from 'formik';
import Form from '../../Form';
import ChatFieldUser from '../ChatField/ChatFieldUser';
import ChatFieldAdmin from '../ChatField/ChatFieldAdmin';
import SendChatBlock from '../SendChatBlock/SendChatBlock';
import ChatFieldsWrapper from '../ChatField/ChatFieldsWrapper';
import WrapperChat from '../SectionWrapper/WrapperChat';
import HeadChat from '../HeadChat/HeadChat';

const Chat = ({
  idOrder,
  heandlerClickInfo,
  sendMessage,
  order_chat,
}) => {

  const valuesState = {
    message: '',
    orderChat: idOrder,
    files: null,
    activeBtnMessageForProduct: true,
  }

  
  const getChatData = () => {
    // orderApi
    //   .getCorrespondence({ idOrder: idOrder })
    //   .then((res) => {
    //     //setcorrespondenceState(res);
    //   });
  };

  const sendCommentFromTextField = async (values, { resetForm }) => {

  };


  const openModalImage = (image) => {
  //   setModalStates({
  //     content: (
  //       <ModalContentViews.ModalWrapper>
  //         <ModalContentViews.CloseBtn closeModal={closeModal} />
  //         <ModalContentViews.ContentBlock>
  //           <ModalContentViews.CenterPosition>
  //             <ModalContentViews.ViewsImage image={image} />
  //           </ModalContentViews.CenterPosition>
  //         </ModalContentViews.ContentBlock>
  //       </ModalContentViews.ModalWrapper>
  //     ),
  //     show: true,
  //     addClass: 'modal-review',
  //   });
  };
  const openModalVideo = (video, preview) => {
  //   setModalStates({
  //     content: (
  //       <ModalContentViews.ModalWrapper>
  //         <ModalContentViews.CloseBtn closeModal={closeModal} />
  //         <ModalContentViews.ContentBlock>
  //           <ModalContentViews.CenterPosition>
  //             <ModalContentViews.ViewsVideo video={video} preview={preview} />
  //           </ModalContentViews.CenterPosition>
  //         </ModalContentViews.ContentBlock>
  //       </ModalContentViews.ModalWrapper>
  //     ),
  //     show: true,
  //     addClass: 'modal-review',
  //   });
  };


  // *******************************************************************


  return (
    <WrapperChat>
      <HeadChat
        heandlerClickInfo={heandlerClickInfo}
      />

      <Formik
        enableReinitialize
        onSubmit={sendMessage}
        initialValues={valuesState}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, setValues }) => {

          return (
            <Form
              onSubmit={handleSubmit}
            >

              <ChatFieldsWrapper>
                {
                  order_chat?.length ?
                    order_chat.map((el, i) => {
                      if (el.is_me) {
                        return (
                          <ChatFieldUser
                            openModalImage={openModalImage}
                            openModalVideo={openModalVideo}
                            key={i}
                            {...el}
                          />
                        );
                      } else {
                        return (
                          <ChatFieldAdmin
                            openModalImage={openModalImage}
                            openModalVideo={openModalVideo}
                            key={i}
                            {...el}
                          />
                        );
                      }
                    })
                    : null
                }
              </ChatFieldsWrapper>
              <SendChatBlock
                values={values}
                nameInput={'message'}
                nameFile={'files'}
                setFieldValue={setFieldValue}
              />
            </Form>
          );
        }}
      </Formik>
    </WrapperChat>
  );
};

export default React.memo(Chat);
