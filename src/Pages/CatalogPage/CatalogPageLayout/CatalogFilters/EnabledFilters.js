import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Text from '../../../../helpers/Text';
import CatalogViews from '../../../../Views/CatalogViews'

const EnabledFilters = ({
  enabledFilterData,
  defaultFilterData,
  translateKey,
  resetContextFilter,
  translateItem,
  keyFilter,
}) => {
  const [ filtersElementShow, setFiltersElementShow ] = useState([])

  useEffect(()=>{

    let newArrayDataShow = [];
    const getInArray = (arrayDataShow)=> {
      for(let key in arrayDataShow){
        
        //?! костыльный способ вытянуть данные из нужного места но увы там бэк такой
        const arr = defaultFilterData[keyFilter === 'categories'? keyFilter = 'type' : keyFilter].filter(el=>el.id === arrayDataShow[key])
        newArrayDataShow.push(...arr);
      }
      setFiltersElementShow(newArrayDataShow)
    }

    const getInBoolean = (arrayDataShow) => {
      if (arrayDataShow){ 
        setFiltersElementShow([{
          title: Text({text: translateItem}),
          id: v4()
        }])
      }else{
        setFiltersElementShow([])
      }
    }
    
    typeof enabledFilterData[keyFilter] === 'object' ? getInArray(enabledFilterData[keyFilter]) : null;
    typeof enabledFilterData[keyFilter] === 'boolean' ? getInBoolean(enabledFilterData[keyFilter]) : null;

    typeof enabledFilterData[keyFilter] === 'boolean' && keyFilter === 'is_polish' ? getInBoolean(!enabledFilterData[keyFilter]) :  null;
    typeof enabledFilterData[keyFilter] === 'boolean' && keyFilter === 'is_import' ? getInBoolean(!enabledFilterData[keyFilter]) :  null;
  },[enabledFilterData])

  return (
    <>
      {
        !!filtersElementShow.length?
          filtersElementShow.map((el) => {
            const type = <Text text={translateKey} />;
            return (
              <React.Fragment key={el.id}>
                <CatalogViews.Tag
                onClick={() =>resetContextFilter(keyFilter, el.id)}
                title={el.title? el.title : ''}
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
