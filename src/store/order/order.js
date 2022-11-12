import api from "../../api/api";
import dayjs from "../../helpers/dayjs";
import { initialFiltersOrders } from "../../helpers/initialValues/initialValues";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";


export const order = store => {

    const orderApi = api.orderApi;
    const apiCart = api.cartApi

    store.on('removeItemFromOrder', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            dispatch('setModalState', {
                show: true,
            })
            const idOrder = context.init_state.order.id;
            const params = {
                order_id: idOrder,
                id: obj.id_goods,
            }

            const res = await orderApi.cancelOrderItem(params)


            const ordersList = context.init_state.order.dataOrderItems;
            const newOrderList = ordersList.map(el => el.id === obj.id_goods ? { ...el, status: { id: 'canceled', title: 'отменён' } } : el);

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        dataOrderItems: newOrderList
                    }
                }
            }

            dispatch('context', newContext)
            if (res.status === "True") {
                dispatch('setModalState', {
                    show: false,
                })
                dispatch('getDataOrder')
            }
        } catch (err) {
            console.log('ERROR removeItemFromOrder = ', err);
            let error = [Text({text: 'error-on-server'})];
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

    store.on('getDataOrder', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {

            const idOrder = context.init_state.page_info.slug;
            const params = {
                url: `/orders/${idOrder}`
            }
            const getDataOrder = await api.getPage(params)

            if (getDataOrder.status === 500) {
                let error = ['Ошибка на сервере, проблемы с заказом попробуйте позже!']
                if (getDataOrder?.data) {
                    const errors = getDataOrder.data;
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

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        ...getDataOrder.init_state.order
                    },
                    profile: {
                        ...context.init_state.profile,
                        balance: getDataOrder.init_state.profile.balance
                    }
                }
            }

            dispatch('context', newContext);

        } catch (err) {
            console.log('ERROR getDataOrder = ', err);
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

    store.on('getCountryDeliviry', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { currency } = context.init_state;
            if (!obj?.country) return

            const paramsCountryDilivery = {
                country: obj.country,
                currency: currency?.toLocaleUpperCase()
            }
            const res = await orderApi.getCountryDeliviry(paramsCountryDilivery);

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        priceDilivery: res
                    }
                }
            }
            dispatch('context', newContext);

        } catch (err) {
            console.log('ERROR GET COUNTRY', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('sendToArchive', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const params = {
                order_id: obj.id,
            }
            const res = api.orderApi.sendToArchive(params);

            console.log('results sendToArchive = ', res)

        } catch (err) {
            console.log('ERROR sendToArchive dont work', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('cancelOrder', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const params = {
                order_id: obj.id,
            }
            const res = await api.orderApi.cancelOrder(params);

            console.log('results cancelOrder = ', {res} )

            const newContext = {
                ...context, 
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        tableBodyData: context.init_state.order.tableBodyData.filter( el => el.id !== obj.id )                        
                    },
                    numberCurrentOrderForAddProduct: null,
                },
            }
            
            dispatch('context', newContext)



        } catch (err) {
            console.log('ERROR cancelOrder = ', err);
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('addNumOrder', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const params = {
                order_id: obj.id,
            }
            const res = api.orderApi.cancelOrder(params);

        } catch (err) {
            console.log('ERROR addNumOrder dont work', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('getOrders', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const contextDate__gte = context.init_state.order?.dateFilterData?.created_at__gte;
            const contextDate__lte = context.init_state.order?.dateFilterData?.created_at__lte;
            let params = {
                ...initialFiltersOrders,
                created_at__lte: dayjs(api.language, contextDate__lte ?? new Date()).format(),                
            }

            contextDate__gte? params = { ...params, created_at__gte: dayjs(api.language, contextDate__gte).format() } : null;


            obj?.created_at__gte ? params = { ...params, created_at__gte: dayjs(api.language, obj?.created_at__gte).format() }
                : obj?.created_at__lte ? params = { ...params, created_at__lte: dayjs(api.language, obj?.created_at__lte).format() }
                    : obj?.status ? params = { ...params, status: obj?.status }
                        : obj?.q ? params = { ...params, q: obj?.q }
                        : null

            const res = await orderApi.getOrders(params);
            const tableBodyData = res.results;
            //const tableBodyData = fakeorder.results;
            let dataCreate = [];
            !!tableBodyData.length ?
                dataCreate = tableBodyData.map(el => el.created_at).sort((a, b) => a > b ? 1 : -1)
                : null;
            
            let data = {
                created_at__gte: obj?.created_at__gte ? obj?.created_at__gte : contextDate__gte? contextDate__gte : new Date(dataCreate[0]) ?? new Date(),
                created_at__lte: obj?.created_at__lte ? obj?.created_at__lte : contextDate__lte? contextDate__lte : new Date(dataCreate[dataCreate.length - 1]) ?? new Date(),
            };

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        orders: res,
                        tableBodyData: tableBodyData.length ? tableBodyData : [],
                        dateFilterData: data,
                        searchOrderForFio: obj?.q? obj.q : '',
                    }
                }
            }
            dispatch('context', newContext);

        } catch (err) {
            console.log('ERROR GET COUNTRY', err);
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

    store.on('changeAgreement-products', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const params = {
                id: obj.productId,
                change_agreement: !+obj.changeAgreement,
                qty: +obj.qty,
            }
            const res = await apiCart.updateCartData([params]);
            console.log({ res })
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        ...context.init_state.dataCart,
                        cartitem_set: res.cartitem_set,
                        in_stock: res.in_stock

                    }
                },
            }
            dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR GET DATA CHANGE AGREEMENT', err)
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

    store.on('getSpecification', async ({ context, closeModalState }, obj, { dispatch }) => {
        dispatch('setModalState', {
            show: true,
        })
        const numberOrder = context.init_state.order.fullNumberOrder;

        const params = {
            "order_id": numberOrder.split('-').pop()
        }

        const specific = await orderApi.postOrderSpecification(params)

        dispatch('setModalState', {
            show: false,
        })
        dispatch('pdf-viewer', {
            link: specific.specification,
            title: 'Спецификация',
            addClass: 'modal-specification',
            addId: 'pdfviewer-specif'
        })
    })


}