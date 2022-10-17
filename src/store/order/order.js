import api from "../../api/api";
import { ROLE } from "../../const";
import dayjs from "../../helpers/dayjs";
import { initialFiltersOrders } from "../../helpers/initialValues/initialValues";


export const order = store => {

    const orderApi = api.orderApi;
    const apiCart = api.cartApi

    store.on('getAdresses', async ({ context }, obj, { dispatch }) => {
        try {

            const params = {
                page: obj.page
            }

            const res = await orderApi.getOrderAddressDeliviry(params);

            console.log('results get address for dilivery = ',
                { res }
            )

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        addressDilivery: res
                    }
                }
            }

            dispatch('context', newContext);

            const timerTimeout = setTimeout(() => {
                const paramsGetCountryDelivery = {
                    country: obj.country
                }
                dispatch('getCountryDeliviry', paramsGetCountryDelivery);
                return () => clearTimeout(timerTimeout);
            }, 400)

        } catch (err) {
            console.log('ERROR GET DATA FROM REQUEST ORDER ADDRESS = ', res);
        }
    })

    store.on('searchAddressDilivery', ({ context }, obj, { dispatch }) => {
        try {
            const paramsSearch = {
                q: obj.q
            }

            const res = orderApi.getOrderAddressSearch(paramsSearch)

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        addressDilivery: res
                    }
                }
            }

            dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR SEARCH ADDRESS DILIVERY = ', res);
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

    store.on('payment', async ({ context, numberCurrentOrderForAddProduct }, obj, { dispatch }) => {

        try {
            const { role, balance, user } = context.init_state.profile
            const { first_name, last_name, middle_name } = user;
            const { currency } = context.init_state;
            const { priceDilivery } = context.init_state.order
            const { price, discount, total_price } = context.init_state.cart_content
            let params = {
                payment_method: obj.payment_methods,
                delivery_method: obj.variant,
                delivery_address: obj.selectedAdress,
                agree_personal_data: obj.agree_personal_data,
                wait_call: obj.waitForCall,
                currency: currency,
                order_cost: price,
                discount: discount,
                total_cost: price,
                add_goods_order_id: +numberCurrentOrderForAddProduct ?? 0, // localStore берём номер заказа куда добавить товар по старому отправляем 0 если нет добавления
            };


           
            // passport_number: values.serias_and_number_passport,
            // passport_issued: values.issued_passport,
            // passport_issue_date: date && date !== 'Invalid Date' ? date : null,            
            // comment_passport: values.comment,
            // comment_order: values.comment_order,



            role === ROLE.RETAIL?
                params = {
                    ...params,
                    delivery_cost: priceDilivery.price,
                }
                : null
            const res = await orderApi.createOrder(params);
            console.log({res})
            //?! если добовляем в заказ переходим на страницу orders
                if(numberCurrentOrderForAddProduct){

                    dispatch('setNumberOrderForAddProducts', {numberOrder: null} );    

                    return obj?.redirectTo? obj.redirectTo('/orders') : console.log('Samething went wrong!!!')
                }

            //?! если баланс меньше суммы заказа показать попап для оплаты суммы и прикладывания чека об оплаты
                if ( balance < total_price ){
                    // let res = {id:null}
                    const order_id = res.id;
                    const params = {
                        order_id: order_id, 
                        balance: balance,
                        total_price: total_price,
                        first_name,
                        last_name,
                        middle_name,
                        redirectTo: obj.redirectTo
                    }
                    return dispatch('modalCheckPayment', params)
                }
            //?! если больше переходим на страницу orders
                console.log('test after return in if', balance > total_price)
                obj?.redirectTo? obj.redirectTo('/orders') : console.log('Samething went wrong!!!')


        } catch (err) {
            console.log('ERROR CREATE PAYMENT METHOD', err)
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
            let params = {
                ...initialFiltersOrders,    
            }
            obj?.created_at__gte? params = { ...params, created_at__gte: dayjs(api.language, obj?.created_at__gte).format() }
                : obj?.created_at__lte? params = { ...params, created_at__lte: dayjs(api.language, obj?.created_at__lte).format() }
                    : obj?.status? params = { ...params, status: obj?.status }
                        : null

            //const res = await orderApi.getOrders(params);

            // const tableBodyData = res.results;
            const tableBodyData = fakeorder.results;
            
            const dataCreate = fakeorder.results.map(el => el.created_at).sort((a, b) => a > b ? 1 : -1);
            
            const data = {
              created_at__lte: new Date(dataCreate[0]) ?? new Date(String(thisDate.setFullYear(thisDate.getFullYear()))),
              created_at__gte: new Date(dataCreate[dataCreate.length - 1]) ?? new Date(),
            };
            
            console.log('results getOrders= ', 
                {params},
                {obj},
            );
            
            
            

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    order: {
                        ...context.init_state.order,
                        orders: fakeorder, //res,
                        tableBodyData: tableBodyData.length? tableBodyData : [],
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
        try{

            const params = {
                id: obj.productId,
            change_agreement: !+obj.changeAgreement,
            qty: +obj.qty,
        }
        const res = await apiCart.updateCartData([params]);
        console.log({res})
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
        }catch(err){
            console.log('ERROR GET DATA CHANGE AGREEMENT', err)
        }
    })
}