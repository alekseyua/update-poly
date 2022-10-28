import React from 'react';
import TradingPlatformLayout from './TradingPlatformLayout';

const TradingPlatform = ({ first_screen = {}, page_type_catalog, front_admin = null, goToCatalog, main_title_video }) => {
  return <TradingPlatformLayout 
          first_screen={first_screen} 
          page_type_catalog={page_type_catalog}
          front_admin={front_admin}
          goToCatalog={goToCatalog} 
          main_title_video = { main_title_video }
        />;
};

export default React.memo(TradingPlatform);
