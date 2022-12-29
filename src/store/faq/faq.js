import api from "../../api/api";
import Text from "../../helpers/Text";
import { errorAlertIcon, successAlertIcon } from "../../images";
import { textErrorMessage, textSuccessMessage } from "../modalStorage/modalWindow/modalWindow";



export const faq = store => {
    const apiContent = api.contentApi;

    store.on('getFaq', async ({ context, closeModalState }, obj, { dispatch }) => {
        const getAnswers = await apiContent.getAnswers();
        const getCategoryAnswer = await apiContent.getCategoryAnswer();

        const newContext = {
            ...context,
            init_state: {
                ...context.init_state,
                faq: {
                    answerCategorys: await getCategoryAnswer,
                    answers: await getAnswers.results
                }
            }
        };
        return dispatch('context', newContext)
    });

    store.on('sendMessageAdministrator', async ({ context, closeModalState }, obj, { dispatch }) => {

        try {
            
            const { setFieldValue } = obj.func;
            setFieldValue('spinnerBtn', true)
            const params = {
                category: obj.category,
                email: obj.email,
                name: obj.name,
                question: obj.question
            }
            const res = await apiContent.postAnswer(params);
            setFieldValue('spinnerBtn', false)
            setFieldValue('name', '')
            setFieldValue('email', '')
            setFieldValue('category', null)
            setFieldValue('question', '')
            obj.toggleOpenChats();
            const text = 'Ваше обращение зарегистрировано и передано ответственному сотруднику. Благодарим Вас за сотрудничество!';
            dispatch('setModalState', {
                show: true,
                content: textSuccessMessage(text),
                iconImage: successAlertIcon,
                action: {
                    title: ['продолжить', null]
                },
                onClick: () => closeModalState()
            })

        } catch (err) {
            console.log('ERROR GET COUNTRY', err);
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
            }
            obj.toggleOpenChats();
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