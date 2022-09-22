import React from 'react';
import ExchangeLayout from './ExchangeLayout';

const ExchangeLayoutContainer = ({ breadcrumbs, title, content }) => {

    return(
        <ExchangeLayout 
            title={title}
            breadcrumbs={breadcrumbs}
            content={content}
        />
    )
}

export default ExchangeLayoutContainer;