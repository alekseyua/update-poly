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
            let newDataProductsResults = context.init_state.dataProducts.results;
            const params = {
                product: obj.id,
            }

            const resAddWishList = await apiProfile.postWishlist(params);
            newDataProductsResults = newDataProductsResults.map( el => el.id === obj.id? {...el, is_liked: true} : el)
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataProducts: {
                        ...context.init_state.dataProducts,
                        results: newDataProductsResults
                    },
                    profile: {
                        ...context.init_state.profile,
                        wishlist: +context.init_state.profile.wishlist + 1
                    }
                },
            }
            dispatch('context', newContext)
        }catch(err){
            console.log('Error add wish list ', err)
        }
    })

    store.on('removeWishList', async ({ context }, obj, { dispatch }) => {
        try{
            let newDataProductsResults = context.init_state.dataProducts.results;
            const resRemoveWishList = await apiProfile.deleteWishlist(obj.id);
            newDataProductsResults = newDataProductsResults.map( el => el.id === obj.id? {...el, is_liked: false} : el)
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataProducts: {
                        ...context.init_state.dataProducts,
                        results: newDataProductsResults
                    },
                    profile: {
                        ...context.init_state.profile,
                        wishlist: +context.init_state.profile.wishlist - 1
                    }
                },
            }
            dispatch('context', newContext)
        }catch(err){
            console.log('Error add wish list ', err)
        }
    })
}