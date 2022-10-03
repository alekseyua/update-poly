import React, { useEffect, useState } from 'react';
import Grid from '../../Views/GridContainerBlock';
import Spinner from '../../Views/SpinnerWrapper/Spinner';
import About from '../AboutPage/About';
import { Authorization, Registration } from '../AuthRegPage';
import CartPage from '../CartPage/CartPage';
import CatalogPage from '../CatalogPage/CatalogPage';
import InformationDelivery from '../DeliveryPage/InformationDelivery';
import InformationExchange from '../ExchangePage/InformationExchange';
import Home from '../HomePage/Home';
import InformationHowto from '../HowToPage/InformationHowto';
import InformationContacts from '../InformationContactsPage/InformationContacts';
import Information from '../InformationPage/Information';
import InformationReviews from '../InformationReviewsPage/InformationReviews';
import InformationJuridical from '../JuridicalPage/InformationJuridical';
import LoadingPage from '../LoadingPage';
import NewsDetailsPage from '../NewsPage/NewsDetailsPage';
import NewsPage from '../NewsPage/NewsPage';
import OrderingPage from '../OrderingPage/OrderingPage';
import PartnershipPage from '../PartnershipPage/PartnershipPage';
import InformationPayments from '../PaymentPage/InformationPayments';
import ProductDetails from '../ProductDetailsPage';



const Combine = ({...props}) => {
    const [ dataContext, setDataContext ] = useState(null);//init_state
    const PAGE_TYPES = {
        'loading-page': LoadingPage,
        1 :  Home,              //?! главная страница
        5 : CatalogPage,            //?! основной каталог
        23 : About,             //?! страница о компании
        26 : NewsPage,          //?! страница с новостями
        27 : NewsDetailsPage,   //?! страница деталки новости
        6 : Authorization,      //?! страница с авторизацией
        7 : Registration,       //?! страница регистрации
        28 : PartnershipPage,   //?! страница Партнерам
        19: InformationJuridical, //? страница с информацией по юр инфе
        17: InformationDelivery, //? страница с информацией по доставке
        18: InformationExchange, //? страница с информацией по замене
        16: InformationPayments, //? страница с информацией по оплате
        21: InformationHowto, //? страница с информацией по подбору размера
        2: Information, //? страница информации
        20: InformationContacts, //? страница с информацией по контактам
        22: InformationReviews, //? страница с информацией по отзывам
        4: ProductDetails, //? детальная страница продукта http://localhost:3000/product-181-shapkaia-pukhovaia-1
        9: CartPage, //?корзина http://localhost:3000/cart
        11: OrderingPage, //? страница Оформление заказа


    
    }


    useEffect(()=>{
        setDataContext(c=>({            
            ...c,
            init_state: props.context
        }))
    },[props.context])
    
    useEffect( async ()=>{
        const data = await props.fetchInitialData({url: props.url})
        setDataContext(c=>({            
            ...c,
            type: data.type,
            init_state: {...c.init_state, ...data.init_state}
        }))
    },[props.url])

    const Page = PAGE_TYPES[dataContext?.type];
    const DevPage = PAGE_TYPES['loading-page']
    // console.log('PAGE = ', !!Page)
    return (<>
        {
            !!Page? <Page context={dataContext.init_state} /> : <Grid.WrapperBlock>
                <Grid.BlockCenter>            
                    <Spinner size={'80'} />
                </Grid.BlockCenter>
            </Grid.WrapperBlock>
        }
    </>)
}

export default Combine;