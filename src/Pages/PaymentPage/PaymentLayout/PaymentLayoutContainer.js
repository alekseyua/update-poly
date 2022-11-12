import React, { useEffect, useState } from "react";
import PaymentLayout from "./PaymentLayout";

const PaymentLayoutContainer = ({ breadcrumbs, info_payment, role, title }) => {

    const [woosalePaymentsInfo, setWoosalePaymentsInfo] = useState('');
    const [retailPaymentsInfo, setRetailPaymentsInfo] = useState('');
    const [dropPaymentsInfo, setDropPaymentsInfo] = useState('');

    useEffect(() => {
        console.log('info_payment', info_payment)
        !!info_payment ? (
            setRetailPaymentsInfo(info_payment[0]?.payment_info),
            setWoosalePaymentsInfo(info_payment[1]?.payment_info),
            setDropPaymentsInfo(info_payment[2]?.payment_info)
        ) : null
    }, [info_payment])

    return (
        <>
            <PaymentLayout
                breadcrumbs={breadcrumbs}
                retailPaymentsInfo={retailPaymentsInfo}
                woosalePaymentsInfo={woosalePaymentsInfo}
                dropPaymentsInfo={dropPaymentsInfo}
                role={role}
                title={title}
            />
        </>
    )
}

export default PaymentLayoutContainer;