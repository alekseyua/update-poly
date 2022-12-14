import api from "../../api/api";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const chat = store => {
  const orderApi = api.orderApi;

  store.on('sendMessageProduct', async ({ context, closeModalState }, obj, { dispatch }) => {
    try {
      const { files, message, idProduct, setFieldValue } = obj;
      const fd = new FormData();
      fd.set('order_item_id', idProduct);
      fd.set('message', message);
      files ? fd.set('files', files[0]) : null;
      
      setFieldValue('activeBtnMessageForProduct', true)
      const res = await orderApi.postCorrespondence_order_item(fd);
      setFieldValue('upDownBtn', false)
      setFieldValue('message', '')
      setFieldValue('files', null)

    } catch (err) {
      console.log('ERROR sendMessageProduct = ', err);
      let error = [Text({ text: 'error-on-server' })];
      if (err?.data) {
        const errors = err.data;
        if (typeof errors !== 'object') {
          error.push(`${errors}`)
        } else {
          error.push(`${errors[0]}`)
        }
        console.log({ errors }, { err: typeof errors })
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

  store.on('sendMessageChatProduct', async ({ context, closeModalState }, obj, { dispatch }) => {

    try {
      const { files, message, idProduct, setFieldValue } = obj;
      const fd = new FormData();
      fd.set('order', idProduct);
      fd.set('message', message);
      files ? fd.set('files', files[0]) : null;
      setFieldValue('activeBtnMessageForProduct', true)
      const res = await orderApi.postCorrespondence(fd);
      setFieldValue('message', '')
      setFieldValue('upDownBtn', false)
      setFieldValue('files', null)

    } catch (err) {
      console.log('ERROR sendMessageChatProduct = ', err);
      let error = [Text({ text: 'error-on-server' })];
      if (err?.data) {
        const errors = err.data;
        if (typeof errors !== 'object') {
          error.push(`${errors}`)
        } else {
          error.push(`${errors[0]}`)
        }
        console.log({ errors }, { err: typeof errors })
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
