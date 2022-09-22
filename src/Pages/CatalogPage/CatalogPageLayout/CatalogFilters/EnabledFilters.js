import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Text from '../../../../helpers/Text';
import CatalogViews from '../../../../Views/CatalogViews'

const EnabledFilters = ({
  enabledFilterData,
  defaultFilterData,
  translateKey,
  resetContextFilter,
  keyFilter,
}) => {
  const [ filtersElementShow, setFiltersElementShow ] = useState([])

  const type = <Text text={translateKey} />;

  useEffect(()=>{
    let arrayDataShow = [];
    let newArrayDataShow = [];
    const getInArray = (arrayDataShow)=> {
      for(let key in arrayDataShow){
        const arr = defaultFilterData[keyFilter].filter(el=>el.id === arrayDataShow[key])
        newArrayDataShow.push(...arr);
      }
      setFiltersElementShow(newArrayDataShow)
    }

    const getInBoolean = (arrayDataShow) => {
      console.log('arrayDataShow = ', arrayDataShow)
      if (arrayDataShow) setFiltersElementShow([{
        title: Text({text: translateKey}),
        id: v4()
      }])else{
        setFiltersElementShow([])
      }
    }

 
    typeof enabledFilterData[keyFilter] === 'object' ? getInArray(enabledFilterData[keyFilter]) : null;
    typeof enabledFilterData[keyFilter] === 'boolean' ? getInBoolean(enabledFilterData[keyFilter]) : null; //

     console.log('keyFilter = ', keyFilter)
    console.log('defaultFilterData[keyFilter] = ', defaultFilterData[keyFilter])
 
  },[enabledFilterData])

  // console.log({filtersElementShow})
  return (
    <>
      {
        !!filtersElementShow.length?
        filtersElementShow.map((el) => {
          const type = <Text text={translateKey} />;
          console.log({el})
          return (
            <React.Fragment key={el.id}>
              <CatalogViews.Tag
              onClick={() =>resetContextFilter(keyFilter, el.id)}
              title={el.title}
              filterType={type}
            />
            </React.Fragment>
          )
        })
        : null
      } 
    </>
  );
};

export default React.memo(EnabledFilters);
