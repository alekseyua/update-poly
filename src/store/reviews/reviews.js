import api from "../../api/api";
import Text from "../../helpers/Text";
import Grid from '../../Views/GridContainerBlock';
import { addReviewsFunc } from './addReviews';

import { initReviews, initialFetchFiltersReviews } from '../../helpers/initialValues/initialValues';
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";
import { errorAlertIcon } from "../../images";
import { ROLE } from "../../const";

export const reviews = store => {
    const apiContent = api.contentApi;

    store.on('@init', () => ({ reviews: initReviews }));

    store.on('updateLikeInReview', async ({ context, closeModalState, ...dataStore }, obj, { dispatch }) => {
        try {
            let isLiked = false;
            let { product_reviews, service_reviews } = context.init_state.reviews;
            let currentProduct_reviews = {}
            currentProduct_reviews = product_reviews.filter(el => el.id === obj.id ? el : null)[0] || service_reviews.filter(el => el.id === obj.id ? el : null)[0]
            isLiked = currentProduct_reviews?.is_current_user_liked
            let postLikes;
            let count = 0;
            console.log({isLiked})
            if (isLiked) {
                postLikes = await apiContent.postLikes({ profile: obj.profileId, review: obj.id, is_active: false })
                count = -1
            } else {
                postLikes = await apiContent.postLikes({ profile: obj.profileId, review: obj.id, is_active: true })
                count = 1
            }

            currentProduct_reviews = {
                ...currentProduct_reviews,
                is_current_user_liked: postLikes.data.is_active,
                likes_count: currentProduct_reviews.likes_count + count

            }
            const updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    reviews: {
                        ...context.init_state.reviews,
                        product_reviews: [...context.init_state.reviews.product_reviews.map(el => el.id === currentProduct_reviews.id ? ({ ...el, is_current_user_liked: currentProduct_reviews.is_current_user_liked, likes_count:  currentProduct_reviews.likes_count}) : el)],
                        service_reviews: [...context.init_state.reviews.service_reviews.map(el => el.id === currentProduct_reviews.id ? ({ ...el, is_current_user_liked: currentProduct_reviews.is_current_user_liked, likes_count : currentProduct_reviews.likes_count}) : el)]
                    }
                }
            }
            // console.log('updateContext',updateContext)

            return dispatch('context', updateContext)
        } catch (err) {
            console.log('ERROR reviews = ', err)
            if (err.statusText === 'Unauthorized') {
                dispatch('setModalState', {
                    show: true,
                    content: (
                        <Grid.WrapperBlock>
                            <Grid.BlockCenter>
                                {
                                    Text({ text: 'notRegistration' })
                                }
                            </Grid.BlockCenter>
                        </Grid.WrapperBlock>
                    )
                })
            }else{
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
        }
    })

    store.on('getReviewsContext', async ({ context, closeModalState }, obj, { dispatch }) => {
        try{
        const data = await apiContent.getReviews();
        const reviews = {
            "service_reviews": data.results.filter(el => !el.product),
            "product_reviews": data.results.filter(el => el.product),
            "count_is_photos": data.results.filter(el => !!el.review_photos.length).length
        }
        const updateContext = {
            ...context,
            init_state: {
                ...context.init_state,
                reviews: {
                    ...context.init_state.reviews,
                    product_reviews: reviews.product_reviews,
                    service_reviews: reviews.service_reviews,
                    count_is_photos: reviews.count_is_photos
                }
            }
        }
        return dispatch('context', updateContext)
    } catch (err) {
        console.log('ERROR GET COUNTRY', err);
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

    store.on('getReviewsProducts', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {

            const { productId, page } = obj;

            const newPage = page === undefined? 1 : 1 + page;

            const params = {
                product: productId,
                page_size: 5,
                page:  newPage
            }

            const dataReviewProduct = await apiContent.getReviews(params);

            const updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    reviews: {
                        ...context.init_state.reviews,
                        dataReviewProductCount: dataReviewProduct.count,
                        product_reviews: dataReviewProduct.results,
                        pageReviewProduct: newPage
                    }
                }
            }
            console.log({updateContext})
            return dispatch('context', updateContext);

        } catch (err) {
            console.log('ERROR GET COUNTRY', err);
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

    store.on('sendReview', async ({ context, closeModalState }, obj, { dispatch }) => {
        const { setValues } = obj.dataFormik;
        const redirectTo = obj.redirectTo;
        const { role } = context.init_state.profile;
        try{
            setValues({
                activeSpinner: true
            })
            const { id } = context.init_state.profile;
        const params = {
            iAgreeDataProcessing: obj.iAgreeDataProcessing,
            files: obj.uploadFiles,
            content: obj.content,
            product: obj.product,
            stars: obj.stars,
            profile: id,
            files: obj.files
        };
        const sendreview = await apiContent.postReviews(params)
        
        setValues({
            iAgreeDataProcessing: false,
            uploadFiles: [],
            content: '',
            stars: 0,
            activeButton: true,
            activeSpinner: false
        })
        //?! три пути :
        //?! 1) добавить в контекст и показывать сразу
        let updateContext = {};

        if ( obj.product === undefined ){
            updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    reviews: {
                        ...context.init_state.reviews,
                        getMyReviewList: {
                            ...context.init_state.reviews.getMyReviewList,
                            count: context.init_state.reviews.getMyReviewList.count + 1,
                            results: [ ...context.init_state.reviews.getMyReviewList.results, {
                                    id: sendreview.id,
                                    review_type: {
                                        type: 'Отзыв о сервисе',
                                        product: null
                                    },
                                    review_photos: sendreview.review_photos,
                                    review_videos: sendreview.review_videos,
                                    created_at: sendreview.created_at,
                                    likes_count: sendreview.likes_count,
                                    status: 'На модерации',
                                    content: sendreview.content,
                                    stars: sendreview.stars,                                
                            }]
                        },
                        service_reviews: [sendreview, ...context.init_state.reviews.service_reviews ],
                    },
                }
            }
        }else{
            updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    reviews: {
                        ...context.init_state.reviews,
                        product_reviews: [...context.init_state.reviews.product_reviews, sendreview],
                    },
                    reviews_count: context.init_state.reviews_count + 1
                }
            }
            
        }
        dispatch('context', updateContext)
        closeModalState()
         //?! 2) делать запрос на получения всех ревью, но нужно поменять стратегию на бэке
         const paramsUpdateReview = {
             product: obj.product,
             page_size: 5,
             page:  context.init_state.reviews.newPage
         }
         // dispatch('getReviewsProducts', paramsUpdateReview)
         //?! 3) Показывать попап что отзыв отправлен на модерацию + 
        } catch (err) {
            console.log('ERROR GET ', err);
            setValues({
                activeSpinner: false
            })
            let error = ['Что бы воспользоваться всеми возможностями сотрудничества, необходимо зарегистрироваться'];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    if(errors.length)
                       return error.push(`${errors[0]}`);
                    errors?.detail? error.push(`${errors.detail}`) : null
                }                
            }
            let params = {
                show: true,
                content: textErrorMessage(error),
                iconImage: errorAlertIcon,
                addClass: 'modal-alert-error',
                action: {
                    title: ['продолжить', null]
                },    
                onClick: () => closeModalState(),
            }
            console.log({role})
            role === ROLE.UNREGISTRED?
                params = { 
                    ...params, 
                    action: {
                        title: ['продолжить', 'зарегистрироваться']
                    },
                    onClickCancel: () => redirectTo('/registration')
                }
                : null
            dispatch('setModalState', params)
        }
    })

    store.on('filterReviews', async ({ context, closeModalState }, obj, { dispatch }) => {
        try{
        let params = { ...initialFetchFiltersReviews }
        !!obj?.product__isnull ? params = { ...params, product__isnull: obj.product__isnull } : null;
        !!obj?.is_with_media ? params = { ...params, is_with_media: obj.is_with_media } : null;
        !!obj?.checkFilter ? params = { ...params, checkFilter: obj.checkFilter } : null;
        !!obj?.page ? params = { ...params, page: obj.page } : null;
        !!obj?.ordering ? params = { ...params, ordering: obj.ordering } : null;
        const data = await apiContent.getReviews(params);
        const reviews = {
            "service_reviews": data.results.filter(el => !el.product),
            "product_reviews": data.results.filter(el => el.product)
        }
        const updateContext = {
            ...context,
            init_state: {
                ...context.init_state,
                reviews: {
                    ...context.init_state.reviews,
                    product_reviews: reviews.product_reviews,
                    service_reviews: reviews.service_reviews
                }
            }
        }
        return dispatch('context', updateContext)
    } catch (err) {
        console.log('ERROR GET COUNTRY', err);
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

    store.on('addReview', ({ context, closeModalState }, obj, { dispatch }) => {

        dispatch('setModalState',{
            show: true,
            title: '',
            content: addReviewsFunc()
        })
    })

    store.on('getMyReviewList', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {

            const params = {
                page_size: 10,
                page:  obj?.page ?? 1
            }

            const dataReview = await apiContent.getMyReviewList(params);

            const updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    reviews: {
                        ...context.init_state.reviews,
                        getMyReviewList: dataReview
                    }
                }
            }
            console.log({updateContext})
            return dispatch('context', updateContext);

        } catch (err) {
            console.log('ERROR GET COUNTRY', err);
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if (typeof errors !== 'object') {
                    error.push(`${errors}`)
                } else {
                    if(errors.length)
                       return error.push(`${errors[0]}`);
                    errors?.detail? error.push(`${errors.detail}`) : null
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

    
    const openModalFinalyAddReview = (data) => {
        !!data ? reloadDataReview(): null
        return setModalStates({
          content: (
            <ModalContentViews.ModalWrapper>
              <ModalContentViews.CloseBtn closeModal={closeModal} />
              <ModalContentViews.ContentBlock>
                <ModalContentViews.CenterPosition>
                  <ModalContentViews.SuccessOrError
                    closeModal={closeModal}
                    success={data}
                    content={data ? 'Ваш отзыв успешно отправлен!' : 'Неправильно введены данные!'}
                  />
                </ModalContentViews.CenterPosition>
              </ModalContentViews.ContentBlock>
            </ModalContentViews.ModalWrapper>
          ),
          show: true,
          addClass: 'modal-success_error',
        });
      };
      const openModalAddReview = (data) => {
        return setModalStates({
          content: (
            <ModalContentViews.ModalWrapper>
              <ModalContentViews.CloseBtn closeModal={closeModal} />
              <ModalContentViews.ContentBlock>
                <ModalContentViews.CenterPosition>
                  <AddReview.ModalAddReview
                    openModalFinalyAddReview={openModalFinalyAddReview}
                    profile={profile}
                    closeModal={closeModal}
                  />
                </ModalContentViews.CenterPosition>
              </ModalContentViews.ContentBlock>
            </ModalContentViews.ModalWrapper>
          ),
          show: true,
          addClass: 'modal-review',
        });
      };
}

