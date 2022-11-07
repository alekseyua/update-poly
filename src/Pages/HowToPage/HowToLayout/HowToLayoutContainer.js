import React, { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import HowToLayout from './HowToLayout';

const HowToLayoutContainer = ({ breadcrumbs, slug, components }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const { dispatch } = useStoreon();
    useEffect(() => {
        !!components.length?(
            setContent(components[0].content),
            setTitle(components[0].title)
            ): null
    }, [components])

    const openVidjet = () => {
        dispatch('feedback');
    };

    return (
        <HowToLayout
            title={title}
            content={content}
            openVidjet={openVidjet}
            breadcrumbs={breadcrumbs}
            slug={slug}
        />
    )
}

export default HowToLayoutContainer;