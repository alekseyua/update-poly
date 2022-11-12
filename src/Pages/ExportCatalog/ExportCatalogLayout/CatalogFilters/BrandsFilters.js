import React, { useState, useEffect } from 'react';
import CheckBox from '../../../../Views/CheckBox';
import CatalogViews from '../../../../Views/CatalogViews';

// const apiContent = api.contentApi;

const BrandsFilters = ({
  brands = [],
  values = { brands: [] },
  openBtnSubmit = false,
  setValues = () => { },
  role = { number: 2 },
}) => {
  const name = 'brands';

  const [sercheValue, setSercheValue] = useState('');
  const [brandsRender, setBrandsRender] = useState([]);
  const [sertificate, setSertificate] = useState(false);

  const updateRenderProiduct = (e) => {
    const value = e.target.value;
    if (value === '') {
      setSercheValue(value);
      return setBrandsRender(brands);
    };
    const newBrandsRender = brands.filter(el => el.title.toUpperCase().search(value.toUpperCase()) !== -1);
    setBrandsRender(newBrandsRender);
    setSercheValue(value);
  };

  const sercheHandler = (e) => {
    updateRenderProiduct(e);
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: [] });
    setSercheValue('');
  };

  useEffect(() => {
    setBrandsRender(brands);
  }, [brands]);

  const handlerChangeFilter = (e, id) => {
    if (e.tagName === 'SPAN') return;
    const value = !!e.checked;
    if (!Array.isArray(values.brands)) {
      values.brands = [...values.brands];
    }
    if (value) {
      const newValue = values.brands.filter((el) => el !== id);
      setValues({ ...values, [name]: newValue });
    } else {
      setValues({ ...values, [name]: [...values.brands, id] });
    }
    openBtnSubmit();
  }
  return (

    <React.Fragment>
      <CatalogViews.BrandsFilters
        setSertificate={setSertificate}
        sertificate={sertificate}
        resetFilter={resetFilter}
        sercheHandler={sercheHandler}
        sercheValue={sercheValue}
        role={role}
        is_visibleViewAll={brandsRender.length}
      >
        {brandsRender.map((el) => {
          const id = el.id;
          const checked = values.brands.includes(id);
          return (
            <CatalogViews.LayoutCheckBoxItem key={id}>
              <CheckBox
                checked={checked}
                name={name}
                key={id}
                data-cy={`brandFilters-${el.id}`}
                onChange={(e) => handlerChangeFilter(e, id)}
                variant="light"
                label={el.title}
              ></CheckBox>
            </CatalogViews.LayoutCheckBoxItem>
          );
        })}
      </CatalogViews.BrandsFilters>
    </React.Fragment>
  );
};

export default React.memo(BrandsFilters);
