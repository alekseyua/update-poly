import api from "../../api/api";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const wishList = store => {
    const apiProfile = api.profileApi;

    store.on('@init', ()=>({countWishList: 0}));

   
      store.on('getWishlist', async ({ context, closeModalState }, obj, { dispatch }) => {

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
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
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

    store.on('addWishList', async ({ context, closeModalState }, obj, { dispatch }) => {
        console.log('test add wish list',{obj})
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
            dispatch('context', newContext);

            if(obj?.pathname === '/wishlist'){
                const timerSetTimout = setTimeout(()=>{
                    dispatch('getWishlist')
                    return ()=>clearTimeout(timerSetTimout)
                },400)
            }

        } catch (err) {
            console.log('Error add wish list ', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
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

    store.on('removeWishList', async ({ context, closeModalState }, obj, { dispatch }) => {
        console.log('test remove wish list', {obj})
        try{
            let newContext = {}
            const resRemoveWishList = await apiProfile.deleteWishlist(obj.id);
            
            if (context.init_state.dataProducts){
                let newDataProductsResults = context.init_state.dataProducts.results;
                newDataProductsResults = newDataProductsResults.map( el => el.id === obj.id? {...el, is_liked: false} : el)
                newContext = {
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
            }
            if(context.init_state.profile?.list_wishes?.results.length > 0){
                newContext = {
                    ...context,
                    "init_state": {
                        ...context.init_state,                        
                        profile: {
                            ...context.init_state.profile,
                            wishlist: +context.init_state.profile.wishlist - 1,
                            list_wishes: {
                                ...context.init_state.profile.list_wishes,
                                count: context.init_state.profile.list_wishes.count - 1,
                                results: context.init_state.profile.list_wishes.results.filter( el => el.product.id !== obj.id )
                            }
                        }
                    },
                }
            }

           
        dispatch('context', newContext)

            if(obj?.pathname === '/wishlist' && context.init_state.profile.list_wishes.results.length === 1){
                const timerSetTimout = setTimeout(()=>{
                    dispatch('getCatalog')
                    return ()=>clearTimeout(timerSetTimout);
                },400)
            }

        } catch (err) {
            console.log('Error add wish list ', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
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