import React from 'react';
import Text from '../../helpers/Text';
import ButtonToCatalog from './ButtonToCatalog';

import style from './styles/index.module.scss'

const InfoReview = ({ hideReviewBlock, addReview,page_type_catalog, }) => {
  return (
    <div className={style["cabinet-info-review"]}>
      <div className={style["cabinet-info-review__heading"]}>
        <Text text={'dont.buy.something'} />
      </div>
      <div className={style["cabinet-info-review__text"]}>
        <Text text={'can.start.now'} />
      </div>
      <div className={style["cabinet-info-review__btns"]}>
        <ButtonToCatalog to={page_type_catalog}>
          <Text text={'make.order'} />
        </ButtonToCatalog>
      </div>
    </div>
  );
};

export default React.memo(InfoReview);
