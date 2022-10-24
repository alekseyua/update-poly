import api from "../../api/api";
import { ROLE } from "../../const";
import dayjs from "../../helpers/dayjs";
import { initialFiltersOrders } from "../../helpers/initialValues/initialValues";
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
            let error = ['Ошибка на сервере, попробуйте позже!']
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
            let error = ['Ошибка на сервере, попробуйте позже!']
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

    store.on('getCountryDeliviry', async ({ context }, obj, { dispatch }) => {
        try {
            const { currency } = context.init_state;
            if (!obj?.country) return

            const paramsCountryDilivery = {
                country: obj.country,
                currency: currency
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
            console.log('ERROR GER COUNTRY', err)
        }
    })

    store.on('sendToArchive', ({ context }, obj, { dispatch }) => {
        try {
            const params = {
                order_id: obj.id,
            }
            const res = api.orderApi.sendToArchive(params);

            console.log('results sendToArchive = ', res)

        } catch (err) {
            console.log('ERROR sendToArchive dont work', err)
        }

    })

    store.on('cancelOrder', ({ context }, obj, { dispatch }) => {
        try {
            const params = {
                order_id: obj.id,
            }
            const res = api.orderApi.cancelOrder(params);

            console.log('results cancelOrder = ', res)

        } catch (err) {
            console.log('ERROR cancelOrder dont work', err)
        }

    })

    store.on('addNumOrder', ({ context }, obj, { dispatch }) => {
        try {
            const params = {
                order_id: obj.id,
            }
            const res = api.orderApi.cancelOrder(params);

            console.log('results cancelOrder = ', res)

        } catch (err) {
            console.log('ERROR cancelOrder dont work', err)
        }

    })

    store.on('getOrders', async ({ context }, obj, { dispatch }) => {
        try {
            const fakeorder = {
                count: 2,
                last: null,
                next: null,
                previous: null,
                results: [
                    {
                        address: {
                            city: "dsfdsf",
                            country: "Украина",
                            first_name: "ccxzc",
                            flat: "33",
                            house: "33",
                            id: 343,
                            last_name: "qweqw",
                            middle_name: "sadsadsa",
                            phone: "2312312321312",
                            post_code: "3123",
                            profile: 223,
                            street: "sdfdsf",
                        },
                        can_cancel: true,
                        created_at: "2022-10-06T22:13:57.975435",
                        delivery_cost: 25,
                        delivery_method: 6,
                        discount: 37.25,
                        id: 3800,
                        order_cost: 707.75,
                        order_number: "202210062213-3800",
                        payment_method: 1,
                        slug: "202210062213-3800",
                        status: {
                            status: "payment_waiting",
                            title: "Ожидается оплата"
                        },
                        status: "payment_waiting",
                        title: "Ожидается оплата",
                        total: 732.75,
                        updated_at: "2022-10-06T22:14:13.206198",
                        url: "/202210062213-3800",
                    },
                    {
                        address: {
                            city: "dsfdsf",
                            country: "Украина",
                            first_name: "ccxzc",
                            flat: "33",
                            house: "33",
                            id: 343,
                            last_name: "qweqw",
                            middle_name: "sadsadsa",
                            phone: "2312312321312",
                            post_code: "3123",
                            profile: 223,
                            street: "sdfdsf",
                        },
                        can_cancel: true,
                        created_at: "2022-10-05T20:40:28.487915",
                        delivery_cost: 25,
                        delivery_method: 6,
                        discount: 0,
                        id: 3779,
                        order_cost: 145,
                        order_number: "202210052040-3779",
                        payment_method: 1,
                        slug: "202210052040-3779",
                        status: {
                            status: "payment_waiting",
                            title: "Ожидается оплата"
                        },
                        status: "payment_waiting",
                        title: "Ожидается оплата",
                        total: 170,
                        updated_at: "2022-10-06T18:12:04.569287",
                        url: "/202210052040-3779",
                    }
                ]
            }
            debugger
            let params = {
                ...initialFiltersOrders,
            }
            obj?.created_at__gte ? params = { ...params, created_at__gte: dayjs(api.language, obj?.created_at__gte).format() }
                : obj?.created_at__lte ? params = { ...params, created_at__lte: dayjs(api.language, obj?.created_at__lte).format() }
                    : obj?.status ? params = { ...params, status: obj?.status }
                        : null

            const res = await orderApi.getOrders(params);
            const tableBodyData = res.results;

            //const tableBodyData = fakeorder.results;

            const dataCreate = tableBodyData.map(el => el.created_at).sort((a, b) => a > b ? 1 : -1);
            const thisDate = new Date();

            let data = {
                created_at__lte: new Date(dataCreate[0]) ?? String(thisDate.getDate() + '.' + thisDate.getMonth() + '.' + thisDate.getFullYear()),
                created_at__gte: new Date(dataCreate[dataCreate.length - 1]) ?? String(thisDate.getDate() + '.' + thisDate.getMonth() + '.' + thisDate.getFullYear()),
            };

            

            console.log('results getOrders= ',
                { params },
                { obj },
                {data},
            );




            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        orders: fakeorder, //res,
                        tableBodyData: tableBodyData.length ? tableBodyData : [],
                        dateFilterData: data
                    }
                }
            }

            dispatch('context', newContext);

        } catch (err) {
            console.log('ERROR GET COUNTRY', err)
        }
    })

    store.on('changeAgreement-products', async ({ context }, obj, { dispatch }) => {
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