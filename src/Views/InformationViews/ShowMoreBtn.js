import React from 'react';
import Button from '../Button';
import Text from '../../helpers/Text';

import style from './styles/index.module.scss';

const ShowMoreBtn = ({ onClick, allCount = 30, currentCount = 10 }) => {
  return (
    <div className={style['show-more']}>
      <Button onClick={onClick} gxVariant="text" variant={'show_more-default'}>
        {
          Text({text: 'show.more'})
        }
      </Button>
      <span className={style['show-more-counter']}>
       {Text({text: 'shown'})} ' ' {currentCount} ' ' {Text({text: 'from'})} ' ' {allCount}

       {/* показано {currentCount} из {allCount} */}
      </span>
    </div>
  );
};

export default React.memo(ShowMoreBtn);
