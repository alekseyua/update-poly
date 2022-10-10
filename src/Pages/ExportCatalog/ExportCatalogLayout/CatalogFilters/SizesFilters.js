import React from 'react';
import CheckBox from '../../../../Views/CheckBox';
import CatalogViews from '../../../../Views/CatalogViews';

const SizesFilters = ({
  sizes = [],
  values = { sizes: [] },
  setValues = () => { },
  openBtnSubmit = () => { },
}) => {
  const name = `sizes`;

  const resetFilter = (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: [] });
  }

  const handlerChangeFilter = (e, id) => {
    const value = e.checked;
    if (value === null) return;
    if (value) {
      if (!Array.isArray(values.sizes)) {
        values.sizes = [values.sizes];
      }
      const newValue = values.sizes.filter((el) => el !== id);
      setValues({ ...values, [name]: newValue });
    } else {
      setValues({ ...values, [name]: [...values.sizes, id] });
    }
    openBtnSubmit();
  }

  return (
    <CatalogViews.SizesFilters
      resetFilter={resetFilter}
    >
      {sizes.map((el, i) => {
        const id = el.id;
        const checked = values.sizes.includes(id);
        return (
          <CatalogViews.LayoutCheckBoxItem key={id}>
            <CheckBox
              key={id}
              checked={checked}
              name={name}
              id={id}
              data-cy={`sizesCheckBox-${el.id}`}
              onChange={(e) => handlerChangeFilter(e, id)}
              variant="light"
              label={el.title}
            ></CheckBox>
          </CatalogViews.LayoutCheckBoxItem>
        );
      })}
    </CatalogViews.SizesFilters>
  );
};

export default React.memo(SizesFilters);
