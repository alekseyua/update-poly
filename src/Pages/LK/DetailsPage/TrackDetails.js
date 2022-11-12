import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/index.module.scss';


const TrackDetails = ({ nubmerTrack = '80110156803221' }) => {

  const openLink = () =>{

     window.open("https://track24.ru/", 'отследить посылку' , 'min-width=100%,height=900')
  }

  return (
    <div className={style['cabinet-orders-details__track-container']}>
     
      <span clsasName={style['cabinet-orders-details__track-number']}> Трек-номер для отслеживания:&nbsp;{nubmerTrack}</span>
      <div className={style["cabinet-orders-details__track-info"]}>отслеживать посылку необходимо на сайте CDEK или https://track24.ru/, а также на сайте почты Страны отправления</div>
      <div>
        <p style={
          {
          position : 'relative',
          fontSize : '16px',
          top : '0px',
          margin : 0,
          color: `#820c78`,
        }    
        }>
          Отследить посылку &nbsp;
          <Link 
            to="#"
          onClick={openLink}
            clsasName={style['cabinet-orders-details__track-text--link']}
          >
              track24.ru
            &nbsp;
          </Link>
        </p>
      </div>
    </div>
  );        
};

export default React.memo(TrackDetails);


