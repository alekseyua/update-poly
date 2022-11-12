import React from 'react';
import style from './layoutDropDownMenuAccount.module.scss';

const LayoutDropDownMenuAccount = ({ children, stateOpen, openMenuRef }) => {

  return <div 
            className={style['wrapper']}
            ref={openMenuRef}
            name={'lk-menu'}
            style={{
              visibility: stateOpen? 'visible' : 'hidden'
            }}
          >
            {children}
          </div>;
};

export default React.memo(LayoutDropDownMenuAccount);
