import api from "../../api/api";

import { initValueCheckBoxFilters } from "../../helpers/initialValues/initialValues";

export const catalog = store => {
    const apiContent = api.contentApi;

    store.on('@init', () => ({ valueCheckBoxFilters: initValueCheckBoxFilters }));
    store.on('changeParamsFilters', ({ context, valueCheckBoxFilters }, obj, { dispatch }) => {
        console.log('obj in STORE filters = ', obj)
        // let updateValueCheckBoxFilter = {}
        // !!context.init_state?.filters_params?.valueCheckBoxFilters? 
        //     updateValueCheckBoxFilter = {...context.init_state.filters_params.valueCheckBoxFilters, ...obj.valueCheckBoxFilters} 
        //     : updateValueCheckBoxFilter = {...obj.valueCheckBoxFilters};
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,
                filters_params: {
                        ...context.init_state.filters_params,
                        ...obj.valueCheckBoxFilters,
                        is_in_stock: obj.valueCheckBoxFilters.is_in_stock,
                        is_new: obj.valueCheckBoxFilters.is_new,
                        is_bestseller: obj.valueCheckBoxFilters.is_bestseller,
                        is_closeout: obj.valueCheckBoxFilters.is_closeout,
                        categories: [...obj.valueCheckBoxFilters.categories],
                        brands: [...obj.valueCheckBoxFilters.brands],
                        colors: [...obj.valueCheckBoxFilters.colors],
                        sizes: [...obj.valueCheckBoxFilters.sizes],
                        type: [...obj.valueCheckBoxFilters.type]
                }
            },
        }
        // console.log('newContext', newContext)
        dispatch('context', newContext)
        dispatch('getCatalog', obj.valueCheckBoxFilters)
        return 
    })
    store.on('getCatalog', async ({ context }, obj, { dispatch }) => {
        // console.log('obj get catalog = ', obj)
        try {

            let params = {
                page: obj?.page || 1,
                page_size: obj?.page_size || 30,
                ...obj
            }
            const products = await apiContent.getCatalogData(params);

            console.log({ products })

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    dataProducts: products.results
                }
            }
            return dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR getCatalog STORE', err)
        }
    })
}