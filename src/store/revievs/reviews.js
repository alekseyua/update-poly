import api from "../../api/api";
import Text from "../../helpers/Text";
import Grid from '../../Views/GridContainerBlock';
import { initReviews, initialFetchFiltersReviews } from '../../helpers/initialValues/initialValues';

export const reviews = store => {
    const apiContent = api.contentApi;

    store.on('@init', () => ({ reviews: initReviews }));

    store.on('updateLikeInReview', async ({ context, ...dataStore }, obj, { dispatch }) => {
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
            if (err.request.statusText === 'Unauthorized') {
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
            }
        }
    })

    store.on('getReviewsContext', async ({ context }, obj, { dispatch }) => {
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
    })

    store.on('getReviewsProducts', async ({ context }, obj, { dispatch }) => {
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
            console.log('ERROR get data review product', err)
            if (err.request.status === 404){
                console.log('Ошибка получение данных ', err.data.detail)
            }
        }
    })

    store.on('sendReview', async ({ context }, obj, { dispatch }) => {
        
            console.log({obj})
        const params = {
            iAgreeDataProcessing: obj.iAgreeDataProcessing,
            files: obj.uploadFiles,
            content: obj.content,
            product: obj.product,
            profile: obj.profile,
            stars: obj.stars,
        };
        const sendreview = await apiContent.postReviews(params)

        //?! три пути :
        //?! 1) добавить в контекст и показывать сразу
        const updateContext = {
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
        console.log('result send reviews = ', {sendreview}, {updateContext} )
        return dispatch('context', updateContext)
         //?! 2) делать запрос на получения всех ревью, но нужно поменять стратегию на бэке
         const paramsUpdateReview = {
             product: obj.product,
             page_size: 5,
             page:  context.init_state.reviews.newPage
         }
         // dispatch('getReviewsProducts', paramsUpdateReview)
         //?! 3) Показывать попап что отзыв отправлен на модерацию + 

    })


    store.on('filterReviews', async ({ context }, obj, { dispatch }) => {
        let params = { ...initialFetchFiltersReviews }
        !!obj?.product__isnull ? params = { ...params, product__isnull: obj.product__isnull } : null;
        !!obj?.is_with_media ? params = { ...params, is_with_media: obj.is_with_media } : null;
        !!obj?.checkFilter ? params = { ...params, checkFilter: obj.checkFilter } : null;
        !!obj?.page ? params = { ...params, page: obj.page } : null;
        !!obj?.ordering ? params = { ...params, ordering: obj.ordering } : null;

        console.log({ getReviews: params })
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
    })
}

