import api from "../../api/api";
import BlockGrid from '../../Views/GridContainerBlock';
import AsyncComponent from "../../helpers/asyncComponent";
import { ROLE } from "../../const";
const AsyncProductCardModal = AsyncComponent(()=>{
    return import ('../../Views/PreviewProduct/PreviewProductCardModal/PreviewProductCardModalContainer');
})

export const quickViewProduct = store => {
    const apiContent = api.contentApi;

    store.on('quickViewProduct', async ({ context }, obj, { dispatch }) => {
        
        try{
            const { role, status } = context.init_state.profile;
            const { currency } = context.init_state;

            let params = {
                color: !Array.isArray(obj.color)? obj.color : obj.color.filter(el=> el.selected)[0].id,
                size: !Array.isArray(obj.size)?  obj.size : obj.size.filter(el=> el.selected)[0].id
            }

            // console.log(
            //     {obj}, 
            //     {params}
            // )
            const res = await apiContent.getProduct(obj.id, params)
            // console.log({res})
            // console.log({role}, {status})
            dispatch('setModalState',{
                title: res.title,
                content: (
                    <BlockGrid.BlockCenter>
                            <AsyncProductCardModal
                                url = {obj.url}
                                brand={res.brand}
                                role={role}
                                productId={res.id}
                                profileId={0}
                                adding_type={'item'}
                                breadcrumbs={[]}
                                reviews_statistic={{}}
                                reviewsCount={res.review.all_count}
                                title={res.title}
                                prices={res.prices}
                                recommended_price={0}
                                colors={res.colors} 
                                sizes={res.sizes}
                                review={res.review}
                                is_new={res.is_new}
                                in_stock_count={res.in_stock_count}
                                is_bestseller={res.is_bestseller}
                                is_in_stock={res.is_in_stock}
                                role_configuration={{}}
                                is_closeout={res.is_closeout}
                                is_liked={res.is_liked}
                                media={res.media}
                                in_cart_count={res.in_cart_count}
                                site_configuration={{}}
                                is_collection={res.is_collection}
                                product_rc={res.product_rc}
                                article={res.article}
                                product_rcAmount={res.minimum_rc}
                                product_sku={res.product_sku}
                                currency={currency}
                                collections={res.collections}
                                status={status}
                            />
                    </BlockGrid.BlockCenter>

                  ),
                  show: true,
                  addClass: 'modal-min_wrap',
                })


        }catch(err){
            console.log('Error in quickViewProduct', err)
        }
    })
}