import React, { useEffect, useState } from "react";
import { useStoreon } from 'storeon/react';
import Text from "../../../helpers/Text";
import CatalogPageLayout from "./CatalogPageLayout";
import { deepSerche } from '../../../helpers/deepsearch';
import { initValueCheckBoxFilters, initialValuesFilters, optionsFiltersCatalog } from "../../../helpers/initialValues/initialValues";
import CatalogViews from "../../../Views/CatalogViews";



const CatalogPageLayoutContainer = ({
  multy_choise_filters = [],
  filters_params = {},
  dataProducts,
  breadcrumbs,
  categories = [],
  products,
  currency,
  content,
  role,
}) => {

  const { dispatch } = useStoreon();
  const [showFilters, setShowFilters] = useState(false);
  const [offsetTopBtnSubmit, setOffsetTopBtnSubmit] = useState(0)
  const [valueProducts, setValueProducts] = useState(initialValuesFilters)
  const [isShowBtnSubmit, setIsShowBtnSubmit] = useState(false);
  const [filterParams, setFilterParams] = useState({ ...initValueCheckBoxFilters })

  const loadData = (data) => {
    dispatch('changeParamsFilters', {
      valueCheckBoxFilters: { ...filterParams, ...data }
    })
  }

  const openBtnSubmit = (e) => {
    setIsShowBtnSubmit(true)
  }

  useEffect(() => {
    const eventDocument = (e) => {

      if (e.target.getAttribute('name') === 'apply' || e.target.getAttribute('datanoclick') === 'noClick') setIsShowBtnSubmit(false);
      setOffsetTopBtnSubmit(e.y)
    };
    document.addEventListener('click', eventDocument);
    return () => document.removeEventListener('click', eventDocument);
    
  }, [])

  const getTitleForDocument = (filterParams) => {
    const { category = false } = filterParams;
    if (!category) return <Text text={'catalog'} />;
    return deepSerche(Number(category), categories);
  };

  const resetAllFilters = (e) => {
    e.preventDefault();
    dispatch('changeParamsFilters', {
      valueCheckBoxFilters: { ...initValueCheckBoxFilters }
    })

  }

  const resetContextFilter = (key, id) =>{
    let value;
    if( typeof filterParams[key] === 'string' ) value = '';
    if( typeof filterParams[key] === 'boolean' ) value = !filterParams[key];
    // console.log('filterParams->key] = ', key, ' value : ', value)
    if( typeof filterParams[key] === 'object' ) value = filterParams[key].filter(el=>el !== id)

    dispatch('changeParamsFilters', {
      valueCheckBoxFilters: { ...filterParams, [key]: value }
    })
  }
  const handlerChangePaginations = (page) => {
    console.log({page})
    const params = {
      page: page
    }
    dispatch('getCatalog', params)
  }

  const showMore = () => {
    dispatch('showMoreCatalog')
  }

  const checkIsShowCategorysAndProducType = () => {
    //?! необходимо узнать при каких условиях будет работать
    // const queryStrin = qs.parse(location.search);
    // if (queryStrin?.category?.length) {
    //   return false;
    // } else {
    return true;
    // }
  };

  const isFilters = (filtersValues, resetAllFilters) => {
// is_import: true
// is_polish: true
    const {
      categories = [],
      brands = [],
      colors = [],
      sizes = [],
      is_bestseller,
      is_closeout,
      is_in_stock,
      is_new,
      is_not_range,
      is_in_collection,
      ordering,
      type,
    } = filtersValues;

    if (
      !!categories.length ||
      !!brands.length ||
      !!colors.length ||
      !!sizes.length ||
      !!type.length ||
      !!is_bestseller ||
      !!is_closeout ||
      !!is_in_stock ||
      !!is_new ||
      !!is_not_range ||
      !!is_in_collection ||
      !!ordering.length
    ) {
      const title = <Text text={'clear.all'} />;
      return (
        <CatalogViews.ClearAllFilters
          onClick={resetAllFilters}
          title={title}
          isLabel={false}
        />
      );
    } else {
      return null;
    }
  };

  //!hide button submit кнопка применения фильтрации
  useEffect(() => {
    let timeOutHideBtnSubmit = setTimeout(() => {
      setIsShowBtnSubmit(false);
      clearTimeout(timeOutHideBtnSubmit);
    }, 7000);
    return () => {
      clearTimeout(timeOutHideBtnSubmit);
    };
  }, [isShowBtnSubmit]);

  useEffect(() => {
    !!Object.keys(multy_choise_filters).length ?
      setValueProducts(c => ({
        ...c,
        categories: [...categories],
        brands: [...multy_choise_filters.by_brand],
        colors: [...multy_choise_filters.by_color],
        sizes: [...multy_choise_filters.by_size],
        type: [...multy_choise_filters.by_type]
      }))
      : null
  }, [multy_choise_filters])

  useEffect(() => {
    !!Object.keys(filters_params).length ?
      (
        setFilterParams(c => ({
          ...c,
          ...filters_params
        }))
      ) : null
  }, [filters_params])


  return (
    <CatalogPageLayout
      breadcrumbs={breadcrumbs}
      setShowFilters={setShowFilters}
      showFilters={showFilters}
      isShowBtnSubmit={isShowBtnSubmit}
      offsetTopBtnSubmit={offsetTopBtnSubmit}
      setOffsetTopBtnSubmit={setOffsetTopBtnSubmit}

      content={content}
      getTitleForDocument = { getTitleForDocument }
      valueProducts = { valueProducts }
      dataProducts = { dataProducts }
      filterParams = { filterParams }
      currency = { currency }
      options = { optionsFiltersCatalog }
      role = { role }

      isFilters={isFilters}
      loadData={loadData}
      showMore = { showMore }
      openBtnSubmit={openBtnSubmit}
      resetContextFilter={resetContextFilter}
      valueCheckBoxFilters={filterParams}
      resetAllFilters={resetAllFilters}
      checkIsShowCategorysAndProducType={checkIsShowCategorysAndProducType}
      handlerChangePaginations = { handlerChangePaginations }

    />
  )
}

export default CatalogPageLayoutContainer;