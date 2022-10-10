import api from "../../api/api";

import { initValueCheckBoxFilters } from "../../helpers/initialValues/initialValues";

export const catalog = store => {
    const apiContent = api.contentApi;
    const apiProfile = api.profileApi;

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
        try {
            console.log({ objInport: obj?.is_import })
            console.log({ objPolish: obj?.is_polish })

            let params = obj ? {
                page: 1,
                page_size: 30,
                ...obj,
                is_polish: obj?.is_polish ? false : true,
                is_import: obj?.is_import ? false : true
            } : {}

            const products = await apiContent.getCatalogData(params);

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    filters_params: {
                        ...context.init_state.filters_params,
                        is_new: obj?.is_new ? obj.is_new : false,
                        is_bestseller: obj?.is_bestseller ? obj.is_bestseller : false,
                        is_closeout: obj?.is_closeout ? obj.is_closeout : false,
                        is_in_collection: obj?.is_in_collection ? obj.is_in_collection : false,
                        is_in_stock: obj?.is_in_stock ? obj.is_in_stock : false,
                        is_not_range: obj?.is_not_range ? obj.is_not_range : false,
                        is_polish: obj?.is_import ? false : true,
                        is_import: obj?.is_polish ? false : true,

                        categories: !!obj?.categories?.length ? obj.categories : []
                    },
                    dataProducts: products,
                }
            }
            return dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR getCatalog STORE', err)
        }
    })

    store.on('getYouAlreadyWatch', async ( { context }, obj, { dispatch }) => {
        try{
            const res = await apiProfile.getAlreadySaw()
            
            console.log({res})
            const updateContext = {
                ...context,
                init_state: {
                    ...context.init_state,
                    youAlredyWatch: {
                        ...context.init_state.youAlredyWatch,
                        ...res,   
                        results: res.results
                    }
                }
            }
            console.log({updateContext})
            dispatch('context', updateContext)

        }catch(err){
            console.log('Sorry something went wrong :) ', err)
        }
    })
    
    store.on('getExportCatalog', async ({ context }, obj, { dispatch }) => {
        try {
            console.log({ objInport: obj?.is_import })
            console.log({ objPolish: obj?.is_polish })

            let params = obj ? {
                    page: 1,
                    page_size: 30,
                    ...obj,
                    is_polish: obj?.is_polish ? false : true,
                    is_import: obj?.is_import ? false : true
                } : {}

            const products = await apiContent.getPhotosListForExportCatalog(params);

            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,
                    filters_params: {
                        ...context.init_state.filters_params,
                        is_new: obj?.is_new ? obj.is_new : false,
                        is_bestseller: obj?.is_bestseller ? obj.is_bestseller : false,
                        is_closeout: obj?.is_closeout ? obj.is_closeout : false,
                        is_in_collection: obj?.is_in_collection ? obj.is_in_collection : false,
                        is_in_stock: obj?.is_in_stock ? obj.is_in_stock : false,
                        is_not_range: obj?.is_not_range ? obj.is_not_range : false,
                        is_polish: obj?.is_import ? false : true,
                        is_import: obj?.is_polish ? false : true,

                        categories: !!obj?.categories?.length ? obj.categories : []
                    },
                    exportCatalog: products,
                }
            }
            return dispatch('context', newContext)

        } catch (err) {
            console.log('ERROR getCatalog STORE', err)
        }
    })
}