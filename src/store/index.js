import { createStoreon } from 'storeon';

import { search } from './search';
import { pageContent } from './pageContent';
import { registration } from './registrationAndAuth/registration';
import { authorization } from './registrationAndAuth/authorization';
import { modalStorage } from './modalStorage/modalStorage';
import { restorePassword } from './registrationAndAuth/restorePassword';
import { navigator } from './navigator/navigator';
import { reviews } from './revievs/reviews';
import { news } from './news/news';
import { partnership } from './partnership/partnership';
import { catalog } from './catalog/catalog';
import { wishList } from './wishList/wishlist';
import { quickViewProduct } from './quickViewProduct/quickViewProduct';
import { collections } from './collections/collections';
import { ProductDetails } from './productDetails/productDetails';
import { cart } from './cart/cart';

export const store = createStoreon([
    cart,
    ProductDetails,
    collections,
    quickViewProduct,
    wishList,
    partnership,
    news,
    reviews,
    navigator,
    modalStorage,
    search,
    pageContent,
    registration,
    authorization,
    restorePassword,
    catalog,
]);