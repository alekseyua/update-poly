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
            isLiked = currentProduct_reviews.is_current_user_liked
            let postLikes;
            if (isLiked) {
                postLikes = await apiContent.postLikes({ profile: obj.profileId, review: obj.id, is_active: false })
            } else {
                postLikes = await apiContent.postLikes({ profile: obj.profileId, review: obj.id, is_active: true })
            }

            currentProduct_reviews = {
                ...currentProduct_reviews,
                is_current_user_liked: postLikes.data.is_active
            }
            const updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    reviews: {
                        ...context.init_state.reviews,
                        product_reviews: [...context.init_state.reviews.product_reviews.map(el => el.id === currentProduct_reviews.id ? ({ ...el, is_current_user_liked: currentProduct_reviews.is_current_user_liked }) : el)],
                        service_reviews: [...context.init_state.reviews.service_reviews.map(el => el.id === currentProduct_reviews.id ? ({ ...el, is_current_user_liked: currentProduct_reviews.is_current_user_liked }) : el)]
                    }
                }
            }
            return dispatch('context', updateContext)
        } catch (err) {
            console.log('ERROR reviews = ', err)
            if(err.request.statusText === 'Unauthorized'){
                dispatch('setModalState', {
                    show: true,
                    content: (
                        <Grid.WrapperBlock>
                            <Grid.BlockCenter>
                        {
                            Text({text: 'notRegistration'})
                        }
                            </Grid.BlockCenter>
                        </Grid.WrapperBlock>
                    )
                })
            }
        }
    })

    store.on('getReviewsContext', async ({ context }, obj, { dispatch })=>{
        const data = await apiContent.getReviews();
        const reviews = {
            "service_reviews": data.results.filter(el=> !el.product),
            "product_reviews": data.results.filter(el=> el.product),
            "count_is_photos": data.results.filter(el=> !!el.review_photos.length).length
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

    store.on('filterReviews', async ({ context }, obj, { dispatch } ) => {
        let params = {...initialFetchFiltersReviews}
        !!obj?.product__isnull? params = {...params, product__isnull: obj.product__isnull} : null;
        !!obj?.is_with_media? params = {...params, is_with_media: obj.is_with_media} : null;
        !!obj?.checkFilter? params = {...params, checkFilter: obj.checkFilter} : null;
        !!obj?.page? params = {...params, page: obj.page} : null;
        !!obj?.ordering? params = {...params, ordering: obj.ordering} : null;
    
        console.log({ getReviews: params })
        const data = await apiContent.getReviews(params);
        const reviews = {
            "service_reviews": data.results.filter(el=> !el.product),
            "product_reviews": data.results.filter(el=> el.product)
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

