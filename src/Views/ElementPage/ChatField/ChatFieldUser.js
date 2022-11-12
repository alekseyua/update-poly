import React from 'react';
import classNames from 'classnames';


import style from './styles/index.module.scss';
import dayjs from '../../../helpers/dayjs';
import api from '../../../api/api';

const ChatFieldUser = ({
  user = 'admin',
  created_at = 'date',
  message = 'messenge',
  videos = [],
  images = [],
  openModalImage,
  openModalVideo,
}) => {
  return (
    <div
      className={classNames({
        [style['cabinet-orders-details__chat-message']]: true,
        [style['cabinet-orders-details__chat-message-user']]: true,
      })}
    >
      <div className={style['cabinet-orders-details__chat-message-wrapper']}>
        <div className={style['cabinet-orders-details__chat-message-name']}>{user}</div>
        <div className={style['cabinet-orders-details__chat-message-date']}>
          {dayjs(api.language, created_at).format("DD.MM.YYYY HH:mm")}
        </div>
      </div>
      <div className={style['cabinet-orders-details__chat-message-text']}>
        {message}
        <div className={style['cabinet-orders-details__chat-message-image-wrapper']}>
          {images.map((el, i) => {
            return (
              <div
                key={i+'img'}
                onClick={() => {
                  openModalImage(el.image);
                }}
                className={style['cabinet-orders-details__chat-message-preview-image']}
              >
                <img
                  className={style['cabinet-orders-details__chat-message-image']}
                  src={el.image}
                  key={i}
                  alt={'image messenge'}
                />
              </div>
            );
          })}
          {videos.map((el, i) => {
            return (
              <div
                onClick={(e) => {
                  openModalVideo(el.video, el.video_preview);
                }}
                className={style['cabinet-orders-details__chat-message-preview-viedo']}
              >
                <img
                  className={style['cabinet-orders-details__chat-message-image']}
                  src={el.video_preview}
                  key={i}
                  alt={'image messenge'}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatFieldUser);
