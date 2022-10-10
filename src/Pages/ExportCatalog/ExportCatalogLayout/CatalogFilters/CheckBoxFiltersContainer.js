import React, { useState, useEffect } from 'react';
import { FILTER_PARAMS } from '../../../../helpers/initialValues/initialValues';
import CatalogViews from '../../../../Views/CatalogViews';

const CheckBoxFiltersContainer = ({
  role = { number: 2 },
  valueCheckBoxFilters,
  loadData,
}) => {

  const handleChangeFilters = (e) => {
    const value = e.checked;
    const key = e.name
    if (e.checked === null) return;
    let data = {
      ...valueCheckBoxFilters,
      [key]: !value
    }
    console.log('data test = ', data)
    loadData(data)
  };

   
  return (
    <CatalogViews.CheckBoxFilters
      valueCheckBoxFilters={valueCheckBoxFilters}
      handleChangeFilters={handleChangeFilters}
      role={role}
    />
  );
};

export default React.memo(CheckBoxFiltersContainer);
