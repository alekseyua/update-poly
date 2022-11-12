import React from 'react';
import Select from '../Select';
import Text from '../../helpers/Text';

import style from './styles/index.module.scss';

const SortSelect = ({ options = [], selectedSortFilters, valueOptionsSort }) => {
  // options значение в выпадающем списке
  return (
    <div className={style['catalog-sort']}>
      <Select
        variant={'select-theme__black'}
        value={valueOptionsSort}
        onClick={(e) => {
          const value = e.target.getAttribute('value');
          selectedSortFilters(value);
        }}
        options={options}
        placeholder={Text({text:'sort-...'})}
      ></Select>
    </div>
  );
};

export default React.memo(SortSelect);
