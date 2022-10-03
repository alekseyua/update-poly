import api from '../../api/api';
import initData from '../../../public/content-page.json';
import { initValueCheckBoxFilters } from '../../helpers/initialValues/initialValues';
import { getCookie } from '../../helpers/helpers';
import { COOKIE_KEYS } from '../../const';


export const pageContent = store => {
    store.on('@init', () => ({ context: initData }));
    store.on('context', ({ context, countWishList }, data) => {
        const currency = getCookie(COOKIE_KEYS.CURRENCIES)
        // console.log({data})
        return { context: { 
            ...data, 
            "init_state": {
                ...data.init_state,
                currency: currency,
                countWishList: countWishList,
            }
        } }

    })
    store.on('getContextPage', async ({ context, valueCheckBoxFilters }, url, { dispatch }) => {

        try {
            //?! пока пользователь не зарегиный у него не все данные в таблице нужно учесть 

            console.log('******url store******', url)
            const res = await api.getPage({ url })
            // console.log('res new from url =', res.init_state)
            // console.log('res old from context = ', context)
            if (url === '/') {

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
                        "profile": res.init_state.profile,
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
                            "product_reviews": !!res.init_state.reviews.product_reviews.length ? [...res.init_state.reviews.product_reviews] : []
                        }
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/about') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
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
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
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
                        
                    },
                }
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/for_partners') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/juridical') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/delivery') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/exchange') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/payment') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }            
            if (url === '/how_to') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }            
            if (url === '/information') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }
            if (url === '/contacts') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                dispatch('setModalState', {
                    show: false,
                })
                return dispatch('context', newContext)
            }            
            if (url === '/reviews') {

                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        
                    },
                }
                // console.log('newContext = ', newContext)
                console.log('start get context reviews')
                dispatch('getReviewsContext');
                dispatch('setModalState', {
                    show: false,
                })
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
                        
                    },
                }

                dispatch('setModalState', {
                    show: false,
                })
                dispatch('context', newContext)
                return dispatch('getCatalog')
            }
            if (url === '/cart') {
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,
                        dataCart: {
                            cartitem_set: [],
                            in_stock: [],
                        },
                        listCurrentOrder: [],
                    },
                }
                dispatch('setModalState', {
                    show: false,
                })
                dispatch('context', newContext)
                const timerTimeout = setTimeout(()=>{
                    dispatch('getDataCart')
                    return () => clearTimeout(timerTimeout);
                },500)
                // dispatch('getYouAlreadyWatch');
                if(!!context.init_state.dataCart.cartitem_set.length){
                    const timerTimeout = setTimeout(()=>{
                        dispatch('getCatalog');
                        return () => clearTimeout(timerTimeout);
                    },4000)
                return
                }
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
                    },
                }

                dispatch('setModalState', {
                    show: false,
                })

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
                        }
                    },
                }

                const params = {
                    productId: res.init_state.page_info.id
                }
                
                dispatch('setModalState', {
                    show: false,
                })
                
                dispatch('context', newContext)
                return dispatch('getProductDetails', params)
            }

            if (url === '/order') {


            console.log('STORE CONTEXT IN ORDER = ', 
            {context}
            
            )         
                const newContext = {
                    ...context,
                    "type": res.type,
                    "init_state": {
                        ...context.init_state,
                        ...res.init_state,                        
                    }
                }
                dispatch('setModalState', {
                    show: false,
                })
                dispatch('context', newContext)
                const timerTimeout = setTimeout(()=>{
                    dispatch('getDataCart')
                    return ()=>clearTimeout(timerTimeout);
                },400)
            }
            

        } catch (err) {
            console.log('ERROR CONTEXT PAGE', err)
        }
    })
}