import React from 'react';
import { btnDownNoFill } from '../../../../images';
import CheckBox from '../../../../Views/CheckBox';
import Button from '../../../../Views/Button';
import Icon from '../../../../Views/Icon';
import Text from '../../../../helpers/Text';

import style from '../styles/catalog.module.scss';

const SelectedAndDownload = ({
  selectedAllPhoto,
  selected_all,
  downloadSelectPhoto,
  enabledBtn,
}) => {

  return (
    <div className={style['export__select-wrapper']}>
      <CheckBox
        checked={selected_all}
        onChange = {(e) => {
          selectedAllPhoto(e.checked);
          return false;
        }}
        label="Выделить все"
      />
      <div className={style['export__select-btn']}>
        <Button
          type={'button'}
          variant = { 'black_btn_full_width-modal' }
          enabled={enabledBtn}
          onClick={downloadSelectPhoto}
        >
          <Icon iconLeft src={btnDownNoFill} className={style['export__select-btn-icon']} />
          <Text text="download.selected" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SelectedAndDownload);
