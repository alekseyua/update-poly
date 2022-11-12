import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { arrowTop } from '../../images';

import style from './styles/goto.module.scss';

const ButtonScrollTop = ({

}) => {
    const [isShowed, setIsShowed] = useState(false);

    const goToTop = () => {
        document.querySelector('.layout-module__layout__container___WJXh4').scrollTo(0,0)
    }

    const snowing = (e) => {
        const heightScrollToTop = document.querySelector('.layout-module__layout__container___WJXh4').scrollTop;
        if ( heightScrollToTop > 100 ) 
            console.log({heightScrollToTop})

      if (e.currentTarget.pageYOffset > 100) {
        return setIsShowed(true);
      } else {
        return setIsShowed(false);
      }

    };
  
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleScroll = () => {
        console.log('change')

    };

    // return isShowed ? <ButtonScroll /> : null;


    return (
        <React.Fragment>
            <div
                className = { style['go-to__container']}
            >
                <Icon 
                    src={ arrowTop } 
                    width = { 80 } 
                    height = { 80 } 
                    onClick = { goToTop }
                />
            </div>
        </React.Fragment>
    )
}
export default ButtonScrollTop;