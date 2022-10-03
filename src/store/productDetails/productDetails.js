import api from '../../api/api';
import { getActiveColor, getActiveSize } from '../../helpers/helpers';

export const ProductDetails = store => {
    const apiContent = api.contentApi;

    store.on('getProductDetails', async ( { context }, obj, { dispatch }) => {
        try{
            const { productId } = obj;
            const params = {
                id:productId,
                color: getActiveColor(obj.color),
                size: getActiveSize(obj.size),
                collection: null,
                // pack ??????
            }
            const res = await apiContent.getProduct(productId, params)
            const updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    productDetails: {
                        ...context.init_state.productDetails,
                        ...res,
                    }
                }
            }
            console.log({ updateContext_store: updateContext }, {res})
            
            const timerGetReviews = setTimeout(()=>{
                dispatch('getReviewsProducts', params)
                return () => clearTimeout(timerGetReviews);
            },500)
            
            const timerGetAlreadyWatch = setTimeout(()=>{
                dispatch('getYouAlreadyWatch');
                return () => clearTimeout(timerGetAlreadyWatch);
            },4000)
            
            dispatch('context', updateContext)
        }catch(err){
            console.log('Sorry something went wrong :) ', err)
        }
    })

}