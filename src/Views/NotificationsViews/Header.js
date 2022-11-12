import React from 'react';
import { garbageIcon } from '../../images';
import CheckBox from '../CheckBox';
import Button from '../Button';
import Icon from '../Icon';

import style from './styles/index.module.scss';

const Header = ({ 
  heandlerReedNotic,
  heandlerDelNotic,
  heandlerCheckAllNotice,
  stateActiveCheckNotice,
}) => {

  return (
    <div className={style["cabinet-notifications__head"]}>
      <CheckBox 
        onChange={(e) => { 
          heandlerCheckAllNotice(e) }
        }
        variant="input"
        label={'Выделить все'}
        checked={stateActiveCheckNotice}
      />
      <Button
        onClick={heandlerReedNotic}
        variant="text"
        size="med"
        className={style["cabinet-notifications__mark"]}
      >
        Пометить как прочитанные
      </Button>
      <Button
        onClick={heandlerDelNotic}
        variant="text"
        size="med"
        className={style["cabinet-notifications__delete"]}
      >
        <Icon slot="icon-left" src={garbageIcon} height={20} width={20}/>
        Удалить
      </Button>
    </div>
  );
};

export default React.memo(Header);
