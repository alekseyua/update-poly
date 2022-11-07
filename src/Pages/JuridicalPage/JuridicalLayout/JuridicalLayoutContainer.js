import React from 'react';
import { useStoreon } from 'storeon/react';
import JuridicalLayout from './JuridicalLayout';

const JuridicalLayoutContainer = ({ site_configuration, breadcrumbs, title, components, role }) => {

const { dispatch } = useStoreon(); 

  const heandlerPolicy = (e, content) => {
    const valueList = e.target.attributes['data-name'].value;
    const title = e.target.textContent;
        dispatch('pdf-viewer', {
            link: content[valueList],
            title: title
        });
  }

    return (
        <>
        <JuridicalLayout 
            site_configuration = { site_configuration }
            breadcrumbs = { breadcrumbs }
            components = { components }
            title = { title }
            role = { role }

            heandlerPolicy = { heandlerPolicy }
        />
        </>
    )
}

export default JuridicalLayoutContainer;