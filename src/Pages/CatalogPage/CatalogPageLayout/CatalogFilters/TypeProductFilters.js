import React, { useState, useEffect } from 'react';
import CheckBox from '../../../../Views/CheckBox';
import CatalogViews from '../../../../Views/CatalogViews';

const TypeProductFilters = ({
  categories = [],
  values = { categories: [] },
  setValues = () => { },
  openBtnSubmit = () => { },
}) => {
  const name = `categories`;

  const [sercheValue, setSercheValue] = useState('');
  const [renderTypeProductCheckBox, setRenderTypeProductCheckBox] = useState([]);

  const updateRenderProiduct = (e) => {
    const value = e.target.value;
    if (value === '') {
      setSercheValue(value);
      return setRenderTypeProductCheckBox(categories);
    };
    const newRenderTypeProductCheckBox = categories.filter(el => el.title.toUpperCase().search(value.toUpperCase()) !== -1);
    setRenderTypeProductCheckBox(newRenderTypeProductCheckBox);
    setSercheValue(value);
  };

  const sercheTypeProduct = (e) => {
    updateRenderProiduct(e);
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: [] });
    setSercheValue('');
  };

  useEffect(() => {
    setRenderTypeProductCheckBox(recursParseCategory(categories));
  }, [categories]);

  const recursParseCategory = (data = []) => {
    let listcategories = [];
    const getListCategoryData = (category) => {
      if (category.children?.length) {
        listcategories.push(category);
        category.children.forEach((categoryChild) => {
          getListCategoryData(categoryChild);
        });
      } else {
        listcategories.push(category);
      }
    };

    if (!Array.isArray(data)) {
      data = data.results;
    }
    data.forEach((category) => {
      getListCategoryData(category);
    });
    return listcategories;
  };

  const handlerChangeFilter = (e, id) => {
    const value = e.checked;
    if (value === null) return;
    if (value) {
      if (!Array.isArray(values.categories)) {
        values.categories = [values.categories];
      }
      const newValue = values.categories.filter((el) => el !== id);
      setValues({ ...values, [name]: newValue });
    } else {
      setValues({ ...values, [name]: [...values.categories, id] });
    }
    openBtnSubmit();
  }


  return (
    <CatalogViews.TypeProductFilters
      sercheValue={sercheValue}
      sercheTypeProduct={sercheTypeProduct}
      resetFilter={resetFilter}
      is_visibleViewAll={renderTypeProductCheckBox.length}
    >
      {renderTypeProductCheckBox.map((el, i) => {
        const id = el.id;
        const checked = values.categories.includes(id);

        return (
          <CatalogViews.LayoutCheckBoxItem key={id}>
            <CheckBox
              checked={checked}
              name={name}
              key={id}
              onChange={(e) => handlerChangeFilter(e, id)}
              variant="light"
              label={el.title}
              data-cy={`categoriesCheckBox-${el.id}`}
            ></CheckBox>
            <CatalogViews.CountItemsCheckBox>{el.count ?? 0}</CatalogViews.CountItemsCheckBox>
          </CatalogViews.LayoutCheckBoxItem>
        );
      })}
    </CatalogViews.TypeProductFilters>
  );
};

export default React.memo(TypeProductFilters);
