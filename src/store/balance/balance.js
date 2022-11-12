import api from '../../api/api';
import Text from '../../helpers/Text';
import { errorAlertIcon } from '../../images';
import { textErrorMessage } from '../modalStorage/modalWindow/modalWindow';


export const balance = store => {
    const apiOrder = api.orderApi;

    store.on('getBalace', async ({ context, closeModalState }, obj, { dispatch }) => {
        try{

            const { currency } = context.init_state;
            
            const res = await api.getUserBalance({"currency": currency})
            
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    profile:{
                        ...context.init_state.profile,
                        balance: res.balance,
                        opt_minimum_price: res.opt_minimum_price,
                        passive_balance: res.passive_balance
                    }
                }
            }
            dispatch('context', newContext);
        } catch (err) {
            console.log('ERROR GET BALANCE', err);
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

    store.on('getPayments', async ({ context, closeModalState }, obj, { dispatch }) => {
        try{
            const params = {
                page: obj?.page ?? 1,
                page_size: 10
            }

            const res = await apiOrder.getPaymentsProfile(params)
            
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    historyPayment: res
                }
            }

            dispatch('context', newContext);
        } catch (err) {
            console.log('ERROR GET PAYMENTS', err)
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
    

    store.on('', ({ context, closeModalState }, obj, { dispatch }) => {

        try{
            dispatch('setModalState',{
                show: true,
                content: 'text'
            })

        } catch (err) {
            console.log('ERROR ', err)
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
    });
    
}