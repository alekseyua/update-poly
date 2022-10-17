import api from "../../api/api";

import { initValueCheckBoxFilters } from "../../helpers/initialValues/initialValues";

export const catalog = store => {
    const apiContent = api.contentApi;
    const apiProfile = api.profileApi;

    store.on('@init', () => ({ valueCheckBoxFilters: initValueCheckBoxFilters }));
    store.on('@init', ({ page })=>({ page: 1 }))
    store.on('setPage', ({ page }, obj, { dispatch }) => ({page: obj.page}))
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
                    
                    is_polish: obj.valueCheckBoxFilters.is_polish,
                    is_import: obj.valueCheckBoxFilters.is_import,

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

    store.on('getCatalog', async ({ context, valueCheckBoxFilters }, obj, { dispatch }) => {
        try {
            const { youAlredyWatch, filters_params } = context.init_state;
            let params = {};
            let statusPolish = true;
            let statusImport = true;

            let statusNotRange = false;
            let statusCollection = false;

            if (obj){
            console.log({filter: obj})
                if(obj['is_import'] && !obj['is_polish']){
                    delete obj['is_polish']
                    statusPolish = false;
                }
                if(obj['is_polish'] && !obj['is_import']){
                    delete obj['is_import']
                    statusImport = false;
                }
                if(obj?.is_import && obj?.is_polish){
                    delete obj['is_polish']
                    delete obj['is_import']
                    statusPolish = true;
                    statusImport = true;
                }
                if(!obj?.is_import && !obj?.is_polish && obj?.is_polish !== undefined && obj?.is_import !== undefined){
                    obj['is_import'] = true
                    obj['is_polish'] = true
                    statusPolish = false;
                    statusImport = false;
                }
                
                if(obj['is_not_range'] && !obj['is_in_collection']){
                    delete obj['is_in_collection']
                    statusNotRange = true;
                }
                if(obj['is_in_collection'] && !obj['is_not_range']){
                    delete obj['is_not_range']
                    statusCollection = true;
                }
                if(obj?.is_in_collection && obj?.is_not_range){
                    obj['is_not_range'] = true
                    obj['is_in_collection'] = true
                    
                    statusNotRange = true;
                    statusCollection = true;
                }
                if(!obj?.is_in_collection && !obj?.is_not_range && obj?.is_in_collection !== undefined && obj?.is_not_range !== undefined){
                    delete obj['is_in_collection']
                    delete obj['is_not_range']
                    statusNotRange = false;
                    statusCollection = false;
                }
                // delete obj['is_not_range']
                // delete obj['is_in_collection']
                
                params = {                     
                    page: obj?.page? obj.page : 1,
                    page_size: obj?.page_size? obj.page_size : 30,
                    ...obj,                    
                }
            }

            obj?.page > 1 ? dispatch('setPage', { page: obj.page }) : dispatch('setPage', { page: 1 });
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
                        is_in_stock: obj?.is_in_stock ? obj.is_in_stock : false,

                        is_in_collection: statusCollection,
                        is_not_range: statusNotRange,
                        is_polish: statusPolish,
                        is_import: statusImport,

                        categories: !!obj?.categories?.length ? obj.categories : []
                    },
                    dataProducts: products,                    
                }
            }
            dispatch('context', newContext)
            if( !!!youAlredyWatch.results.length ){
                const timerGetAlreadyWatch = setTimeout(()=>{
                    dispatch('getYouAlreadyWatch');
                    return () => clearTimeout(timerGetAlreadyWatch);
                },4000)
            }

            return true

        } catch (err) {
            obj?.page > 1 ? dispatch('setPage', { page: obj.page - 1 }) : null
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
             
            let params = {};
            let statusPolish = true;
            let statusImport = true;

            let statusNotRange = false;
            let statusCollection = false;

            if (obj){
            console.log({obj})
                if(obj['is_import'] && !obj['is_polish']){
                    delete obj['is_polish']
                    statusPolish = false;
                }
                if(obj['is_polish'] && !obj['is_import']){
                    delete obj['is_import']
                    statusImport = false;
                }
                if(obj?.is_import && obj?.is_polish){
                    delete obj['is_polish']
                    delete obj['is_import']
                    statusPolish = true;
                    statusImport = true;
                }
                if(!obj?.is_import && !obj?.is_polish && obj?.is_polish !== undefined && obj?.is_import !== undefined){
                    obj['is_import'] = true
                    obj['is_polish'] = true
                    statusPolish = false;
                    statusImport = false;
                }
                
                if(obj['is_not_range'] && !obj['is_in_collection']){
                    delete obj['is_in_collection']
                    statusNotRange = true;
                }
                if(obj['is_in_collection'] && !obj['is_not_range']){
                    delete obj['is_not_range']
                    statusCollection = true;
                }
                if(obj?.is_in_collection && obj?.is_not_range){
                    obj['is_not_range'] = true
                    obj['is_in_collection'] = true
                    
                    statusNotRange = true;
                    statusCollection = true;
                }
                if(!obj?.is_in_collection && !obj?.is_not_range && obj?.is_in_collection !== undefined && obj?.is_not_range !== undefined){
                    delete obj['is_in_collection']
                    delete obj['is_not_range']
                    statusNotRange = false;
                    statusCollection = false;
                }
                // delete obj['is_not_range']
                // delete obj['is_in_collection']
                
                params = { page: obj?.page? obj.page : 1,
                    page_size: obj?.page_size? obj.page_size : 30,
                    ...obj,
                }
            }
            
            obj?.page > 1 ? dispatch('setPage', { page: obj.page }) : dispatch('setPage', { page: 1 });

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
                        is_in_stock: obj?.is_in_stock ? obj.is_in_stock : false,
                        is_in_collection: statusCollection,
                        is_not_range: statusNotRange,
                        is_polish: statusPolish,
                        is_import: statusImport,
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

    store.on('showMoreCatalog', async ({ context, page, valueCheckBoxFilters }, obj, { dispatch }) => {
        try{

            const { filters_params } = context.init_state
            console.log({pageShow: page})
            delete valueCheckBoxFilters['is_import']
            delete valueCheckBoxFilters['is_polish']
            const params = { 
                ...filters_params,
                page: page + 1,
                page_size: 30
            }

            const products = await apiContent.getCatalogData(params);
            dispatch('setPage', { page: page + 1 })
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,                    
                    dataProducts: {
                        ...context.init_state.dataProducts,
                        results: [...context.init_state.dataProducts.results, ...products.results]
                    },
                }
            }
            return dispatch('context', newContext)

            
        }catch(err){
            console.log('ERROR GET DATA CARALOG FOR BUTTON MORE', err)
        }
    })

    store.on('showMoreExportCatalog', async ({ context, page, valueCheckBoxFilters }, obj, { dispatch }) => {
        try{

            // const page = context.init_state.
            delete valueCheckBoxFilters['is_import']
            delete valueCheckBoxFilters['is_polish']
            const params = { 
                ...valueCheckBoxFilters,
                page: page + 1,
                page_size: 30
            }

            const products = await apiContent.getPhotosListForExportCatalog(params);
            dispatch('setPage', { page: page + 1 })
            const newContext = {
                ...context,
                "init_state": {
                    ...context.init_state,                    
                    exportCatalog: {
                        ...context.init_state.exportCatalog,
                        results: [...context.init_state.exportCatalog.results, ...products.results]
                    },
                }
            }
            return dispatch('context', newContext)

            
        }catch(err){
            console.log('ERROR GET DATA CARALOG FOR BUTTON MORE', err)
        }
    })
    
}