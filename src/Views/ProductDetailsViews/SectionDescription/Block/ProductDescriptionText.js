import React from 'react';
import style from '../styles/sectiondescription.module.scss';

const ProductDescriptionText = ({ content }) => {

  return (
    <div className={style["productdescription__text"]}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default React.memo(ProductDescriptionText);
