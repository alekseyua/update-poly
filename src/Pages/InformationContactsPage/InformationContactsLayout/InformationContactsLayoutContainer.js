import React from "react";
import InformationContactsLayout from './InformationContactsLayout';

const InformationContactsContainer = ({breadcrumbs, components}) => {
    return (
        <InformationContactsLayout
        breadcrumbs={breadcrumbs}
      components={components}
        />
    )
}
export default InformationContactsContainer