import api from "../../api/api";

export const profileLK = store => {

    const orderApi = api.orderApi;
  

    store.on('getAdresses', async ({ context }, obj, { dispatch }) => {
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
                          ...res,
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
    } )

    
    
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
    
    } )

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
}