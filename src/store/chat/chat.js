import api from "../../api/api";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const chat = store => {
    const orderApi = api.orderApi;

    store.on('sendMessageProduct', async ({ context, closeModalState }, obj, { dispatch }) => {
       
          try{
            const { image, textMessage, upDownBtn, idProduct, setFieldValue } = obj;
            dispatch('setModalState', {
              show: true,
            })
          const fd = new FormData();
          fd.set('order_item_id', idProduct);
          fd.set('message', textMessage);
          fd.set('files', image);     
            

          const res = await orderApi.postCorrespondence_order_item(fd);
          console.log({res})

          setFieldValue('image',null)
          setFieldValue('textMessage','')
          setFieldValue('upDownBtn', false)
          setFieldValue('image',null)
          setFieldValue('activeBtnMessageForProduct', true)
          
          console.log({res})
          dispatch('setModalState', {
            show: false,
          })
          } catch (err) {
            console.log('ERROR removeItemFromOrder = ', err);
            let error = ['Ошибка на сервере, попробуйте позже!']
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
            }
            dispatch('setModalState', {
                show: true,
                content: textErrorMessage(error),
                iconImage: errorAlertIcon,
                addClass: 'modal-alert-error',
                action: {
                    title: ['продолжить', null]
                },
                onClick: () => closeModalState()
            })
          }
    })

}