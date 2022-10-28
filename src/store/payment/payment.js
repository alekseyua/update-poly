import api from "../../api/api";
import { ROLE } from "../../const";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

export const payment = store => {
    const orderApi = api.orderApi;

    store.on('payment', async ({ context, numberCurrentOrderForAddProduct, closeModalState }, obj, { dispatch }) => {

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
                currency: currency?.toLocaleUpperCase(),
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



            role === ROLE.RETAIL && !!!numberCurrentOrderForAddProduct?
                params = {
                    ...params,
                    delivery_cost: priceDilivery.price,
                }
                : null
            const res = await orderApi.createOrder(params);
            
            let newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataCart: {
                        "cartitem_set": [],
                        "in_stock": [],
                        "valueButtonNextToOrder": Text({text: "go.to.registration"}),
                        "id": 228,
                        "in_cart": null,
                        "total_price": null,
                        "total_discount": null,
                        "delivery_price": null,
                        "total_order_price": null,
                        "is_performed": false,
                        "enableAllSelect": false,
                        "agreeWitheRegulations": false
                    }
                },
            }
            dispatch('context', newContext)
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