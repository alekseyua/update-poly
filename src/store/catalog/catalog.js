import api from "../../api/api";

import { initValueCheckBoxFilters } from "../../helpers/initialValues/initialValues";
import Text from "../../helpers/Text";
import { errorAlertIcon } from "../../images";
import { textErrorMessage } from "../modalStorage/modalWindow/modalWindow";

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

    store.on('changeParamsFiltersPhoto', ({ context, valueCheckBoxFilters }, obj, { dispatch }) => {
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
        dispatch('getExportCatalog',{ ... obj.valueCheckBoxFilters})
        return
    })

    store.on('getCatalog', async ({ context, closeModalState }, obj, { dispatch }) => {
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
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('getYouAlreadyWatch', async ( { context, closeModalState }, obj, { dispatch }) => {
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
            
        } catch (err) {
            console.log('Sorry something went wrong :) ', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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
    
    store.on('getExportCatalog', async ({ context, closeModalState }, obj, { dispatch }) => {
        try {
            console.log({obj})
             
            let params = {};
            let statusPolish = true;
            let statusImport = true;

            let statusNotRange = false;
            let statusCollection = false;

            if (obj){
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
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('showMoreCatalog', async ({ context, page, closeModalState }, obj, { dispatch }) => {
        try{

            const { filters_params } = context.init_state
            console.log({pageShow: page}, {filters_params})
            delete filters_params['is_import']
            delete filters_params['is_polish']
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

            
        } catch (err) {
            console.log('ERROR GET DATA CARALOG FOR BUTTON MORE', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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

    store.on('showMoreExportCatalog', async ({ context, page, closeModalState }, obj, { dispatch }) => {
        try{

            // const page = context.init_state.
            delete obj['is_import']
            delete obj['is_polish']
            const params = { 
                ...obj,
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

        } catch (err) {
            console.log('ERROR GET DATA CARALOG FOR BUTTON MORE', err)
            let error = [Text({text: 'error-on-server'})];
            if (err?.data) {
                const errors = err.data;
                if ( typeof errors !== 'object') {
                    error.push(`${errors}`)
                }else{
                    error.push(`${errors[0]}`)
                }
                console.log({errors}, {err: typeof errors})
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
    
    store.on('selectPhoto', ({ context }, obj, { dispatch }) => {
        const { exportCatalog } = context.init_state;

        const newExportCatalogResults = exportCatalog.results.map( el => el.id === obj.id? {...el, selected: !el.selected } : el);
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,                    
                exportCatalog: {
                    ...context.init_state.exportCatalog,
                    results: newExportCatalogResults,
                    selected_all: false,
                    enabledBtn: newExportCatalogResults.filter( el => el.selected ).length > 0? false : true,
                },
            }
        }
        return dispatch('context', newContext)
    })
    
    store.on('selectedAllPhoto', ({ context }, obj, { dispatch }) => {
        const { exportCatalog } = context.init_state;

        const newExportCatalogResults = exportCatalog.results.map( el => ({...el, selected: !obj.selected }));
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,                    
                exportCatalog: {
                    ...context.init_state.exportCatalog,
                    results: newExportCatalogResults,
                    selected_all: !obj.selected,
                    enabledBtn: newExportCatalogResults.filter( el => el.selected ).length > 0? false : true,
                },
            }
        }
        return dispatch('context', newContext)
    })

    store.on('downloadSelectPhoto', async ({ context, closeModalState }, obj, { dispatch }) => {
        try{

            const { exportCatalog } = context.init_state;
        
            const photos = exportCatalog.results.filter( el => el.selected );
            const params = {
                photos,
            }
            
            const res = await apiContent.getArchivePhotosFromExportCatalog(params)
            console.log({res}, {params})

            window.location.href = res.url;

        const newExportCatalogResults = exportCatalog.results.map( el => ({...el, selected: false }) );
        const newContext = {
            ...context,
            "init_state": {
                ...context.init_state,                    
                exportCatalog: {
                    ...context.init_state.exportCatalog,
                    results: newExportCatalogResults,
                    selected_all: false,
                },
            }
        }
        return dispatch('context', newContext)


        
    } catch (err) {
        console.log('ERROR download photo', err)
        let error = [Text({text: 'error-on-server'})];
        if (err?.data) {
            const errors = err.data;
            if ( typeof errors !== 'object') {
                error.push(`${errors}`)
            }else{
                error.push(`${errors[0]}`)
            }
            console.log({errors}, {err: typeof errors})
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

}