import React from 'react';
import VidjetTelegram from './VidjetTelegram';

const VidjetTelegramContainer = ({

}) => {

    const toggleOpenTelegram = () => {
      window.open('https://t.me/Ftownpl_bot?start=8199f12d-c77d-4fda-b00b-a1a681fad38f','_blank')
    }

    return <VidjetTelegram
      toggleOpenTelegram = {toggleOpenTelegram}
    />

};

export default React.memo(VidjetTelegramContainer);
