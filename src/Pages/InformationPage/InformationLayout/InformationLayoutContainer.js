import React, { useEffect, useState } from "react";
import InformationLayout from "./InformationLayout";

const InformationLayoutContainer = ({breadcrumbs, components})=>{
    const [ contents, setContents ] = useState([]);
    const [ title, setTitle ] = useState('');
    useEffect(()=>{
        !!components.length?(
            setContents(components[0].children),
            setTitle(components[0].title)
            ) : null

    },[components])
    return (
        <InformationLayout
        breadcrumbs={breadcrumbs}
        contents ={contents}
        title={title}
        />
    )
}

export default InformationLayoutContainer;