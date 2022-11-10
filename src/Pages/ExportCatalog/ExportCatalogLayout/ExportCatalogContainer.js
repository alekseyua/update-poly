import React, { useEffect, useState } from "react";
import { useStoreon } from 'storeon/react';
import Text from "../../../helpers/Text";
import ExportCatalogLayout from "./ExportCatalogLayout";
import { deepSerche } from '../../../helpers/deepsearch';
import { initValueCheckBoxFilters, initialValuesFilters, optionsFiltersCatalog } from "../../../helpers/initialValues/initialValues";
import CatalogViews from "../../../Views/CatalogViews";



const ExportCatalogLayoutContainer = ({
  breadcrumbs,
  multy_choise_filters = [],
  filters_params = {},
  categories = [],
  title,
  role,
  content,
  exportCatalog,
  currentPage,
  products,
  currency,
}) => {

  const { dispatch } = useStoreon();
  const [showFilters, setShowFilters] = useState(false);
  const [offsetTopBtnSubmit, setOffsetTopBtnSubmit] = useState(0)
  const [valueProducts, setValueProducts] = useState(initialValuesFilters)
  const [isShowBtnSubmit, setIsShowBtnSubmit] = useState(false);
  const [filterParams, setFilterParams] = useState({ ...initValueCheckBoxFilters })

  const loadData = (data) => {
    dispatch('changeParamsFiltersPhoto', {
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
    dispatch('changeParamsFiltersPhoto', {
      valueCheckBoxFilters: { ...initValueCheckBoxFilters }
    })

  }

  const resetContextFilter = (key, id) =>{
    let value;
    if( typeof filterParams[key] === 'string' ) value = '';
    if( typeof filterParams[key] === 'boolean' ) value = !filterParams[key];
    // console.log('filterParams->key] = ', key, ' value : ', value)
    if( typeof filterParams[key] === 'object' ) value = filterParams[key].filter(el=>el !== id)

    dispatch('changeParamsFiltersPhoto', {
      valueCheckBoxFilters: { ...filterParams, [key]: value }
    })
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

  const onSelectedPhoto = (id) => {
    const params = {
      id: id
    }
    dispatch('selectPhoto', params);    
  }
  
  const downloadSelectPhoto = () => {
    dispatch('downloadSelectPhoto');
  }

  const selectedAllPhoto = (selected) => {
    const params = {
      selected: selected
    }
    dispatch('selectedAllPhoto', params);
  }

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
        type: [...categories]// просто идём на хитрость писало код куча прогеров и необоходимо было бы снова теребить бэкенщика т.к. данные не приходят
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

  
  const handlerChangePaginations = (page) => {
    const params = {
      ...filterParams,
      page: page
    }
    dispatch('getExportCatalog', params)
  }
  
  const showMore = () => dispatch('showMoreExportCatalog', {...filterParams})

  return (
    <>
    <ExportCatalogLayout
      breadcrumbs={breadcrumbs}
      title = { title }
      setShowFilters={setShowFilters}
      showFilters={showFilters}
      isShowBtnSubmit={isShowBtnSubmit}
      offsetTopBtnSubmit={offsetTopBtnSubmit}
      setOffsetTopBtnSubmit={setOffsetTopBtnSubmit}
    
      getTitleForDocument = { getTitleForDocument }
      valueProducts = { valueProducts }
      exportCatalog = { exportCatalog }
      filterParams = { filterParams }
      currency = { currency }
      content = { content }
      options = { optionsFiltersCatalog }
      role = { role }
      
      checkIsShowCategorysAndProducType={checkIsShowCategorysAndProducType}
      valueCheckBoxFilters={filterParams}
      resetContextFilter={resetContextFilter}
      resetAllFilters={resetAllFilters}
      openBtnSubmit={openBtnSubmit}
      currentPage = { currentPage }
      isFilters={isFilters}
      loadData={loadData}
      
      handlerChangePaginations = { handlerChangePaginations }
      downloadSelectPhoto = { downloadSelectPhoto }
      selectedAllPhoto = { selectedAllPhoto }
      onSelectedPhoto = { onSelectedPhoto }
      showMore = { showMore }
      />
      </>
  )
}

export default ExportCatalogLayoutContainer