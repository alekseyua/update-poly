import React from 'react';
import TopFooter from './TopFooter';
import BottomFooter from './BottomFooter';
import { useStoreon } from 'storeon/react';



const Footer = ({ 
  site_configuration, 
  role_configuration, 
  activeButton,
  footer_menu = [],
  policy_1, 
  policy_2,
  profile ,
  year, 

}) => {

  const { dispatch } = useStoreon();

    // console.log('footer menu = ', footer_menu)

  const openModalFeedback = () => {
    dispatch('feedback', {feedbackBtn: true});
  }
  
  const openModalFeedbackReedFile = () => {
    console.log('openModalFeedbackReedFile');

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
        policy_1={policy_1}
        policy_2={policy_2}
        front_admin={profile.front_admin}
        role={profile.role}

        openModalFeedbackReedFile = { openModalFeedbackReedFile }
      />
    </>
  );
};


export default Footer;