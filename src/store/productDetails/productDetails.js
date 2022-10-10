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
            if (err.statusText === 'Not Found'){
                dispatch('setModalState', {
                    show: true,
                    content: (
                        <div>Товар отсутствует в нашем каталоге</div>
                    )
                })
            }
        }
    })

}




const getMediaForColor = (media, product_sku, colorsn) => {
    // console.log('color func', colorsn)
    let newSku = [];
    media = media.map(item => {
        if (item !== null) {
            if (item.type === 'image') {
                return item = {
                    image: item.image,
                    image_thumb: item.image_thumb,
                    type: item?.type ? item.type : 'image',
                    color: 0,
                }
            } else {
                return item = {
                    preview: item.preview,
                    type: item.type,
                    video: item.video
                }
            }
        }
    });
    !!product_sku ? (
        newSku = product_sku.map(item => ({
            image: item.image,
            image_thumb: item.image_thumb,
            type: item?.type ? item.type : 'image',
            color: item.color,
        })),
        newSku = newSku.filter(item => item !== null && (item?.image || item?.video) !== '-' && item.color === colorsn?.id && (item?.image || item?.video) !== undefined)
    )
        : null;

    let allNewSku = newSku;
    media = media.filter(item => (item?.image || item?.video) !== '-' || (item?.image || item?.video) !== undefined);
    allNewSku = allNewSku.filter(item => (item?.image || item?.video) !== '-' || (item?.image || item?.video) !== undefined);
    media = [...newSku, ...media, ...allNewSku];
    media = media.filter((image, index, self) => {
        if (image.type === 'image') {
            return index === self.findIndex(t => t.image === image.image)
        } else {
            return index === self.findIndex(t => t.video === image.video)
        }
    })

    return media
}