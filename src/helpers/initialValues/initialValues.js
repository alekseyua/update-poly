import { v4 } from "uuid";

export const initialValuesFirstStep = {
    lastname: '',
    firstname: '',
    patronymic: '',
    username: '',
    iAgreeDataProcessing: true,
};
export const initialValuesMiddleStep = {
    email: '',
    phone: '',
    password: '',
    whereDidYouHearAboutService: '',
    otherWhereDidHearAbout: '',
    receiveNewsletters: true,
};
const initialValuesLastStep = {
    companyName: '',
    inn: '',
    vk: '',
    instagram: '',
    facebook: '',
};
export const initialValuesRegistration = {
    lastname: 'a',
    firstname: 'a',
    patronymic: 'a',
    username: 'a1',
    iAgreeDataProcessing: false,
    email: 'alekseyuadnepr@gmail.com',
    phone: '',
    password: '',
    whereDidYouHearAboutService: '',
    otherWhereDidHearAbout: '',
    receiveNewsletters: false,
    companyName: '',
    inn: '',
    vk: '',
    instagram: '',
    other: '',
    error: '',
};
export const initialValuesSubmitCode = {
    submit_code: '',
    email: '',
    activeBtn: true,
}

export const initModalState = {
    show: false,
    action: null,
    // action = {
    //   title: ['ok', 'cancel']
    // },
    className: null,
    onClick: null,
    closeModal: null,
    onClickCancel: null,
    content: null,
    title: null,
    iconImage: null,
}

export const initCloseModalState = { 
        show: false,
        action: null,
        className: null,
        onClick: null,
        closeModal: null,
        onClickCancel: null,
        content: null,
        title: null,
        iconImage: null
};

export const initialValuesModalNewPassword = {
    password: '',
    confirm_password: '',
    email: '',
    key: ''
  }

export const initialFiltersMainReviewsLayout = [
    {
      id: v4(),
      title: 'О товаре',
      active: true,
    },
    {
      id: v4(),
      title: 'О сервисе',
      active: false,
    },
  ];

export const initReviews = {
    "service_reviews": [],
    "product_reviews": []
}

export const initialFetchFiltersReviews = {
    page: 1,
    page_size: 10,
    product__isnull: false,
    checkFilter: false,
    is_with_media: false,
    };

export const optionsSort = [
  {
    title: 'По дате публикации',
    value: 'created_at',
  },
  {
    title: 'По популярности',
    value: '-likes_count',
  },
  {
    title: 'По рейтингу автора',
    value: 'rating',
  },
];

export const FILTER_PARAMS = {
  is_in_stock: 'is_in_stock',
  is_bestseller: 'is_bestseller',
  is_new: 'is_new',
  is_closeout: 'is_closeout',
  is_not_range: 'is_not_range',
  is_in_collection: 'is_in_collection',
  sizes: 'sizes',
  colors: 'colors',
  categories: 'categories',
  category: 'category',
  brands: 'brands',
  page: 'page',
  page_size: 'page_size',
  is_import: 'is_import',
  is_polish: 'is_polish',
};

export const initValueCheckBoxFilters = {
  is_in_stock: false,
  is_new: false,
  is_bestseller: false,
  is_closeout: false,
  is_import: true,
  is_polish: true,
  is_in_collection: false,
  is_not_range: false,
  ordering: '',
  categories: [],
  brands: [],
  colors: [],
  sizes: [],
  type: [],
  page: 1,
  page_size: 30
}

export const initialValuesFilters = {
  categories: [],
  brands: [],
  colors: [],
  sizes: [],
  type: []
}

export const optionsFiltersCatalog = [
  { title: 'Сначала дешевые', value: 'price' },
  { title: 'Сначала дорогие', value: '-price' },
  { title: 'Популярные', value: '-created_at' },
];

export const reviewInitialState = {
  iAgreeDataProcessing: false,
  uploadFiles: [],
  content: '',
  stars: 0,
}

export const initialValuesOrder = {
  payment_methods: null,
  variant: null,
  needPassport: false,
  lastname: null,
  firstname: null,
  patronomic: null,
  serias_and_number_passport: null,
  issued_passport: null,
  issued_date: null,
  comment: null,
  agree_personal_data: true,
  waitForCall: false,
  selectedAdress: null,
  comment_order: null,
};

export const initialFiltersOrders = {
   page: 1, 
   page_size: 10
};