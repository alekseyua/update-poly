import React from 'react';
import BlockSpinner from '../../Views/SpinnerWrapper';

import style from './styles/index.module.scss'

const WrapperTable = ({ children, loading }) => {
  return (
      <div className={style['cabinet-orders']}>
        {children}
        {
          loading?
            <BlockSpinner.SpinnerWrapper 
              addClass = {'loadding'}
            >
              <BlockSpinner.SpinnerCenter>
                <BlockSpinner.Spinner sizeWidth='35' sizeHeight='35' />
              </BlockSpinner.SpinnerCenter>
            </BlockSpinner.SpinnerWrapper>
            : null
        }
      </div>
  )
};

export default React.memo(WrapperTable);
