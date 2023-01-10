import api from "../../api/api";
import { ROLE } from "../../const";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const wishList = store => {
    const apiProfile = api.profileApi;

    store.on('@init', () => ({ countWishList: 0 }));


    store.on('getWishlist', async ({ context, closeModalState }, obj, { dispatch }) => {

        try {

            const params = {
                page_size: 30,
                page: obj?.page || 1
            }
            // const res = await apiProfile.getWishlist(params);
            if(context.init_state.profile.role === ROLE.UNREGISTRED) return 
            let res = await apiProfile.getWishlist(params)
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    profile: {
                        ...context.init_state.profile,
                        list_wishes: {
                            ...context.init_state.profile.list_wishes,
                            count: res?.count ?? 0,
                            results: res?.results ?? [],
                        }
                    },
                    isLoading: {
                        ...context.init_state.isLoading,
                        isLoadingMywish: true,
                    },
                }
            }
            dispatch('context', newContext)


        } catch (err) {
            console.log('ERROR IN GET DATA list_wishes STORE', err)
            let error = [Text({ text: 'error-on-server' })];
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

        try {
            console.log({context}, {obj})            
            const { role } = context.init_state.profile;
            if ( role === ROLE.UNREGISTRED ) return (
                dispatch('setModalState',{
                     show: true,
                     content: (
                        <div className={'modal-message'}>
                            Чтобы полноценно воспользоваться всеми возможностями сотрудничества, необходимо пройти регистрацию
                        </div>
                        ),
                     iconImage: errorAlertIcon,
                     action: {
                     title: ['Пройти регистрацию', null]
                     },
                     onClick: () => {
                         obj.redirectTo('/registration')
                         closeModalState()
                     }                     
                 })
             )            
            let newDataProductsResults = context.init_state?.dataProducts?.results || [];
            let newDataProductsResultsYouAlredyWatch = context.init_state?.youAlredyWatch?.results || [];
            let recommended = context.init_state?.recommended;
            const params = {
                product: obj.id,
            }
            let newContext = {
                ...context,
                        "init_state": {
                            ...context.init_state,

                        }
            }
            const resAddWishList = await apiProfile.postWishlist(params);

            switch ( obj.whereLike ) {
                case 'product':
                    newDataProductsResults = newDataProductsResults.map(el => el.id === obj.id ? { ...el, is_liked: true } : el);
                    newDataProductsResultsYouAlredyWatch = newDataProductsResultsYouAlredyWatch.map(el => el.id === obj.id ? { ...el, is_liked: true } : el);

                    newDataProductsResults && newDataProductsResults.map( el => el.id === obj.id && el.is_liked).includes(true)?
                        newContext = {
                            ...newContext,
                            "init_state": {
                                ...newContext.init_state,
                                dataProducts: {
                                    ...newContext.init_state.dataProducts,
                                    results: newDataProductsResults
                                },
                            },
                        }
                        : null;
                        
                        newDataProductsResultsYouAlredyWatch && newDataProductsResultsYouAlredyWatch.map( el => el.id === obj.id && el.is_liked).includes(true)?
                            newContext = {
                                ...newContext,
                                "init_state": {
                                    ...newContext.init_state,
                                    youAlredyWatch: {
                                        ...newContext.init_state.youAlredyWatch,
                                        results: newDataProductsResultsYouAlredyWatch
                                    },
                                },
                            }
                            : null;

                        recommended && recommended.map( el => el.id === obj.id).includes(true)?
                            newContext = {
                                ...newContext,
                                "init_state": {
                                    ...newContext.init_state,
                                    recommended: recommended.map(el => el.id === obj.id ? { ...el, is_liked: true } : el),
                                },
                            }
                            : null;
                            
                case 'detail-product':
                    newContext = {
                        ...newContext,
                        "init_state": {
                            ...newContext.init_state,
                            productDetails: {
                                ...newContext.init_state.productDetails,
                                is_liked: true
                            },
                        },
                    }
                default: 
            }

            newContext = {
                ...newContext,
                "init_state": {
                    ...newContext.init_state,
                    profile: {
                        ...newContext.init_state.profile,
                        wishlist: +newContext.init_state.profile.wishlist + 1
                    }
                },
            }

            dispatch('context', newContext);

            if (obj?.pathname === '/wishlist') {
                const timerSetTimout = setTimeout(() => {
                    dispatch('getWishlist')
                    return () => clearTimeout(timerSetTimout)
                }, 400)
            }



        } catch (err) {
            console.log('Error add wish list ', err)
            let error = [Text({ text: 'error-on-server' })];
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

        try {           
            const { role } = context.init_state.profile;
            if ( role === ROLE.UNREGISTRED ) return (
                dispatch('setModalState',{
                     show: true,
                     content: (
                        <div className={'modal-message'}>
                            Чтобы полноценно воспользоваться всеми возможностями сотрудничества, необходимо пройти регистрацию
                        </div>
                        ),
                     iconImage: errorAlertIcon,
                     action: {
                     title: ['Пройти регистрацию', null]
                     },
                     onClick: () => {
                         obj.redirectTo('/registration')
                         closeModalState()
                     }                     
                 })
             )            
            let newDataProductsResults = context.init_state?.dataProducts?.results || [];
            let newDataProductsResultsYouAlredyWatch = context.init_state?.youAlredyWatch?.results || [];
            let wishList = context.init_state.profile?.list_wishes?.results;
            let recommended = context.init_state?.recommended;
            let newContext = {
                ...context,
                        "init_state": {
                            ...context.init_state,

                        }
            }
            const resAddWishList = await apiProfile.deleteWishlist(obj.id);
            console.log({obj}, {wishList})
            switch ( obj.whereLike ) {
                case 'product':
                    newDataProductsResults = newDataProductsResults.map(el => el.id === obj.id ? { ...el, is_liked: false } : el);
                    newDataProductsResultsYouAlredyWatch = newDataProductsResultsYouAlredyWatch.map(el => el.id === obj.id ? { ...el, is_liked: false } : el);

                    newDataProductsResults && newDataProductsResults.map( el => el.id === obj.id && !el.is_liked).includes(true)?
                        newContext = {
                            ...newContext,
                            "init_state": {
                                ...newContext.init_state,
                                dataProducts: {
                                    ...newContext.init_state.dataProducts,
                                    results: newDataProductsResults
                                },
                            },
                        }
                        : null;
                        
                        newDataProductsResultsYouAlredyWatch && newDataProductsResultsYouAlredyWatch.map( el => el.id === obj.id && !el.is_liked).includes(true)?
                            newContext = {
                                ...newContext,
                                "init_state": {
                                    ...newContext.init_state,
                                    youAlredyWatch: {
                                        ...newContext.init_state.youAlredyWatch,
                                        results: newDataProductsResultsYouAlredyWatch
                                    },
                                },
                            }
                            : null;

                        wishList && wishList.map( el => el.product.id === obj.id).includes(true)?
                            newContext = {
                                ...newContext,
                                "init_state": {
                                    ...newContext.init_state,
                                    profile: {
                                        ...newContext.init_state.profile,
                                        list_wishes: {
                                            ...newContext.init_state.profile.list_wishes,
                                            results: wishList.filter(el => el.product.id !== obj.id),
                                        }
                                    }
                                },
                            }
                            : null;

                        recommended && recommended.map( el => el.id === obj.id).includes(true)?
                            newContext = {
                                ...newContext,
                                "init_state": {
                                    ...newContext.init_state,
                                    recommended: recommended.map(el => el.id === obj.id ? { ...el, is_liked: false } : el),
                                },
                            }
                            : null;


                case 'detail-product':
                    newContext = {
                        ...newContext,
                        "init_state": {
                            ...newContext.init_state,
                            productDetails: {
                                ...newContext.init_state.productDetails,
                                is_liked: false
                            },
                        },
                    }
                default: 
            }
                 newContext = {
                        ...newContext,
                        "init_state": {
                            ...newContext.init_state,
                            profile: {
                                ...newContext.init_state.profile,
                                wishlist: +newContext.init_state.profile.wishlist - 1
                            }
                        },
                    }
            dispatch('context', newContext);


            if (obj?.pathname === '/wishlist' && context.init_state.profile.list_wishes.results.length === 1) {
                const timerSetTimout = setTimeout(() => {
                    dispatch('getCatalog')
                    return () => clearTimeout(timerSetTimout);
                }, 400)
            }

        } catch (err) {
            console.log('Error add wish list ', err)
            let error = [Text({ text: 'error-on-server' })];
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