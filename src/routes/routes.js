import CatalogPage from '../Pages/CatalogPage/CatalogPage';
import About from '../Pages/AboutPage/About';
import NoMatch from '../Pages/NoMatchPage/NoMatch';
import Home from '../Pages/HomePage/Home';
import NewsPage from '../Pages/NewsPage/NewsPage';
import NewsDetailsPage from '../Pages/NewsPage/NewsDetailsPage';
import { Authorization, Registration } from '../Pages/AuthRegPage';
import { PATHS } from '../const';
import Combine from '../Pages/Combine/Combine';
import PartnershipPage from '../Pages/PartnershipPage/PartnershipPage';
import InformationJuridical from '../Pages/JuridicalPage/InformationJuridical';
import InformationDelivery from '../Pages/DeliveryPage/InformationDelivery';
import InformationExchange from '../Pages/ExchangePage/InformationExchange';
import InformationPayments from '../Pages/PaymentPage/InformationPayments';
import InformationHowto from '../Pages/HowToPage/InformationHowto';
import Information from '../Pages/InformationPage/Information';
import InformationContacts from '../Pages/InformationContactsPage/InformationContacts';
import InformationReviews from '../Pages/InformationReviewsPage/InformationReviews';
import CartPage from '../Pages/CartPage/CartPage';
import OrderingPage from '../Pages/OrderingPage/OrderingPage';
import OrdersPage from '../Pages/LK/OrdersPage/OrdersPage';
import PersonalPage from '../Pages/LK/PersonalPage/PersonalPage';
import NotificationsPage from '../Pages/LK/NotificationsPage/NotificationsPage';
import ReviewsPersonalPage from '../Pages/LK/ReviewsPersonalPage/ReviewsPersonalPage';
import BalancePage from '../Pages/LK/BalancePage/BalancePage';
import WishPage from '../Pages/WishPage/WishPage';
import ExportCatalog from '../Pages/ExportCatalog/ExportCatalog';



module.exports = [
    {
        path: '/',
        component: Home,
        index: true,
        caseSensitive: true, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: false, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/catalog',
        index: false,
        component: CatalogPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/cart',
        index: false,
        component: CartPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/about',
        index: false,
        component: About,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/news',
        index: false,
        component: NewsPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/registration',
        index: false,
        component: Registration,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/authorization',
        index: false,
        component: Authorization,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/for_partners',
        index: false,
        component: PartnershipPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },    
    {
        path: '/juridical',
        index: false,
        component: InformationJuridical,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/delivery',
        index: false,
        component: InformationDelivery,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },    
    {
        path: '/exchange',
        index: false,
        component: InformationExchange,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },    
    {
        path: '/payment',
        index: false,
        component: InformationPayments,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },    
    {
        path: '/how_to',
        index: false,
        component: InformationHowto,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/information',
        index: false,
        component: Information,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/contacts',
        index: false,
        component: InformationContacts,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },    
    {
        path: '/reviews',
        index: false,
        component: InformationReviews,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/order',
        index: false,
        component: OrderingPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/orders',
        index: false,
        component: OrdersPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/profile',
        index: false,
        component: PersonalPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/notifications',
        index: false,
        component: NotificationsPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/balance',
        index: false,
        component: BalancePage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/wishlist',
        index: false,
        component: WishPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/my_reviews',
        index: false,
        component: ReviewsPersonalPage,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },    
    {
        path: '/catalog_export',
        index: false,
        component: ExportCatalog,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    },
    {
        path: '/*',
        index: false,
        component: Combine,
        caseSensitive: false, // Optional. Should be `true` if the static portions of the `path` should be matched in the same case.
        fetchInitialData: PATHS.ALL.fetchInitialData,
        end: true, // Optional. Should be `true` if this pattern should match the entire URL pathname
    }

    
];