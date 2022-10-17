import api from '../../api/api';
import initData from '../../../public/content-page.json';
import { initValueCheckBoxFilters } from '../../helpers/initialValues/initialValues';
import { getCookie } from '../../helpers/helpers';
import { COOKIE_KEYS, ROLE } from '../../const';
import Text from '../../helpers/Text';
import { errorAlertIcon } from '../../images';


export const pageContent = store => {
    const orderApi = api.orderApi;
    const apiCart = api.cartApi

    store.on('@init', () => ({ context: initData }));

    store.on('context', ({ context, countWishList, page }, data) => {
         console.log({page})
    const currency = getCookie(COOKIE_KEYS.CURRENCIES)

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

    store.on('getContextPage', async ({ context, valueCheckBoxFilters }, obj, { dispatch }) => {
        const currency = getCookie(COOKIE_KEYS.CURRENCIES)

        try {
            const { url, redirectTo } = obj;
            //?! пока пользователь не зарегиный у него не все данные в таблице нужно учесть 

            console.log('******url store******', {url}, {a: redirectTo} )
            const res = await api.getPage({ url })
            dispatch('setModalState', {
                show: false,
            })
            // console.log('res new from url =', res.init_state)
            // console.log('res old from context = ', context)
            if (url === '/') {
                window.scrollTo(0,0)
                const filters = res.init_state.main_page.first_screen.filters;
                const in_stock_product_filters = res.init_state.main_page.in_stock_product_filters;
                const page_info = res.init_state.page_info;

                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        "announce": res.init_state.announce,
                        "breadcrumbs" : res.init_state.breadcrumbs,
                        "banners": !!res.init_state.banners.length ? res.init_state.banners : [],
                        "profile": {
                            ...context.init_state.profile,
                            ...res.init_state.profile
                        },
                        "products": !!res.init_state.products.length ? res.init_state.products : [],
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
                        numberCurrentOrderForAddProduct: null
                    },
                }
                // console.log('newContext = ', newContext)
                
                dispatch('context', newContext)

                const paramsInstock = {
                    page: 1,
                    page_size: 12,
                    is_in_stock: true,
                    categories: res.init_state.main_page.in_stock_product_filters[0].id
                }
                const timerTimeout = setTimeout(()=>{
                    dispatch('getCatalog',paramsInstock)
                    return ()=>clearTimeout(timerTimeout);
                },600)
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
                
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                        "news": [],
                        numberCurrentOrderForAddProduct: null,
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
                dispatch('context', newContext)
                
                return dispatch('getCatalog')
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
                                valueButtonNextToOrder: <Text text={'go.to.registration'} />
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

                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        productDetails: {
                            in_cart_count: null,
                            in_stock_count: null,
                            is_bestseller: false,
                            is_closeout: false,
                            is_in_stock: false,
                            id: res.init_state.page_info.id,
                            product_rc: '',
                            minimum_rc: null,
                            is_new: false,
                            prices: {},
                            colors: [],
                            sizes: [],
                            media: [],
                            brand: '',
                            title: res.init_state.page_info.title,
                            collections: [],
                            is_collection: false,
                        },
                        youAlredyWatch: {
                            results: []
                        },
                        numberCurrentOrderForAddProduct: null,
                    },
                };            
                
                dispatch('context', newContext)
                
                const timerTimeoutAddress = setTimeout(()=>{
                    const params = {
                        productId: res.init_state.page_info.id
                    }                    
                    dispatch('getProductDetails', params)
                    return () => clearTimeout(timerTimeoutAddress);
                },2500)
                
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
                
                const initialValues = {
                    // lastname: user.last_name,
                    // firstname: user.first_name,
                    // patronymic: user.middle_name,
                    // phone: user.phone,
                    // email: user.email,
                    // receiveNewsletters: profile.receive_newsletter,
                    // inn: organization?.inn,
                    // companyName: organization?.organization,
                    // addresSite: links.site_link,
                    // vk: links.vk_link,
                    // instagram: links.insta_link,
                    // otherSocialLink: links.other_link,
                  };


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
                    dispatch('getAdresses',paramsAddress)
                    return ()=>clearTimeout(timerTimeout);
                },600)

            }  

            if (url.includes('/orders/2')) {
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

                const timerTimeoutBalance = setTimeout(()=>{
                        dispatch('getBalace');
                    return ()=>clearTimeout(timerTimeoutBalance);
                },400)

                const timerTimeoutPayments = setTimeout(()=>{
                        dispatch('getPayments');
                    return ()=>clearTimeout(timerTimeoutPayments);
                },800)

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
        }
    })
}