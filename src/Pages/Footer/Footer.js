import React from 'react';
import TopFooter from './TopFooter';
import BottomFooter from './BottomFooter';
import { useStoreon } from 'storeon/react';



const Footer = ({ footer_menu = [], site_configuration, role_configuration, year, policy_1, policy_2,profile }) => {

  const { dispatch } = useStoreon();

    // console.log('footer menu = ', footer_menu)

  const openModalFeedback = () => {
    console.log('openModalFeedback');
    dispatch('feedback');
  }

  return (
    <>
      <TopFooter
        footer_menu={footer_menu}
        site_configuration={site_configuration}
        role_configuration={role_configuration}
        role={profile.role} 
        openModalFeedback ={ openModalFeedback }
      />
      <BottomFooter
        site_configuration={site_configuration}
        year={year}
        policy_1={policy_1}
        policy_2={policy_2}
        // openModalFeedbackReedFile={openModalFeedbackReedFile}
        front_admin={profile.front_admin}
        role={profile.role}
      />
    </>
  );
};


export default Footer;