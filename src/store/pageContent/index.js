import api from '../../api/api';
import initData from '../../../public/content-page.json';
import { initValueCheckBoxFilters } from '../../helpers/initialValues/initialValues';
import { getActiveColor, getCookie } from '../../helpers/helpers';
import { COOKIE_KEYS, ROLE } from '../../const';
import Text from '../../helpers/Text';
import { errorAlertIcon } from '../../images';
import { textErrorMessage } from '../modalStorage/modalWindow/modalWindow';
import * as serviceWorker from '../../serviceWorker';


export const pageContent = store => {
    const orderApi = api.orderApi;
    const apiCart = api.cartApi
    const apiContent = api.contentApi;

    store.on('@init', () => ({ context: initData }));

    store.on('context', ({ context, countWishList, page }, data) => {
    const currency = getCookie(COOKIE_KEYS.CURRENCIES)?.toLocaleUpperCase()
    const token = getCookie('ft_token');


    // if (!(!!token)){ 
    //     console.log('start unregister sw')
    //     serviceWorker.unregister();
    //   }else{
    //     console.log('start register sw')
    //     serviceWorker.register();
    //   }
      
      console.log('---------------------------------------------', data)


        return { context: { 
            ...data, 
            "init_state": {
                ...data.init_state,
                currency: currency,
                countWishList: countWishList,
                currentPage: page
            }
        } }

    })

    store.on('redirectTo', ({}, obj, {} ) => obj.redirectTo(obj.path) );

    store.on('getContextPage', async ({ context, closeModalState }, obj, { dispatch }) => {
        const currency = getCookie(COOKIE_KEYS.CURRENCIES)?.toLocaleUpperCase()

        try {
            
            const { url, redirectTo } = obj;
            //?! пока пользователь не зарегиный у него не все данные в таблице нужно учесть 
            
            console.log('******url store******', {url}, {a: currency} )
            //?! Здесь будем обнулять данные при переходе по страницам
            let newContext = {
                ...context,
                numberCurrentOrderForAddProduct: null,
                "init_state": {
                    ...context.init_state,
                    products: [],
                    page_info: {
                        // "id": 1,
                        "title": "",
                        "title_ru": "",
                        "slug": "",
                        "created_at": "2021-03-29T12:43:47.659811",
                        "updated_at": "2022-06-21T13:26:22.312590",
                        "seo_title": "",
                        "seo_title_ru": null,
                        "seo_keywords": "",
                        "seo_keywords_ru": null,
                        "seo_description": "",
                        "seo_description_ru": null,
                        "seo_author": "",
                        "seo_author_ru": null,
                        "seo_og_type": "",
                        "seo_image": null,
                        "content": "",
                        "content_ru": "",
                        "parent": null,
                        "page_type": 1,
                        "login_required": false,
                        "components": []
                    },
                    productDetails: {
                        "id": null,
                        "title": "",
                        "category": "",
                        "brand": "",
                        "slug": "",
                        "minimum_rc": null,
                        "minimum_rc_price": null,
                        "media": [],
                        "colors": [],
                        "sizes": [],
                        "collections": [],
                        "is_new": false,
                        "is_bestseller": false,
                        "is_closeout": false,
                        "is_in_stock": false,
                        "is_liked": false,
                        "in_cart_count": 0,
                        "in_stock_count": 0,
                        "prices": {
                            "price": null,
                            "old_price": null,
                            "more_3_item_price": null,
                            "more_5_item_price": null
                        },
                        "product_rc": "5 шт с фирмы любых моделей",
                        "is_collection": false,
                        "product_sku": [],
                        "content": "",
                        "extra": "",
                        "short_content": "",
                        "created_at": "",
                        "updated_at": "",
                        "ordering": 0,
                        "review": {
                            "all_count": 0,
                            "all_count_percent": 0
                        },
                        "seo_title": "",
                        "seo_keywords": "",
                        "seo_description": "",
                        "seo_author": "",
                        "seo_og_type": "website",
                        "seo_image": null,
                        "article": "",
                        "product_url": ""
                    },
                    news: [],
                },
            }
            dispatch('context', newContext)

            const res = await api.getPage({ url })


            console.log({resrequest: res})

            if(res.init_state?.code === 403) return redirectTo('/authorization')

            dispatch('setModalState', {
                // show: false,
            });
            // console.log('res new from url =', res.init_state)
            // console.log('res old from context = ', context)
            if (url === '/') {
                
                const filters = res.init_state.main_page.first_screen.filters;
                const in_stock_product_filters = res.init_state.main_page.in_stock_product_filters;
                const page_info = res.init_state.page_info;
                // let newContext = {};
                newContext = {
                    ...newContext,
                    "type": res.type,
                    "init_state": {
                        ...newContext.init_state,
                        ...res.init_state,
                        "announce": res.init_state.announce,
                        "breadcrumbs" : res.init_state.breadcrumbs,
                        "banners": !!res.init_state.banners.length ? res.init_state.banners : [],
                        "profile": {
                            ...context.init_state.profile,
                            ...res.init_state.profile
                        },
                        "products_in_stock": !!res.init_state.products.length ? res.init_state.products : [],
                        "products": [],
                        filters_params: { ...initValueCheckBoxFilters },
                        "main_page": {
                            ...res.init_state.main_page,
                            "first_screen": {
                                ...res.init_state.main_page.first_screen,
                                "filters": !!filters.length ? filters : [],
                            },
                            "in_stock_product_filters": !!in_stock_product_filters.length ? in_stock_product_filters : []
                        },
                        "cabinet_menu": !!res.init_state.cabinet_menu.length ? res.init_state.cabinet_menu : [],
                        "year": res.init_state.year,
                        "page_info": res.init_state.page_info ? res.init_state.page_info : {},
                        "news": !!res.init_state.news.length? res.init_state.news : [],
                        "reviews": {
                            "service_reviews": !!res.init_state.reviews.service_reviews.length ? [...res.init_state.reviews.service_reviews] : [],
                            "product_reviews": !!res.init_state.reviews.product_reviews.length ? [...res.init_state.reviews.product_reviews] : [],
                            "getMyReviewList": {
                                count: 0,
                                results: []
                            }
                        },
                        dataProducts: {
                            count: 0,
                            results: []
                        },
                        numberCurrentOrderForAddProduct: null
                    },
                }
                
                dispatch('context', newContext)

                const paramsInstock = {
                    page: 1,
                    page_size: 12,
                    is_in_stock: true,
                    categories: res.init_state.main_page.in_stock_product_filters[0].id
                }
                const products_in_stock = await apiContent.getCatalogData(paramsInstock);

                newContext = {
                    ...newContext,
                    "init_state": {
                        ...newContext.init_state,
                        products_in_stock: products_in_stock,
                        },
                }
                dispatch('context', newContext)
                // const timerTimeout = setTimeout(()=>{
                //     dispatch('getCatalog',paramsInstock)
                //     return ()=>clearTimeout(timerTimeout);
                // },600)
            }
            if (url === '/registration') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/authorization') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/about') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/news') {
                //    console.log('ressss === ', resss) 
                
                newContext = {
                    ...newContext,
                    "type": res.type,
                    "init_state": {
                        ...newContext.init_state,
                        ...res.init_state,                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                dispatch('context', newContext)
                return dispatch('getNews');
            }
            if (url.includes('/news-')) {
                //?! сдесь нужно будет реализовать подгрузку данный для медиа 
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                
                return dispatch('context', newContext)
            }
            if (url === '/for_partners') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/juridical') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/delivery') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/exchange') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/payment') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }            
            if (url === '/how_to') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }            
            if (url === '/information') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }
            if (url === '/contacts') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                return dispatch('context', newContext)
            }            
            if (url === '/reviews') {

                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                console.log('start get context reviews')
                dispatch('getReviewsContext');
                
                return dispatch('context', newContext)
            }
            if (url === '/catalog') {
                newContext = {
                    ...newContext,
                    "type": res.type,
                    "init_state": {
                        ...newContext.init_state,
                        ...res.init_state,
                        filters_params: { ...initValueCheckBoxFilters },
                        "multy_choise_filters":{
                            ...newContext.init_state.multy_choise_filters,
                            "by_brand": res.init_state.multy_choise_filters.by_brand ?? [],
                            "by_categories": res.init_state.multy_choise_filters.by_categories ?? [],
                            "by_color": res.init_state.multy_choise_filters.by_color ?? [],
                            "by_size": res.init_state.multy_choise_filters.by_size ?? [],
                            "by_type": res.init_state.multy_choise_filters.by_type ?? [],
                        },                        
                    },
                }
                dispatch('context', newContext)
                let params = {};
                const products = await apiContent.getCatalogData(params);
                newContext = {
                    ...newContext,
                    "init_state": {
                        ...newContext.init_state,
                        dataProducts: products,
                    }
                }
               return dispatch('context', newContext)
                // return dispatch('getCatalog')
            }
            // ExportCatalog
            if (url === '/catalog_export') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        filters_params: { ...initValueCheckBoxFilters },                        
                        numberCurrentOrderForAddProduct: null,
                        "multy_choise_filters":{
                            ...context.init_state.multy_choise_filters,
                            "by_brand": res.init_state.multy_choise_filters.by_brand ?? [],
                            "by_categories": res.init_state.multy_choise_filters.by_categories ?? [],
                            "by_color": res.init_state.multy_choise_filters.by_color ?? [],
                            "by_size": res.init_state.multy_choise_filters.by_size ?? [],
                            "by_type": res.init_state.multy_choise_filters.by_type ?? [],
                        },
                    },
                }
                // debugger
                console.log({newContext})
                dispatch('context', newContext);
                
                return dispatch('getExportCatalog')
            }
            if (url === '/wishlist') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                    },
                }
                
                dispatch('context', newContext)

                console.log('context.init_state.profile.wishlist',context.init_state.profile.wishlist)
                
                if(!!res.init_state.profile.wishlist){
                    console.log('getWishlist')
                    const timerTimeoutGetWishList = setTimeout(()=>{
                        dispatch('getWishlist');
                        return () => clearTimeout(timerTimeoutGetWishList);
                    },400)
                }

                if(!!!res.init_state.profile.wishlist){
                    console.log('getCatalog')
                    const timerTimeout = setTimeout(()=>{
                        dispatch('getCatalog');
                        return () => clearTimeout(timerTimeout);
                    },400)
                }
            }
            if (url === '/cart') {
                
                const { role } = context.init_state.profile;

                if ( role === ROLE.UNREGISTRED ) return (
                   dispatch('setModalState',{
                        show: true,
                        content: 'Чтобы полноценно воспользоваться всеми возможностями сотрудничества, необходимо пройти регистрацию',
                        iconImage: errorAlertIcon,
                        action: {
                        title: ['Зарегистрироваться', null]
                        },
                        onClick: () => redirectTo('/registration'),
                        closeModal: () => redirectTo('/authorization')
                    })
                )

                const { cart } = context.init_state.profile;

                let newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,                    
                    }
                }

                if ( !!cart ){

                    const resList = await orderApi.listOrderItem();
                    const resBalance = await api.getUserBalance({"currency": currency})
                    const resDataCart = await apiCart.getCartData();
    
    
    
                    let tempElement = true;
                    let amountTrueItem = 0;
                    const valueEnableAllSelectFromServer = resDataCart.cartitem_set.reduce((prev, cur, index, arr) => {
                        const allCount = arr.length;
                        if (tempElement === cur.selected) amountTrueItem++
                        if (allCount === amountTrueItem) return true;
                        return false
                    }, 0)
    
                    newContext = {
                        ...context,
                        "type": res.type,
                        "init_state": {
                            ...context.init_state,
                            ...res.init_state,
                            dataCart: {
                                ...context.init_state.dataCart,
                                cartitem_set: resDataCart.cartitem_set,
                                in_stock: resDataCart.in_stock,
                                ...resDataCart,
                                enableAllSelect: valueEnableAllSelectFromServer,
                                agreeWitheRegulations: false,
                                valueButtonNextToOrder: Text({text: 'go.to.registration'})
                            },                            
                            listCurrentOrder: {
                                ...context.init_state.listCurrentOrder,
                                count: resList.count,
                                results: resList.results,
                                ...resList,
                            },
                            profile:{
                                ...context.init_state.profile,
                                balance: resBalance.balance,
                                opt_minimum_price: resBalance.opt_minimum_price,
                                passive_balance: resBalance.passive_balance,
                                cart: resDataCart.in_cart
                            },
                            numberCurrentOrderForAddProduct: null
                        },
                    }
                    
    
                }else{
                    const timerTimeout = setTimeout(()=>{
                        dispatch('getCatalog');
                        return () => clearTimeout(timerTimeout);
                    },4000)
                }
                    dispatch('context', newContext)
            }
            if (url.includes('/catalog?')) {
                let params = {
                    page: 1,                
                }

                //?! необходимо при выборе категории добавлять результат в фильтр

                url.includes('is_closeout')? params = {...params, is_closeout: true}
                    : url.includes('is_in_stock')? params = {...params, is_in_stock: true}
                        : url.includes('is_new')? params = {...params, is_new: true}
                            : url.includes('is_bestseller')? params = {...params, is_bestseller: true}
                                : url.includes('is_closeout')? params = {...params, is_closeout: true}
                                    : url.includes('category')? params = {...params, categories: !!Number(url.split("=").pop())?[Number(url.split("=").pop())]:[]}
                                        : null

                // console.log({params})
                // console.log('!!Number("http://localhost:5000/catalog?category=16".split(" ").pop())? [] :', !!Number(url.split("=").pop())?[Number(url.split("=").pop())]:[])
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                        filters_params: { 
                            ...context.init_state.filters_params,
                            ...initValueCheckBoxFilters,
                            categories: [],
                            brands: [],
                            colors: [],
                            sizes: [],
                            type: [] 
                        },
                        numberCurrentOrderForAddProduct: null,
                    },
                }

                

                dispatch('context', newContext)
                return dispatch('getCatalog', params)
            }

            if (url.includes('/product-')) {           
                console.log('url')
                const productId = window.location.pathname.split('-')[1]; //res.init_state.page_info.id;
                const resProducts = await apiContent.getProduct(productId)
                const activeColor = getActiveColor(resProducts.colors)
                let newMedia = [];
                resProducts.product_sku.filter( el => el.color === activeColor? newMedia.push({
                    image: el.image,
                    image_thumb: el.image_thumb,
                    type: 'image',
                }) : null );

                newContext = {
                    ...newContext,
                    "type": res.type,
                    "init_state": {
                        ...newContext.init_state,
                        ...res.init_state,
                        productDetails: {
                            ...newContext.init_state.productDetails,
                            ...resProducts,                           
                            media: [newMedia[0], ...resProducts.media],
                        },
                        youAlredyWatch: {
                            results: []
                        },
                    },
                };            
                
                dispatch('context', newContext)
                
                // const timerTimeoutAddress = setTimeout(()=>{
                //     const params = {
                //         productId: res.init_state.page_info.id
                //     }                    
                //     dispatch('getProductDetails', params)
                //     return () => clearTimeout(timerTimeoutAddress);
                // },2500)
                
                return 
            }

            if (url === '/order') {
                const paramsAddress = {
                    page: 1
                }

            console.log('STORE CONTEXT IN ORDER = ', 
            {context}
            
            )         
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,  
                        // numberCurrentOrderForAddProduct: null,
                    }
                }
                

                dispatch('context', newContext);

                const timerTimeout = setTimeout(()=>{
                    dispatch('getDataCart')
                    return () => clearTimeout(timerTimeout);
                },200);               
                
                const timerTimeoutAddress = setTimeout(()=>{
                    dispatch('getAdresses', paramsAddress)
                    return () => clearTimeout(timerTimeoutAddress);
                },1500)
                
            }
            if (url === '/orders') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                
                dispatch('context', newContext)

                const timerTimeout = setTimeout(()=>{
                    dispatch('getOrders')
                    return ()=>clearTimeout(timerTimeout);
                },600)

            }

            if (url === '/profile') {
                
                const paramsAddress = {
                    page: 1
                }
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        order: {
                            ...context.init_state.order,
                            addressDilivery: {
                                ...context.init_state.order.addressDilivery,
                                count: 0,
                                results: [],
                                textSearch: '',
                                currentPage: 1,
                            },
                        },
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                console.log('newContext = ', res.init_state)
                
                dispatch('context', newContext)

                const timerTimeout = setTimeout(()=>{
                    dispatch('getAdresses',paramsAddress)
                    return ()=>clearTimeout(timerTimeout);
                },600)

            }  

            if (url.includes('/orders/2')) {
                const numberId = url.split('/').pop().split('-').pop()
                const dataOrderItems = await orderApi.getOrderItems({ order_id: numberId });
                console.log({dataOrderItems})
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        order: {
                            ...res.init_state.order,
                            fullNumberOrder: url.split('/').pop(),
                            dataOrderItems: dataOrderItems,
                        },
                        numberCurrentOrderForAddProduct: null,
                    },
                }
                // console.log('newContext = ', newContext)
                
                dispatch('context', newContext)
                dispatch('correspondence');    
               

            } 
            
            if (url === '/notifications') {
                

                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                console.log('newContext = ', res.init_state)
                
                dispatch('context', newContext)
                
                const timerTimeout = setTimeout(()=>{
                    dispatch('getNotice');
                    return ()=>clearTimeout(timerTimeout);
                },600)

            }             

            if (url === '/balance') {   
                const resBalance = await api.getUserBalance({"currency": currency});
                console.log({resBalance})
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        profile:{
                            ...context.init_state.profile,
                            ...res.init_state.profile,
                            balance: resBalance.balance,
                            opt_minimum_price: resBalance.opt_minimum_price,
                            passive_balance: resBalance.passive_balance
                        },                        
                        numberCurrentOrderForAddProduct: null,
                    },
                }
                
                dispatch('context', newContext)

                const timerTimeoutPayments = setTimeout(()=>{
                        dispatch('getPayments');
                    return ()=>clearTimeout(timerTimeoutPayments);
                },1200)

            } 

            if (url === '/my_reviews') {               

                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        numberCurrentOrderForAddProduct: null,
                        
                    },
                }
                

                dispatch('context', newContext)

                const timerTimeoutMyReviews = setTimeout(()=>{
                    dispatch('getMyReviewList');
                return ()=>clearTimeout(timerTimeoutMyReviews);
                },400)
                
            } 

        } catch (err) {
            console.log('ERROR CONTEXT PAGE', err)
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
}