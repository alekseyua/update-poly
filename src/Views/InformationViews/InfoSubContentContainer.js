import React, { useEffect, useState } from "react";
import InfoSubContent from "./InfoSubContent";

const InfoSubContentContainer = ({ title, image, content = null, reverse, id }) => {
    const [ url, setUrl ] = useState('')
    useEffect(()=>{
        if ( id === 14 ){ 
            setUrl('payment')          
        }
        if ( id === 17 ){ 
            setUrl('juridical')          
        }
        if ( id === 16 ){ 
            setUrl('exchange')       
        }
        if ( id === 15 ){ 
            setUrl('delivery')         
        }
        if ( id === 18 ){ 
            setUrl('contacts')      
        }
    },[id])

    return (
    <InfoSubContent
        title={title}
        image={image}
        content= {content}
        reveerse={reverse}
        url={url}
    />
    )
}

export default InfoSubContentContainer;