import React from 'react';
import TopFooter from './TopFooter';
import BottomFooter from './BottomFooter';
import { useStoreon } from 'storeon/react';



const Footer = ({ 
  site_configuration, 
  role_configuration, 
  activeButton,
  footer_menu = [],
  profile ,
  year, 

}) => {

  const { dispatch } = useStoreon();

    // console.log('footer menu = ', footer_menu)

  const openModalFeedback = () => {
    dispatch('feedback', {feedbackBtn: true});
  }
  
  const openModalFeedbackReedFile = (link, title) => {
    dispatch('pdf-viewer', {
      link: link,
      title: title
    });
  }
  return (
    <>
      <TopFooter
        site_configuration={site_configuration}
        role_configuration={role_configuration}
        activeButton = { activeButton }
        footer_menu = { footer_menu }
        role={profile.role} 
        
        openModalFeedback ={ openModalFeedback }
      />
      <BottomFooter
        site_configuration={site_configuration}
        
        year={year}
        front_admin={profile.front_admin}
        role={profile.role}

        openModalFeedbackReedFile = { openModalFeedbackReedFile }
      />
    </>
  );
};


export default Footer;