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

export const store = createStoreon([
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