import React from 'react'
import { v4 } from 'uuid';
import Icon from '../Icon';

import style from './paymentMethods.module.scss'

const PaymentMethods = (props) => {
    const { payment_methods } = props;
    return(
        <div className={style['payment-methods']}>
            <ul className={style['payment-methods__list']}>
                { payment_methods.map((el, key) => {
                    return <li key={v4()} className={style['payment-methods__list-item']}>
                        <Icon className={style['payment-methods__list-item-icon']} src={el.icon} alt='' height={40} width={40}/>
                    </li>
                })}
                
            </ul>
        </div>
    )
}

export default React.memo(PaymentMethods);