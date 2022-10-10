import React from 'react';
import CheckBox from '../../../../Views/CheckBox';

import style from '../styles/catalog.module.scss';

const CardExportCatalog = ({ 
    id,
    thumb, 
    selected, 

    onSelectedPhoto, 
}) => {
  return (
    <div className={style['export-card']}>
      <img src={thumb} alt="Photo" className={style['export-card__image']} />
      <div className={style['export-card__checkbox']}>
        <CheckBox
          checked={selected}
          onChange={(e) => {
            onSelectedPhoto(id, e.checked);
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(CardExportCatalog);
