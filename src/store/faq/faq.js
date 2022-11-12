import api from "../../api/api";



export const  faq = store => {
    const apiContent = api.contentApi;

    store.on('getFaq', async ({context}, obj, { dispatch }) => {

        let getAnswers = context.init_state.faq?.answerCategorys;
        let getCategoryAnswer = context.init_state.faq?.answers;
        if ( !getAnswers?.length || !getCategoryAnswer?.length ){  
            getAnswers = await apiContent.getAnswers();
            getCategoryAnswer = await apiContent.getCategoryAnswer();
        }

        const newContext = {
            ...context,
            init_state: {
                ...context.init_state,
                faq: {
                    answerCategorys: getCategoryAnswer,
                    answers: getAnswers.results
                }
            }
        };
        return  dispatch('context', newContext)
    })
}