import React, { useEffect, useState } from 'react';
import HowToLayout from './HowToLayout';

const HowToLayoutContainer = ({ breadcrumbs, slug, components }) => {
    console.log({components})
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    useEffect(() => {
        !!components.length?(
            setContent(components[0].content),
            setTitle(components[0].title)
            ): null
    }, [components])

    const openVidjet = () => {
        console.log('open vidjet faq')
        // ?! должен открывать виджет faq
        // dispatch('faq/update', {
        //   show: true,
        // });
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