import React from 'react';
import { Formik } from 'formik';
import Form from '../../Form';
import ChatFieldUser from '../ChatField/ChatFieldUser';
import ChatFieldAdmin from '../ChatField/ChatFieldAdmin';
import SendChatBlock from '../SendChatBlock/SendChatBlock';
import ChatFieldsWrapper from '../ChatField/ChatFieldsWrapper';
import WrapperChat from '../SectionWrapper/WrapperChat';
import HeadChat from '../HeadChat/HeadChat';

const Chat = ({ idOrder }) => {

  const correspondenceState = []
  const valuesState = {
    message: '',
    order: null,
    files: null,
  }
  const getChatData = () => {
    // orderApi
    //   .getCorrespondence({ idOrder: idOrder })
    //   .then((res) => {
    //     //setcorrespondenceState(res);
    //   });
  };

  const sendCommentFromTextField = async (values, { resetForm }) => {
    // setDisablebtn(true)
    // const fd = new FormData();
    // fd.set('order', idOrder);
    // fd.set('message', values.text_field);
    // fd.set('files', values.file_list);

    // orderApi
    //   .postCorrespondence(fd)
    //   .then((res) => {
    //     getChatData();
    //     resetForm({
    //       text_field: '',
    //       file_list: [],
    //     });
    // })
    // .catch(err=>{
    //   setDisablebtn(false)
    // });
  };

  const handleChange = (key, value) => {
    // setvaluesState({
    //   ...valuesState,
    //   [key]: value,
    // });
  };

 

  // const openModalImage = (image) => {
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
  // };
  // const openModalVideo = (video, preview) => {
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
  // };


  // *******************************************************************
 


  return (
    <Formik 
      enableReinitialize 
      onSubmit={sendCommentFromTextField} 
      handleChange={handleChange} 
      initialValues={valuesState}
    >
      {({ handleSubmit, values, handleChange, setFieldValue, setValues }) => {

        return (
          <Form noValidate onSubmit={handleSubmit}>
            <WrapperChat>
              <HeadChat />

              <ChatFieldsWrapper>
                {correspondenceState.map((el, i) => {
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
                })}
              </ChatFieldsWrapper>
              <SendChatBlock
                  values = { values }
                  nameInput = { 'message' }
                  nameFile = { 'files' }
                  setFieldValue = { setFieldValue }
                />
            </WrapperChat>
          </Form> 
        ); 
      }}
    </Formik>
  );
};

export default React.memo(Chat);
