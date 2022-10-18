import api from "../../api/api";

export const profileLK = store => {

    const orderApi = api.orderApi;
  
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

      dispatch('context', newContext, idAddress)
    } )
}