import React from 'react';
import CheckBox from '../../../../Views/CheckBox';
import CatalogViews from '../../../../Views/CatalogViews';

const ColorsFilters = ({
  colors = [],
  values = { colors: [] },
  setValues = () => { },
  openBtnSubmit = () => { },
}) => {
  const name = 'colors';

  const resetFilter = (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: [] });
  }

  const handlerChangeFilter = (e, id) => {
    const value = e.checked;
    if (value === null) return;
    if (value) {
      if (!Array.isArray(values.colors)) {
        values.colors = [values.colors];
      }
      const newValue = values.colors.filter((el) => el !== id);
      setValues({ ...values, [name]: newValue });
    } else {
      setValues({ ...values, [name]: [...values.colors, id] });
    }
    openBtnSubmit();
  }

  return (
    <CatalogViews.ColorsFilters
      resetFilter={resetFilter}
    >
      {
        colors.map((el, i) => {
          const id = el.id;
          const checked = values.colors.includes(id)
          return (
            <CatalogViews.LayoutCheckBoxItem key={id}>
              <CheckBox
                key={id}
                checked={checked}
                name={name}
                id={id}
                data-cy={`colorFilters-${el.id}`}
                onChange={(e) => handlerChangeFilter(e, id)}
                colorField={el.color}
                variant="light"
                label={el.title}
              ></CheckBox>
            </CatalogViews.LayoutCheckBoxItem>
          );
        })
      }
    </CatalogViews.ColorsFilters>
  );
};

export default React.memo(ColorsFilters);
