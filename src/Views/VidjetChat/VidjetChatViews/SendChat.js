import React from 'react';
import { paperclip, send } from '../../../images';
import classNames from 'classnames';

import style from './styles/index.module.scss';
import Input from '../../Input';
import Button from '../../Button';
import Icon from '../../Icon';

const SendChat = ({

}) => {
  
  return (
    <div className={style['widget__chat_send']}>
      <div className={style['widget__chat_send_form']}>
        <Input
          className={style['widget__chat_send_input']}
          placeholder="Написать сообщение..."
        ></Input>
        <Button
          size="sm"
          className={classNames({
            [style['widget__chat_send_sendbtn']]: true,
            [style['widget__chat_send_btn']]: true,
          })}
        >
          <Icon src={paperclip} />
        </Button>
        <Button
          size="sm"
          className={classNames({
            [style['widget__chat_send_sendbtn']]: true,
            [style['widget__chat_send_btn']]: true,
          })}
        >
          <Icon src={send} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SendChat);
