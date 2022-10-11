import React from 'react';
import { v4 } from 'uuid';
import { fbIcon, igIcon, vkIcon, waIcon, vIcon, fbmIcon } from '../../images';
import Icon from '../Icon';

import style from './socialLinks.module.scss';

const SocialLinks = ({site_configuration}) => {
  const social_links = [
    {
      icon: fbIcon,
      url: site_configuration?.fb_link ? site_configuration.fb_link : '#',
    },
    {
      icon: igIcon,
      url: site_configuration?.insta_link ? site_configuration.insta_link : '#',
    },
    {
      icon: vkIcon,
      url: site_configuration?.vk_link ? site_configuration.vk_link : '#',
    },
    {
      icon: waIcon,
      url: site_configuration?.whatsapp_link ? site_configuration.whatsapp_link : '#',
    },
    {
      icon: vIcon,
      url: site_configuration?.viber_link ? site_configuration.viber_link : '#',
    },
    {
      icon: fbmIcon,
      url: site_configuration?.twitter_link ? site_configuration.twitter_link : '#',
    },
  ];
  const redirectURL = (path)=>{ 
    console.log({path})
    window.open(path, '_blank') 
  }
  return (
    <div className={style['social-links']}>
      <nav className={style['social-links__list']}>
        {social_links.map((el, key) => {
          return (
            <li 
              key={v4()} 
              className={style['social-links__list-item']}
              onClick={()=>redirectURL(el.url)}
            >
                <Icon 
                  className={style['social-links__list-item-icon']} 
                  src={el.icon} alt="social" 
                  height={20} width={20}
                />
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default React.memo(SocialLinks);
 