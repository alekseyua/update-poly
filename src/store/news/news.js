import api from "../../api/api";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";


export const news = store => {

    const apiContent = api.contentApi;

    store.on('@init', ()=> ({ newsStore: [] }))
    
    store.on('setValueNews', ({newsStore}, obj, { dispatch }) => {
        return { newsStore: obj }
    })

    store.on('getNews', async ({ context, newsStore }, obj, { dispatch }) => {
        try{
            let params = {}
            obj?.id ? params = {
                page: 1,
                page_size: 20,
                rubrics: obj.id
            } : null
            const dataNews = await apiContent.getNews(params);
            const contextNews =  {
                ...context,
                'init_state': {
                    ...context.init_state,
                    news: dataNews.results,
                }
            }
            dispatch('context', contextNews)
            dispatch('setValueNews', dataNews.results); //?!! не знаю нужно оно 
        } catch (err) {
            console.log('ERROR storege = ', err)
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

    store.on('getNewsDetails', async ({ context }, {id, ...obj}, { dispatch }) => {
        const params = {}
        const dataDetalsNews = await apiContent.getNewsDetails( id, params);
        const contextNews =  {
                ...context,
                'init_state': {
                    ...context.init_state,
                    newsDetails: dataDetalsNews,
                }
            }
            dispatch('context', contextNews)
        return
    })
}