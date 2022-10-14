import api from '../../api/api';
import { initCloseModalState, initModalState } from '../../helpers/initialValues/initialValues';
import { addToCart, feedback } from './modalWindow/modalWindow';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { getActiveColor, getActiveSize, getCookie } from '../../helpers/helpers';

const contentApi = api.contentApi;

/**
 * @param {
 *  show: boolean 
 * dispatch('setModalState',{
 * show: false,
 * addClass: null,
 * iconImage: errorAlertIcon,
 * title: 'testing popup',
 * content: (
 *  <div>
 *    <i>{ Text({ text : 'error_server' }) }</i>
 *    <p>{ Text({ text : 'call_admin' }) }</p>
 *  </div>
 * ),
 * action : { title : ['next step', null]},
 * onClick : ()=>dispatch('setModalState',{
 *            show: true,
 *            content: 'hhhhhhhhh'
 *          })
 * //})
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
                const fd = new FormData();
                fd.set('problem_area', data.problem_area);
                fd.set('name', data.name);
                fd.set('email', data.email);
                fd.set('message', data.message);
                fd.set('files', data.files);
                const res = contentApi.postFeedback(fd)
            }
            
            dispatch('setModalState',{
                show: true,
                title: 'Форма обратной связи',
                content: await feedback(onSubmit, dispatch),
                addClass: 'modal-feedback'
            })
        
        }catch(err){
            console.log('ERROR feedback', err)
        }
    })

    store.on('pdf-viewer', ({ context }, obj, { dispatch }) => {
        const file = obj.link;
        const title = obj.title;
        const renderPage = (props) => {
            return (
                <>
                    {props.canvasLayer.children}
                    <div style={{ userSelect: 'none' }}>{props.textLayer.children}</div>
                    {props.annotationLayer.children}
                </>
            );
        }; 
    
        dispatch('setModalState', {
          show: true,
          title: title,
          addClass: 'modal-file-views',
          content: (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                        <div id="pdfviewer" style={{overflow:'auto'}}>
                          <Viewer 
                            fileUrl={`${file}`}
                            defaultScale = {'PageWidth'}
                            renderPage={renderPage}
                            theme={{
                              theme: 'dark',
                            }}
                            httpHeaders={{
                              Authorization: `Token ${getCookie('ft_token')}`,
                            }}
                            withCredentials={true}
                          />
                        </div>
                    </Worker>
    

            )
        })
    })

    store.on('modalRedirectToCart', async ({ context, closeModalState }, obj, { dispatch }) =>{
        const { currency } = context.init_state;
        const { minimum_rc, product_sku, product_rc, media, title, sizes, colors } = context.init_state.productDetails;
        const { role } = context.init_state.profile;
        const size = sizes.filter( el => el.id === getActiveSize(sizes))[0].title;
        const color = colors.filter( el => el.id === getActiveColor(colors))[0].title;
        const { price, old_price } = context.init_state.productDetails.prices;
        const product_rcAmount = minimum_rc * price;
        const colorActive = getActiveColor(colors);
        const productSkuImage = product_sku.filter( el => el.color === colorActive )[0].image
        const image = productSkuImage? productSkuImage : media[0].image;

        dispatch('setModalState', {
            show: true,
            title: title,
            content: await addToCart( product_rcAmount, product_rc, old_price, currency, color, price, image, title, size, role ),           
            action: {
                title: ['продолжить покупки', 'перейти в карзину']
            },
            onClick: () => closeModalState(),
            onClickCancel: () => console.log('cancel popupe')
        })
    })

}

