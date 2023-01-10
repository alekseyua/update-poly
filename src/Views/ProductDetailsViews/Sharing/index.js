import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { fbIcon, igIcon, shareIcon, telIcon, vIcon, vkIcon, waIcon } from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';

import style from './style/share.module.scss';

const Sharing = ({
  title = 'Bits and pieces: Web Share APприI article',
  text = 'Web Share API feature is awesome. You must check it',
}) => {
  
  const [ styleSocialItems, setStyleSocialItems ] = useState(false);
  const shereRef = useRef();

  const pathPageProduct = window.location.href;

  const handerShareOpen = (social) => {
      window.open(`${social}${pathPageProduct}`, "", '_blank', 'height=500', 'width=600')
  }

  const social_links = [
      {
          icon: fbIcon,
          url: `https://www.facebook.com/sharer/sharer.php?u=`
      },
      {
          icon: igIcon,
          url: `http://instagram.com/###?direct/inbox&text=`,
      },
      {
          icon: vkIcon,
          url: 'https://vk.com/share.php?url=',
      },
      {
          icon: waIcon,
          url: `https://api.whatsapp.com/send/?phone&text=`,
      },
      {
          icon: vIcon,
          url: `viber://forward?text=`,
      },
      {
          icon: telIcon,
          url: 'https://telegram.me/share/url?url=',
      },
  ];

  const callbackShareClick = () => {
    // Проверка поддержки navigator.share
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: window.location.href,
        })
        .then(function () {

        })
        .catch(function (e) {
          console.log('Sharing failed',e);
        });
    } else {
      console.log('Sorry! Your browser does not support Web Share API');
    }
  };

  //отлавливаем клик вне блока поделится
  useEffect(() => {
    const clickOut = (e) => shereRef.current.contains(e.target) || setStyleSocialItems(false);
    document.addEventListener('click', clickOut);
    return () => document.removeEventListener('click', clickOut);
  }, []);

    
  return (
          <div
              ref={shereRef}
              className={classNames({
                  [style['social']]: !styleSocialItems,
                  [style['social_opened']]: styleSocialItems,
              })}
          >
              <Button
                  onClick={() => setStyleSocialItems(c=>!c)}
                  className={style['prodpage__button_group-btn']}
              >
                  <Icon src={shareIcon} width = {20} height = {20} />
              </Button>

              <div className={style["social-list"]}>
                  <div
                      className={style["social-link"]}
                      onClick={() => handerShareOpen(social_links[0].url)}
                  >
                      <img src={social_links[0].icon} className={style["social-link__fb"]} />
                  </div>
                  <div
                      className={style["social-link"]}
                      onClick={() => handerShareOpen(social_links[1].url)}
                  >
                      <img src={social_links[1].icon} className={style["social-link__ig"]} />
                  </div>
                  <div
                      className={style["social-link"]}
                      onClick={() => handerShareOpen(social_links[2].url)}
                  >
                      <img src={social_links[2].icon} className={style["social-link__vk"]} />
                  </div>

                  <div
                      className={style["social-link"]}
                      onClick={() => handerShareOpen(social_links[3].url)}
                  >
                      <img src={social_links[3].icon} className={style["social-link__wt"]} />
                  </div>
                  <div
                      className={style["social-link"]}
                      onClick={() => handerShareOpen(social_links[4].url)}
                  >
                      <img src={social_links[4].icon} className={style["social-link__vi"]} />
                  </div>
                  <div
                      className={style["social-link"]}
                      onClick={() => handerShareOpen(social_links[5].url)}
                  >
                      <img src={social_links[5].icon} className={style["social-link__tl"]} />
                  </div>

              </div>
          </div>
  );
};

export default Sharing;
