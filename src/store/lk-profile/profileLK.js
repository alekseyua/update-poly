import api from "../../api/api";
import { putUserDataSerializer } from "../../helpers/serializers";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const profileLK = store => {

  const orderApi = api.orderApi;
  const userApi = api.userApi;

  store.on('getAdresses', async ({ context, closeModalState }, obj, { dispatch }) => {
    try {
      const params = {
        page: obj?.page ?? 1
      }
      const res = await orderApi.getOrderAddressDeliviry(params);
      const newContext = {
        ...context,
        "init_state": {
          ...context.init_state,
          order: {
            ...context.init_state.order,
            addressDilivery: {
              ...context.init_state.order.addressDilivery,
              count: res.count,
              results: res.results,
              textSearch: '',
              currentPage: obj?.page ?? 1
            },
          }
        }
      }

      dispatch('context', newContext);
      if (obj?.country) {
        const timerTimeout = setTimeout(() => {
          const paramsGetCountryDelivery = {
            country: obj?.country
          }
          dispatch('getCountryDeliviry', paramsGetCountryDelivery);
          return () => clearTimeout(timerTimeout);
        }, 400)
      }

    } catch (err) {
      console.log('ERROR GET DATA FROM REQUEST getAdresses = ', err);
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

  store.on('deleteAddresDelivery', async ({ context, closeModalState }, obj, { dispatch }) => {
    try {
      const { idAddress } = obj;
      const deleteAddress = await orderApi.deleteByIdOrderAddressDeliviry(idAddress)
      if (context.init_state.order.addressDilivery.results.length - 1 === 10 && context.init_state.order.addressDilivery.count > 10) {
        dispatch('getAdresses')
      }
      const newContext = {
        ...context,
        "init_state": {
          ...context.init_state,
          order: {
            ...context.init_state.order,
            addressDilivery: {
              ...context.init_state.order.addressDilivery,
              count: context.init_state.order.addressDilivery.count - 1,
              results: context.init_state.order.addressDilivery.results.filter(el => el.id !== idAddress)
            }
          }
        }
      }
      dispatch('context', newContext)

    } catch (err) {
      console.log('ERROR deleteAddresDelivery', err)
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

  store.on('searchAddress', async ({ context, closeModalState }, obj, { dispatch }) => {
    try {
      const { q } = obj;
      let newContext = {
        ...context,
        "init_state": {
          ...context.init_state,
          order: {
            ...context.init_state.order,
            addressDilivery: {
              ...context.init_state.order.addressDilivery,
              textSearch: q === '' ? '' : q,
              currentPage: 1
            }
          }
        }
      }
      dispatch('context', newContext);

      const resSearch = await orderApi.getOrderAddressSearch({ q: q })
      newContext = {
        ...newContext,
        "init_state": {
          ...newContext.init_state,
          order: {
            ...context.init_state.order,
            addressDilivery: {
              ...newContext.init_state.order.addressDilivery,
              count: resSearch.length,
              results: resSearch,
            }
          }
        }
      }
      dispatch('context', newContext);

    } catch (err) {
      console.log('ERROR get data searchAddress', err)
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

  store.on('moreAddress', async ({ context, closeModalState }, obj, { dispatch }) => {
    try {
      const page = context.init_state.order.addressDilivery.currentPage + 1;
      const params = {
        page: page
      }
      const res = await orderApi.getOrderAddressDeliviry(params);
      const newContext = {
        ...context,
        "init_state": {
          ...context.init_state,
          order: {
            ...context.init_state.order,
            addressDilivery: {
              ...context.init_state.order.addressDilivery,
              ...res,
              count: res.count,
              results: [...context.init_state.order.addressDilivery.results, ...res.results],
              textSearch: '',
              currentPage: page,
            },

          }
        }
      }
      dispatch('context', newContext);

    } catch (err) {
      console.log('ERROR get data moreAddress', err)
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

  store.on('updateUserData', async ({ context, closeModalState }, obj, { dispatch }) => {
    const { setFieldValue, setFieldError } = obj;
    try {
      setFieldValue('isSaved', false)
      const userId = context.init_state.profile.user.id;
      const params = {
        lastname: obj.last_name,
        firstname: obj.first_name,
        patronymic: obj.middle_name,
        email: obj.email,
        receive_newsletter: obj.receive_newsletter,
        inn: obj.inn,
        companyName: obj.companyName,
        addresSite: obj.addresSite,
        vk: obj.vk,
        instagram: obj.instagram,
        otherSocialLink: obj.otherSocialLink,
      };

      const res = await userApi.putUser(userId, putUserDataSerializer(params));
      const newContext = {
        ...context,
        "init_state": {
          ...context.init_state,
          profile: {
            ...context.init_state.profile,
            organization: {
              ...context.init_state.profile.organization,
              inn: res.data.data.inn,
              organization: res.data.data.organization,
            },
            links: {
              ...context.init_state.profile.links,
              vk_link: res.data.data.vk_link,
              insta_link: res.data.data.insta_link,
              site_link: res.data.data.site_link
            },
            user: {
              ...context.init_state.profile.user,
              username: res.data.data.username,
              email: res.data.data.email,
              first_name: res.data.data.first_name,
              middle_name: res.data.data.middle_name,
              last_name: res.data.data.last_name,
            },
          }
        }
      }

      dispatch('context', newContext);

      const timerTimeout = setTimeout(() => {
        setFieldValue('isSaved', true)
        return () => clearTimeout(timerTimeout);
      }, 1700)

    } catch (err) {
      setFieldValue('isSaved', true)
      console.log('ERROR GET DATA FROM REQUEST updateUserData = ', err);
      let error = [Text({ text: 'error-on-server' })];

      if (err?.data) {
        const errors = err.data;
        if (typeof errors !== 'object') {
          error.push(`${errors}`)
        } else {
          error.push(`${errors[0]}`)
        }
        for (let key in errors) {
          error.push(`${errors[key]}`)
          const element = errors[key][0];
          const timerTimeout = setTimeout(() => {
            setFieldError(key, element);
            return () => clearTimeout(timerTimeout);
          }, 1000)
        }
      }

      dispatch('setModalState', {
        show: true,
        content: textErrorMessage(error),
        iconImage: errorAlertIcon,
        action: {
          title: ['продолжить', null]
        },
        onClick: () => closeModalState()
      })
    }
  })

}
