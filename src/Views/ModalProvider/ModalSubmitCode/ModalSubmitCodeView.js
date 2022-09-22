import React, { useState } from 'react';
import Timer from '../../../helpers/timer';
import Button from '../../Button';
import ModalRestorePasswordDesc from './ModalRestorePasswordDesc';

import style from '../styles/restorePassword.module.scss';

const ModalSubmitCodeView = ({email, postKeyFromMail}) => {
  const [timerDone, setTimerDone] = useState(false);
  
  const handleTimerDone = () => {
    setTimerDone(true);
  };

  const handleClickGetNewSubmitCode = (email) => {
    setTimerDone(false);
    postKeyFromMail(email);
  };

  return (
    <div className={style['restore-password__submit-code']}>
      {timerDone ? (
        <>
          <ModalRestorePasswordDesc mb={'15px'}>
            Если Вы не получили код, попробуйте еще раз
          </ModalRestorePasswordDesc>
          <Button variant={'looksLikeLink'} onClick={()=>handleClickGetNewSubmitCode(email)}>
            Попробовать снова
          </Button>
        </>
      ) : (
        <ModalRestorePasswordDesc mb={'15px'}>
          Получить код повторно можно через:
          <Timer timeInSeconds={60} onTimerDone={handleTimerDone} />
        </ModalRestorePasswordDesc>
      )}
    </div>
  );
};

export default React.memo(ModalSubmitCodeView);
