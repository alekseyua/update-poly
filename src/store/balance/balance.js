import api from '../../api/api';


export const balance = store => {
    const apiOrder = api.orderApi;

    store.on('getBalace', async ({ context }, obj, { dispatch }) => {
        try{

            const { currency } = context.init_state;
            
            const res = await api.getUserBalance({"currency": currency})
            
            // console.log('BALANCE = ',
            // { context },
            // { currency },
            // { res },
            // )
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
        }catch(err){
            console.log('ERROR GET BALANCE', err)
        }
    })

    store.on('getPayments', async ({ context }, obj, { dispatch }) => {
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
        }catch(err){
            console.log('ERROR GET PAYMENTS', err)
        }
    })
    

    store.on('', ({ context }, obj, { dispatch }) => {

        try{
            dispatch('setModalState',{
                show: true,
                content: 'text'
            })

        }catch(err){
            console.log('ERROR TOP UP BALANCE', err)
        }
    });
    
}