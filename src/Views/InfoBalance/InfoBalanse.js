import React, { useState } from "react";
import style from './infoBalance.module.scss';
import classNames from "classnames";

const InfoBalance = ({
    now_balance,
    total_price,
    currency,
}) => {

    const valueBalance = () => {
        if ((now_balance - total_price) > 0) {
            return true;
        }
        return false;
    }
    const [stateBalance, setStateBalance] = useState(valueBalance());
    const styleBalancePosetive = classNames({
        [style['balance__now']]: true,
        [style['balance__now--red']]: !stateBalance,
    })

    return (
        <React.Fragment>
            <div
                className={styleBalancePosetive}
            >Ваш текущий баланс <span>{now_balance}&nbsp;<span>{currency}</span></span></div>
            <div
                className={style['balance__all-price']}
            >Необходимо пополнить баланс для оплаты заказов <span>{(total_price - now_balance).toFixed(2)}&nbsp;<span>{currency}</span></span></div>
        </React.Fragment>
    )
}


export default React.memo(InfoBalance);