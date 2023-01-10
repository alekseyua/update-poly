import React, { useEffect } from 'react';
import { telegram } from '../../images';
import Icon from '../Icon';

const VidjetTelegram = ({
    toggleOpenTelegram
}) => {

    return <div className={'inner-chat-teleg'}><Icon onClick={toggleOpenTelegram} src={telegram} alt={'telegram'} /></div>
}

export default VidjetTelegram;

{/* <script src="//fbstore.sendpulse.com/loader.js" data-sp-widget-id="b1560591-3230-457b-9299-a4cc02ba5876" async></script> */}