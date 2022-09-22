import React, { useState } from 'react';
import classNames from 'classnames';
import Text from '../../helpers/Text';
import Button from '../Button';

import style from './styles/index.module.scss';

const ColorsFilters = ({ children, resetFilter }) => {
  const [viewAll, setViewAll] = useState(false);
  return (
    <div className={style['catfilter-block']}>
      <div className={style['catfilter-block__heading']}>
        <Text text={'color'} />
      </div>
      <div className={style['catfilter-block__content']}>
        <div
          className={classNames({
            [style['catfilter-scroll']]: true,
            [style['active']]: viewAll,
          })}
        >
          {children}
        </div>
      </div>
      <div className={style['catfilter-block__bottom']}>
        <Button
          data-cy={`catfilterColorsButton`}
          onClick={(e) => {
            e.preventDefault();
            setViewAll(!viewAll);
          }}
          datanoClick={'noClick'}
          variant="text"
          className={style['catfilter-block__toggle']}
        >
          <Text text={viewAll ? 'hide' : 'views.all'} />
        </Button>

        <Button
          onClick={resetFilter}
          data-noClick={'noClick'}
          variant="text"
          className={style['catfilter-block__reset']}
          data-cy={`catfilterBrandsButtonReset`}
        >
          <Text text={'reset'} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ColorsFilters);
