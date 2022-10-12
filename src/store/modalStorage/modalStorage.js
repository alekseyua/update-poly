import { initCloseModalState, initModalState } from '../../helpers/initialValues/initialValues';
import { feedback } from './modalWindow/modalWindow';

/**
 * @param {
 *  show: boolean 
 * 
 * } param
*/

export const modalStorage = store => {

    store.on('@init', ()=>({ modalState: initModalState }));
    store.on('@init', ()=>({ closeModalState : ()=>{
        store.dispatch('setModalState', initCloseModalState)
    }}))
    store.on('setModalState', ({ modalState }, obj)=>{
        return{
            modalState : {
                show: obj.show,
                action: obj.action,
                addClass: obj.addClass,
                onClick: obj.onClick,
                closeModal: obj.closeModal,
                onClickCancel: obj.onClickCancel,
                content: obj.content,
                title: obj.title,
                iconImage: obj.iconImage,
            }
        }
    })
    /** ************************************************************************************************** */

    store.on('feedback', async ({ context }, obj, { dispatch }) => {
        try{
            dispatch('setModalState',{
                show: true,
            })
                const newContext = {
                    ...context,
                    "init_state": {
                        ...context.init_state,                
                        activeButton: {
                            feedbackBtn: false
                        }
                    }
                }
                const timerSetTimeout = setTimeout(()=>{
                    const newContext = {
                        ...context,
                        "init_state": {
                            ...context.init_state,                
                            activeButton: {
                                feedbackBtn: true
                            }
                        }
                    }
                    dispatch('context', newContext)
                    return ()=>clearTimeout(timerSetTimeout)
                },10000)
                dispatch('context', newContext)

            const onSubmit = (data) =>{
                console.log({data})
            }
            
            dispatch('setModalState',{
                show: true,
                title: 'Форма обратной связи',
                content: await feedback(onSubmit, dispatch)
            })
        
        }catch(err){
            console.log('ERROR feedback', err)
        }
    })



}

