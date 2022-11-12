import React from 'react';
import RecomendetProduct from './RecomendetProduct/RecomendetProduct';

const RecomendetProductComtainer = ({ 
    recommended,
    currency,

})=>{
    return (
        <RecomendetProduct
            recommended={recommended}
            currency={currency}
        />
    )
}

export default RecomendetProductComtainer;