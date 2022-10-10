import React from 'react';
import Text from '../../../../helpers/Text';
import CatalogViews from '../../../../Views/CatalogViews';

const EnabledFiltersOptions = ({

  enabledFilterData,
  defaultFilterData,
  translateKey,
  resetContextFilter,
  keyFilter,

}) => {

  const type = <Text text={translateKey} />;
  const valueOption = defaultFilterData.filter(el=> el.value === enabledFilterData[keyFilter]? el.title : null)

  return (
    <React.Fragment>
    {
      keyFilter === 'ordering' && Array.isArray(valueOption) && !!valueOption.length ? 
         <CatalogViews.Tag
          onClick={() => {
            resetContextFilter(keyFilter);
          }}
          title={valueOption[0].title}
          filterType={type}
        />
        : null
    }
      </React.Fragment>
  );
};

export default React.memo(EnabledFiltersOptions);
