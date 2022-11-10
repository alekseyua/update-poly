import React from 'react';
import { Player, BigPlayButton } from 'video-react';
import style from './styles/video-view.module.scss';

const ViewsVideo = ({ preview, video }) => {

  return (
    <div className={style['preview-video']}>
      <Player 
        className="news-details-page__slider_item" 
        fluid={true} 
        poster={preview} 
        src={video
        
      }>
        <BigPlayButton position="center"></BigPlayButton>
      </Player>
    </div>
  );
};

export default React.memo(ViewsVideo);
