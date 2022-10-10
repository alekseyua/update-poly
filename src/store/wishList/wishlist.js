import api from "../../api/api";

export const wishList = store => {
    const apiProfile = api.profileApi;

    store.on('@init', ()=>({countWishList: 0}));

   
      store.on('getWishlist', async ({ context }, obj, { dispatch }) => {

        try {

            const params = {
                page_size: 30,
                page: obj?.page || 1
            }
            
            const res = await  apiProfile.getWishlist(params);
           
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    profile: {
                        ...context.init_state.profile,
                        list_wishes: res,                        
                    }
                },
            }
            console.log('STORE CONTEXT IN list_wishes = ', 
            {newContext}
            
            )
            dispatch('context', newContext)

            // console.log('result get data cart = ', res)

        } catch (err) {
            console.log('ERROR IN GET DATA list_wishes STORE', err)
        }

    })

    store.on('addWishList', async ({ context }, obj, { dispatch }) => {
        try{

            const params = {
                product: obj.id,
            }
            const resAddWishList = await apiProfile.postWishlist(params);
            console.log('resAddWishList = ', resAddWishList);

        }catch(err){
            console.log('Error add wish list ', err)
        }
    })

    store.on('removeWishList', async ({ context }, obj, { dispatch }) => {
        try{

            const resRemoveWishList = await apiProfile.deleteWishlist(obj.id);
            console.log('resRemoveWishList = ', resRemoveWishList);

        }catch(err){
            console.log('Error add wish list ', err)
        }
    })
}