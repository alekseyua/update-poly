import React from 'react';
import TradingPlatformLayout from './TradingPlatformLayout';

const TradingPlatform = ({ first_screen = {}, page_type_catalog, front_admin = null, goToCatalog }) => {
  return <TradingPlatformLayout 
          first_screen={first_screen} 
          page_type_catalog={page_type_catalog}
          front_admin={front_admin}
          goToCatalog={goToCatalog} 
        />;
};

export default React.memo(TradingPlatform);
