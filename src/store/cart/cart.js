import api from "../../api/api";
import { ROLE } from "../../const";
import { getActiveColor, getActiveSize } from "../../helpers/helpers";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const cart = store => {
    const apiCart = api.cartApi

    store.on('@init', () => ({ numberProductPastInCart: null }))
    store.on('saveNumberProductAddToCart', ({ numberProductPastInCart }, obj, { dispatch }) => ({ numberProductPastInCart: obj.productId }))

    store.on('@init', () => ({ numberCurrentOrderForAddProduct: null }));
    store.on('setNumberOrderForAddProducts', ({ context, closeModalState }, obj, { dispatch }) => {
        try {

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        ...context.init_state.dataCart,
                        valueButtonNextToOrder: obj.numberOrder === null ? Text({ text: 'go.to.registration' }) : 'Перейти к добавлению'
                    },
                    numberCurrentOrderForAddProduct: obj.numberOrder
                },
            }
            dispatch('context', newContext)
            return { numberCurrentOrderForAddProduct: obj.numberOrder }
        } catch (err) {
            console.log('ERROR setNumberOrderForAddProducts = ', err);
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

    store.on('getDataCart', async ({ context, closeModalState }, obj, { dispatch }) => {

        try {

            const res = await apiCart.getCartData();

            let tempElement = true;
            let amountTrueItem = 0;
            const valueEnableAllSelectFromServer = res.cartitem_set.reduce((prev, cur, index, arr) => {
                const allCount = arr.length;
                if (tempElement === cur.selected) amountTrueItem++
                if (allCount === amountTrueItem) return true;
                return false
            }, 0)

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        ...context.init_state.dataCart,
                        cartitem_set: res.cartitem_set,
                        in_stock: res.in_stock,
                        ...res,
                        enableAllSelect: valueEnableAllSelectFromServer,
                        agreeWitheRegulations: false,
                    },
                    profile: {
                        ...context.init_state.profile,
                        cart: res.in_cart
                    }
                },
            };

            dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR IN GET DATA CART STORE', err)
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

    store.on('updateInProductCard', async ({ context, closeModalState }, obj, { dispatch }) => {

        try {
            let tempElement = true;
            let amountTrueItem = 0;
            const params = [...obj];
            //?! необходимо реализовать выбирать добавлять и т.д. для опта
            console.log({ params })
            const res = await apiCart.updateCartData(params);
            const valueEnableAllSelectFromServer = res.cartitem_set.reduce((prev, cur, index, arr) => {
                const allCount = arr.length;
                if (tempElement === cur.selected) amountTrueItem++
                if (allCount === amountTrueItem) return true;
                return false
            }, 0)

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        ...context.init_state.dataCart,
                        ...res,
                        cart_ids: res.cart_ids,
                        cartitem_set: res.cartitem_set,
                        in_stock: res.in_stock,
                        enableAllSelect: valueEnableAllSelectFromServer,
                        agreeWitheRegulations: false
                    },
                    profile: {
                        ...context.init_state.profile,
                        // cart: context.init_state.dataCart.in_cart + context.init_state.dataCart.cartitem_set.map( el => el.id === obj[0].id? el : null ).filter( el => el !== null )[0].qty - obj[0].qty
                    }
                },
            };
            dispatch('context', newContext);

        } catch (err) {
            console.log('ERROR INCREMENT PRODUCT LIST CART', err)
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

    store.on('deleteItemFromCart', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { dataCart } = context.init_state;

            const newDataCart = {
                ...dataCart,
                cartitem_set: dataCart.cartitem_set.filter(el => el.id !== obj.id)
            }
            let tempElement = true;
            let amountTrueItem = 0;

            const valueEnableAllSelectFromServer = newDataCart.cartitem_set.reduce((prev, cur, index, arr) => {
                const allCount = arr.length;
                if (tempElement === cur.selected) amountTrueItem++
                if (allCount === amountTrueItem) return true;
                return false
            }, 0)
            const res = await apiCart.deleteCartData(
                {
                    item_id: obj.id
                }
            );

            if (res >= 200 < 300) {
                const newContext = {
                    ...context,
                    "init_state": {
                        ...context.init_state,
                        dataCart: {
                            ...newDataCart,
                            enableAllSelect: valueEnableAllSelectFromServer,
                            agreeWitheRegulations: false
                        },
                        profile: {
                            ...context.init_state.profile,
                            cart: context.init_state.profile.cart - 1
                        }
                    },
                }
                dispatch('context', newContext)
                const timerSetTimeout = setTimeout(() => {
                    dispatch('getDataCart')
                    return clearTimeout(timerSetTimeout)
                }, 1000)
            }

            if (res === 400) {
                // ?! необходимо сделать попап для предуприждения что не удалось удалить
            }
            // console.log('result delete from cart -----', {res})

        } catch (err) {
            console.log('ERROR DELETE PRODUCT FROM LIST CART', err)
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

    store.on('selectAllItemsInCart', ({ context }, obj, { dispatch }) => {
        try {
            const { dataCart } = context.init_state;
            const { cartitem_set, enableAllSelect } = dataCart;
            let newCartItemSet = []
            let arrayForServerAllSelectItems = [];
            newCartItemSet = cartitem_set.map(el => ({ ...el, selected: !enableAllSelect }))

            arrayForServerAllSelectItems = newCartItemSet.map(el => ({
                id: el.id,
                qty: el.qty,
                selected: el.selected
            }))

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        ...context.init_state.dataCart,
                        cartitem_set: newCartItemSet,
                        enableAllSelect: !enableAllSelect,
                        agreeWitheRegulations: false
                    }
                },
            }

            dispatch('context', newContext)
            dispatch('updateInProductCard', arrayForServerAllSelectItems)
        } catch (err) {
            console.log('ERROR selectAllItemsInCart');
        }
    })

    store.on('multipleDeleteFromCart', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { dataCart } = context.init_state;
            const { cartitem_set, enableAllSelect } = dataCart;
            const params = cartitem_set.map(el => el.selected ? ({ id: el.id, is_pack: el.is_pack }) : null).filter(el => el !== null);
            if (!params.length) {//?! нужен попап что не выбран не один элемент
                console.log('нужен попап что не выбран не один элемент')
                return
            }

            const res = await apiCart.multipleDeleteFromCart({ items: params })

            const newDataCart = {
                ...dataCart,
                cartitem_set: dataCart.cartitem_set.map(el => !el.selected ? el : null).filter(el => el !== null)
            }
            let tempElement = true;
            let amountTrueItem = 0;

            const valueEnableAllSelectFromServer = newDataCart.cartitem_set.reduce((prev, cur, index, arr) => {
                const allCount = arr.length;
                if (tempElement === cur.selected) amountTrueItem++
                if (allCount === amountTrueItem) return true;
                return false
            }, 0)

            if (res >= 200 < 300) {
                const newContext = {
                    ...context,
                    "init_state": {
                        ...context.init_state,
                        dataCart: {
                            ...newDataCart,
                            enableAllSelect: valueEnableAllSelectFromServer,
                            agreeWitheRegulations: false
                        },
                        profile: {
                            ...context.init_state.profile,
                            cart: context.init_state.profile.cart - amountTrueItem
                        }
                    },
                }
                dispatch('context', newContext)
                const timerSetTimeout = setTimeout(() => {
                    dispatch('getDataCart')
                    return clearTimeout(timerSetTimeout)
                }, 1000)
            }

            if (res === 400) {
                // ?! необходимо сделать попап для предуприждения что не удалось удалить
            }

        } catch (err) {
            console.log('ERROR IN MULTY DELETE PRODUCTS', err)
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

    store.on('handleAgreeWitheRegulations', ({ context }, obj, { dispatch }) => {
        try {
            const { dataCart } = context.init_state;
            const { agreeWitheRegulations } = dataCart;

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        ...context.init_state.dataCart,
                        agreeWitheRegulations: !agreeWitheRegulations
                    }
                },
            }
            dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR handleAgreeWitheRegulations', err)
        }
    })

    store.on('addToCart', async ({ context, numberProductPastInCart, closeModalState }, obj, { dispatch }) => {
        try {
            const { profile, productDetails } = context.init_state;
            const { role } = profile;
            const { colors, sizes } = productDetails;

            if (role !== ROLE.UNREGISTRED) {
                let params = {
                    product: obj.productId,
                    color: getActiveColor(colors),
                    size: getActiveSize(sizes),
                    qty: productDetails?.in_cart_count + obj.count ?? 1,
                };

                role === ROLE.WHOLESALE ? params = Object.assign({}, params, { add_product: true }) : null;
                const res = await apiCart.addToCart(params);
                dispatch('saveNumberProductAddToCart', { productId: obj.productId })
                const newContext = {
                    ...context,
                    "init_state": {
                        ...context.init_state,
                        profile: {
                            ...context.init_state.profile,
                            cart: context.init_state.profile.cart + (obj.count ?? 1)
                        }
                    },
                }

                dispatch('context', newContext);

                if (obj.modalView) {
                    dispatch('quickViewProduct', {
                        id: params.product,
                        color: params.color,
                        size: params.size
                    })
                } else {
                    dispatch('getProductDetails', {
                        productId: obj.productId,
                        color: colors,
                        size: sizes
                    })
                }

                if (numberProductPastInCart !== obj.productId) {
                    const timerSetTimeout = setTimeout(() => {
                        dispatch('modalRedirectToCart', {
                            redirectTo: obj.redirectTo
                        })
                        return clearTimeout(timerSetTimeout)
                    }, 1500)
                }

            } else {
                //?! необходимо сделать попап для что не зарегин и переход на авторизацию
                console.log('необходимо сделать попап для что не зарегин и переход на авторизацию')
            }
        } catch (err) {
            console.log('ERROR ADD TO CART ', err)
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

