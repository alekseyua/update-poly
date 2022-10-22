import api from "../../api/api";
import { putUserDataSerializer } from "../../helpers/serializers";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const profileLK = store => {

    const orderApi = api.orderApi;
    const userApi = api.userApi;

    store.on('getAdresses', async ({ context }, obj, { dispatch }) => {
      try {

          const params = {
              page: obj?.page ?? 1
          }

          const res = await orderApi.getOrderAddressDeliviry(params);
          console.log({res})
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
          if (obj?.country){
              const timerTimeout = setTimeout(() => {
                  const paramsGetCountryDelivery = {
                      country: obj?.country
                  }
                  dispatch('getCountryDeliviry', paramsGetCountryDelivery);
                  return () => clearTimeout(timerTimeout);
              }, 400)
          }
      } catch (err) {
          console.log('ERROR GET DATA FROM REQUEST ORDER ADDRESS = ', err);
      }
    })

    store.on('deleteAddresDelivery', async ({  context }, obj, { dispatch }) => {

      const { idAddress } = obj;

      const deleteAddress = await orderApi.deleteByIdOrderAddressDeliviry(idAddress)
      if (context.init_state.order.addressDilivery.results.length - 1 === 10 && context.init_state.order.addressDilivery.count > 10 ){
        dispatch('getAdresses')
      }
      const newContext = {
        ...context,
        "init_state": {
            ...context.init_state,                
            order: {
              addressDilivery: {
                ...context.init_state.order.addressDilivery,
                count: context.init_state.order.addressDilivery.count - 1,
                results: context.init_state.order.addressDilivery.results.filter( el => el.id !== idAddress )
              }
            }
        }
      }

      dispatch('context', newContext)
    })    
    
    store.on('searchAddress', async ({  context }, obj, { dispatch }) => {
      try{
        const { q } = obj;
        console.log({q})
        let newContext = {
          ...context,
          "init_state": {
              ...context.init_state,                
              order: {
                addressDilivery: {
                  ...context.init_state.order.addressDilivery,
                  textSearch: q === ''? '' : q,
                  currentPage: 1
                }
              }
          }
        }
  
      dispatch('context', newContext);
      // if (q === '' ){
      //  return dispatch('getAdresses')
      // }
      const resSearch = await orderApi.getOrderAddressSearch({ q: q })
      
      console.log('result search = ', {resSearch})
      newContext = {
        ...newContext,
        "init_state": {
            ...newContext.init_state,                
            order: {
              addressDilivery: {
                ...newContext.init_state.order.addressDilivery,
                count: resSearch.length,
                results: resSearch,
              }
            }
        }
      }

      dispatch('context', newContext);

    }catch(err){
      console.log('ERROR get data search', err)
    }
    
    })

    store.on('moreAddress', async ({ context }, obj, { dispatch }) => {
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
                          results: [ ...context.init_state.order.addressDilivery.results, ...res.results ],
                          textSearch: '',
                          currentPage: page,
                      },

                  }
              }
          }

          console.log('newContext',{a: [...context.init_state.order.addressDilivery.results, ...res.results] },{b: res.results})
          dispatch('context', newContext);
          
      } catch (err) {
          console.log('ERROR GET DATA FROM REQUEST ORDER ADDRESS = ', err);
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
        console.log( {params} )


        const res = await userApi.putUser(userId, putUserDataSerializer(params));
        console.log( {res}, {a: res.data.data})


          const newContext = {
              ...context,
              "init_state": {
                  ...context.init_state,
                  profile: {
                      ...context.init_state.profile,
                      organization: {
                        inn: res.data.data.inn, 
                        organization: res.data.data.organization,
                      },
                      links: {
                        vk_link: res.data.data.vk_link, 
                        insta_link: res.data.data.insta_link, 
                        site_link: res.data.data.site_link
                      },
                      user: {
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
          console.log('ERROR GET DATA FROM REQUEST updateUserData = ', err);
          setFieldValue('isSaved', true)
          let error = ['Ошибка на сервере, попробуйте позже!']

          if (err?.data) {
              const errors = err.data;
              for(let key in errors){
                error.push(`${errors[key]}`)
                const element = errors[key][0];
                const timerTimeout = setTimeout(() => {
                  setFieldError(key,element);
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