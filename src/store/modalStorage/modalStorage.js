import { initCloseModalState, initModalState } from '../../helpers/initialValues/initialValues';

/**
 * @param = {
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
                className: obj.className,
                onClick: obj.onClick,
                onClickCancel: obj.onClickCancel,
                content: obj.content,
                title: obj.title,
                iconImage: obj.iconImage,
            }
        }
    })

}