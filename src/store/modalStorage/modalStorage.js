import api from '../../api/api';
import { initCloseModalState, initModalState } from '../../helpers/initialValues/initialValues';
import { addAddressForPost, addToCart, changePhone, feedback, listCurrentOrders, payment, textErrorMessage, textSuccessMessage, changePhoneFunc, accountDelete, contentMessage, getMyCash, contentInfoOrder, contentInfoCollection, openPhotoForSiew, openVideoForSiew, openTableSize, openVidjetChat } from './modalWindow/modalWindow';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { getActiveColor, getActiveSize, getCookie } from '../../helpers/helpers';
import { errorAlertIcon, successAlertIcon } from '../../images';
import Text from '../../helpers/Text';
import SubTitle from '../../Views/InformationViews/HowTo/SubTitle';
import VidjetChatViews from '../../Views/VidjetChat/VidjetChatViews';
import { ROLE } from '../../const';


const contentApi = api.contentApi;
const apiUser = api.userApi;
const orderApi = api.orderApi;

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
 * closeModal: closeModal() || () => {}
 * onClickCancel : () => {}
 * //})
 * } param
*/

export const modalStorage = store => {

    store.on('@init', () => ({ modalState: initModalState }));
    store.on('@init', () => ({
        closeModalState: () => {
            store.dispatch('setModalState', initCloseModalState)
        }
    }))
    store.on('setModalState', ({ modalState }, obj) => {
        return {
            modalState: {
                show: obj.show,
                action: obj.action,
                addClass: obj.addClass,
                onClick: obj.onClick,
                closeModal: obj.closeModal,
                onClickCancel: obj.onClickCancel,
                content: obj.content,
                title: obj.title,
                iconImage: obj.iconImage,
                style: obj.style
            }
        }
    })
    /** ************************************************************************************************** */

    store.on('feedback', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const first_name = context.init_state.profile.user?.first_name;
            const last_name = context.init_state.profile.user?.last_name;
            const middle_name = context.init_state.profile.user?.middle_name;
            const email = context.init_state.profile.user?.email;
            let fullName = '';
             fullName = (first_name || last_name || middle_name) ? `${last_name} ${middle_name}` 
             : (last_name || middle_name) ? `${last_name} ${middle_name}` 
             : (first_name || middle_name) ? `${first_name} ${middle_name}` : 
             (first_name || last_name) ? `${first_name} ${last_name}` 
             : '';

            dispatch('setModalState', {
                show: true,
            })
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    activeButton: {
                        ...context.init_state.activeButton,
                        feedbackBtn: false
                    }
                }
            }
            const timerSetTimeout = setTimeout(() => {
                const newContext = {
                    ...context,
                    "init_state": {
                        ...context.init_state,
                        activeButton: {
                            ...context.init_state.activeButton,
                            feedbackBtn: true
                        }
                    }
                }
                dispatch('context', newContext)
                return () => clearTimeout(timerSetTimeout)
            }, 10000)

            dispatch('context', newContext)

            const onSubmit = async (data) => {
                try {
                    const fd = new FormData();
                    fd.set('problem_area', data.problem_area);
                    fd.set('name', data.name);
                    fd.set('email', data.email);
                    fd.set('message', data.message);
                    fd.set('files', data.files);

                    const res = await contentApi.postFeedback(fd)
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
                    console.log('ERROR feedback request', { err })
                    let error = [Text({ text: 'error-on-server' })];
                    if (err?.data) {
                        const errors = err.data;
                        for (let key in errors) {
                            if (data.hasOwnProperty(key)) {
                                error.push(`${errors[key]}`)
                            }
                        }
                    }
                    dispatch('setModalState', {
                        show: true,
                        content: textErrorMessage(error),
                        iconImage: errorAlertIcon,
                        action: {
                            title: ['продолжить', null]
                        },
                        onClick: () => closeModalState()
                    })
                }
            }

            dispatch('setModalState', {
                show: true,
                title: 'Форма обратной связи',
                content: await feedback(onSubmit, dispatch, fullName, email, closeModalState),
                addClass: 'modal-feedback'
            })

        } catch (err) {
            console.log('ERROR feedback', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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

    store.on('pdf-viewer', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            dispatch('setModalState', {
                show: true,
            })
            const addClass = obj?.addClass;
            const addId = obj?.addId;
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
                addClass: addClass ? addClass : 'modal-file-views',
                content: (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                        <div id={addId ? addId : "pdfviewer"} style={{ overflow: 'auto' }}>
                            <Viewer
                                fileUrl={`${file}`}
                                defaultScale={'PageWidth'}
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
        } catch (err) {
            console.log('ERROR feedback', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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

    store.on('modalRedirectToCart', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { currency } = context.init_state;
            const { minimum_rc, product_sku, product_rc, media, title, sizes, colors } = context.init_state.productDetails;
            const { role } = context.init_state.profile;
            const size = sizes.filter(el => el.id === getActiveSize(sizes))[0].title;
            const color = colors.filter(el => el.id === getActiveColor(colors))[0].title;
            const { price, old_price } = context.init_state.productDetails.prices;
            const product_rcAmount = minimum_rc * price;
            const colorActive = getActiveColor(colors);
            const productSkuImage = product_sku.filter(el => el.color === colorActive)[0].image
            const image = productSkuImage ? productSkuImage : media[0].image;
            const is_collection = false
            
            dispatch('setModalState', {
                show: true,
                title: title,
                addClass: 'modal-add-to-cart',
                content: addToCart(product_rcAmount, is_collection, product_rc, old_price, currency, color, price, image, title, size, role),
                action: {
                    title: ['продолжить покупки', 'перейти в карзину']
                },
                onClick: () => closeModalState(),
                onClickCancel: () => {
                    obj.redirectTo('cart')
                    closeModalState()
                }
            })
        } catch (err) {
            console.log('ERROR feedback', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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

    store.on('modalOpenListForAddProduct', async ({ context, closeModalState, numberCurrentOrderForAddProduct }, obj, { dispatch }) => {
        try {
            const { currency } = context.init_state;
            const listOrders = context.init_state.listCurrentOrder.results;

            const changeStatusOrder = (value) => {
                dispatch('setNumberOrderForAddProducts', { numberOrder: value })
                closeModalState()
            };

            const cancelOrders = () => {
                dispatch('setNumberOrderForAddProducts', { numberOrder: null })
                closeModalState()
            }


            dispatch('setModalState', {
                show: true,
                title: 'Добавить товары к существующему заказу',
                content: listCurrentOrders(listOrders, changeStatusOrder, currency),
                action: {
                    title: ['Отменить', null]
                },
                onClick: cancelOrders,
                addClass: 'modal-choose-number-order',
            })

        } catch (err) {
            console.log('ERROR GET LIST ORDERS', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    //?! модалка оплаты
    store.on('modalCheckPayment', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            dispatch('setModalState', {
                show: true,
            })
            const { first_name, last_name, middle_name } = context.init_state.profile.user;
            const { currency } = context.init_state;
            const { balance } = context.init_state.profile;

            const order_id = obj?.order_id;
            const total_price = obj?.total_price;

            const redirectTo = obj?.redirectTo;

            const closeRedirect = () => {
                redirectTo?
                    redirectTo('/balance')
                    : null
                console.log('close and redirect');
                closeModalState();
            }

            dispatch('setModalState', {
                show: true,
                title: 'Пополнение баланса для оплаты',
                content: await payment(order_id, balance, total_price, currency, first_name, last_name, middle_name, dispatch, redirectTo, closeModalState),
                addClass: 'modal-payment',
                closeModal: closeRedirect
            })
        } catch (err) {
            console.log('ERROR GET LIST ORDERS', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    //?! модалка добавления адреса
    store.on('modalAddAddress', async ({ context, closeModalState }, obj, { dispatch }) => {
        /**
         * @typeModal - 'create' or 'change'
         */
        try {
            dispatch('setModalState', {
                title: 'Адрес доставки',
                show: true,
            })
            const typeModal = obj?.typeModal;
            const profileId = context.init_state.profile?.id;
            const { first_name, last_name, middle_name, email, phone } = context.init_state.profile.user;

            const { currency } = context.init_state;

            dispatch('setModalState', {
                show: true,
                title: 'Адрес доставки',
                content: await addAddressForPost(currency, first_name, last_name, middle_name, phone, email, dispatch, closeModalState, typeModal, profileId, context),
                addClass: 'modal-add-address'
            })
        } catch (err) {
            console.log('ERROR popup add address', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    //?! модалка изменения адреса
    store.on('modalChangeAddress', async ({ context, closeModalState }, obj, { dispatch }) => {
        /**
         * @typeModal - 'create' or 'change'
         */
        try {
            dispatch('setModalState', {
                title: 'Адрес доставки',
                show: true,
            })
            const typeModal = 'change';
            const profileId = context.init_state.profile?.id;
            const { first_name, last_name, middle_name, email, phone } = context.init_state.profile.user;
            const { idAddress } = obj;
            const { currency } = context.init_state;

            dispatch('setModalState', {
                show: true,
                title: 'Адрес доставки',
                content: await addAddressForPost(currency, first_name, last_name, middle_name, phone, email, dispatch, closeModalState, typeModal, profileId, context, idAddress),
                addClass: 'modal-add-address'
            })
        } catch (err) {
            console.log('ERROR popup add address', err)
            let error = [Text({ text: 'error-on-server' })];
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
    //?! модалка изменения телефона
    store.on('modalChangePhone', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { id } = context.init_state.profile.user;
            const userId = id;
            const changePhoneNewPhone = async (data) => {
                const res = await apiUser.updatePhone(data.userId, {
                    phone: data.phone,
                })
                closeModalState()
            }

            dispatch('setModalState', {
                show: true,
                title: 'Смена номера телефона',
                // content: await changePhoneFunc(changePhoneNewPhone, userId),
                content: 'Данный ресурс находиться в разработке, для изменения номера воспользуйтесь "Формой обратной связи"',
                action: {
                    title: ['Обратная связь', 'Отмена']
                },
                addClass: 'modal-change-phone',
                onClick: () => dispatch('feedback'),
                onClickCancel: closeModalState
            })
        } catch (err) {
            console.log('ERROR popup add address', err)
            let error = [Text({ text: 'error-on-server' })];
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
    //?! модалка удаление учётных данных
    store.on('modalDeleteAccaunt', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { id } = context.init_state.profile.user;
            const userId = id;
            const deleteAccountFunc = async (data) => {
                try {
                    const params = {
                        comment: data.reasonDeletion
                    }
                    const res = await apiUser.deleteUser(data.userId, params)
                    if (res.status === 200) {
                        obj.redirectTo('/registration');
                    } else {
                        let error = [Text({ text: 'error-on-server' })];
                        dispatch('setModalState', {
                            show: true,
                            content: textErrorMessage(error),
                            iconImage: errorAlertIcon,
                            action: {
                                title: ['продолжить', null]
                            },
                            onClick: () => closeModalState()
                        })
                    }
                } catch (err) {
                    console.log('ERROR function DeleteAccaunt', err)
                    let error = [Text({ text: 'error-on-server' })];
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
            }
            dispatch('setModalState', {
                show: true,
                title: 'Удаление аккаунта',
                content: await accountDelete(deleteAccountFunc, closeModalState, userId),
                addClass: 'modal-change-phone',
            })

        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
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
    //?! модалка изменения пароля
    store.on('modalChangePassword', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { id } = context.init_state.profile.user;
            const userId = id;
            const changePasswordNewPassword = async (data) => {

                closeModalState()
            }

            dispatch('setModalState', {
                show: true,
                title: 'Смена номера телефона',
                // content: await changePhoneFunc(changePhoneNewPhone, userId),
                content: 'Данный ресурс находиться в разработке, для изменения пароля воспользуйтесь "Формой обратной связи"',
                action: {
                    title: ['Обратная связь', 'Отмена']
                },
                addClass: 'modal-change-phone',
                onClick: () => dispatch('feedback'),
                onClickCancel: closeModalState
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
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
    //?! модалка вы уверены удаление учётных данных
    store.on('modalQuestionAreYouSure', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { e, values, setValues } = obj;
            const handeChange = () => {
                setValues({
                    ...values,
                    'receive_newsletter': !e.checked
                });
                closeModalState();
            }
            if (!values.receive_newsletter) return handeChange();

            dispatch('setModalState', {
                show: true,
                content: contentMessage(),
                action: {
                    title: ['Я ПОНИМАЮ', 'Отмена']
                },
                addClass: 'modal-change-phone',
                onClick: () => handeChange(),
                onClickCancel: closeModalState
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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

    store.on('modalGetMyCach', async ({ context, closeModalState }, obj, { dispatch }) => {
        const { first_name, last_name, middle_name } = context.init_state.profile.user;
        const redirectTo = obj?.redirectTo;
        try {
            dispatch('setModalState', {
                show: true,
            })
            dispatch('setModalState', {
                show: true,
                title: <SubTitle>Данные для возврата денежных средств:</SubTitle>,
                content: await getMyCash(first_name, last_name, middle_name, dispatch, redirectTo, closeModalState),
                addClass: 'modal-get-my-cash'
            })

        } catch (err) {
            console.log('ERROR getMyCach FROM BALANCE', err)
            let error = [Text({ text: 'error-on-server' })];
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

    store.on('modalShowInfoOrder', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { status } = obj;
            const { role } = context.init_state.profile;
            const numberOrder = context.init_state.order.fullNumberOrder;
            dispatch('setModalState', {
                show: true,
                content: contentInfoOrder(status, role, numberOrder),
                action: {
                    title: ['продолжить', null]
                },
                addClass: 'modal-default',
                onClick: () => closeModalState(),
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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

    store.on('openModalCollections', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            const { role } = context.init_state.profile;
            const product = context.init_state.productDetails;
            const recommended_price = context.init_state.recommended_price;
            const currency = context.init_state.currency;
            console.log({obj}, { product })
            const { collections, title } = obj;

            dispatch('setModalState', {
                show: true,
                title: 'Иформация по открытым сборам',
                content: contentInfoCollection( collections, title, product, recommended_price, currency, role),
                action: {
                    title: ['продолжить', null]
                },
                addClass: 'modal-collections',
                onClick: () => closeModalState(),
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    store.on('openModalPhoto', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
           
            dispatch('setModalState', {
                show: true,
                title: null,
                content: openPhotoForSiew( obj.image, obj.urlProduct ),
                action: {
                    title: ['продолжить', null]
                },
                addClass: 'modal-preview-photo',
                onClick: () => closeModalState(),
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    store.on('openModalVideo', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
           
            dispatch('setModalState', {
                show: true,
                title: null,
                content: openVideoForSiew( obj.video, obj.preview, obj.urlProduct ),
                action: {
                    title: ['продолжить', null]
                },
                addClass: 'modal-preview-photo',
                onClick: () => closeModalState(),
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    store.on('openModalTableSize', ({ context, closeModalState }, obj, { dispatch }) => {
        try {
           
            dispatch('setModalState', {
                show: true,
                title: null,
                content: openTableSize( ),
                action: {
                    title: ['продолжить', null]
                },
                addClass: 'modal-preview-table',
                onClick: () => closeModalState(),
            })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
        try {
            // dispatch('setModalState', {
            //     show: true,
            //     title: null,
            //     content: openVidjetChat( ),
            //     // action: {
            //     //     title: [null, null]
            //     // },
            //     addClass: 'modal-vidjet-chat',
            //     onClick: () => closeModalState(),
            // })
        } catch (err) {
            console.log('ERROR modalDeleteAccaunt', err)
            let error = [Text({ text: 'error-on-server' })];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    error.push(`${errors[0]}`)
                }
                console.log({ errors }, { err: typeof errors })
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
    //
}

