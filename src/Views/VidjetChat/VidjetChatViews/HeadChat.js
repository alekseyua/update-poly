import React from 'react';
import { closeNoFill, chatIcon } from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';
import style from './styles/index.module.scss';

const HeadChat = ({ toggleOpenChats }) => {
  return (
    <div className={style['widget__chat-head']}>
      <h4 className={style['widget__chat-head-text']}>Вопрос-ответ</h4>
      <div className={style['widget__chat-head-buttons']}>
        <Button className={style['widget__chat-head-btn']} variant="text" size="sm" circle>
          <Icon src={chatIcon} className={style['widget__chat-head-icon']} width = { 20 } height = { 20 } />
        </Button>
        <Button
          onClick={toggleOpenChats}
          className={style['widget__chat-head-btn']}
          variant="text"
          size="sm"
          circle
        >
          <Icon src={closeNoFill} className={style['widget__chat-head-icon']} width = { 20 } height = { 20 } />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(HeadChat);
