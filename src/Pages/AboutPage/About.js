import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutUs from './AboutUs';

const About = (props) => {
  // console.log('props about page', props.context)
    // const location = useLocation();
    // const { pathname } = location;
  
    // useEffect(()=>{
    //   props.handlerDataPage(pathname);
    // },[])
   
    const { page_info, site_configuration, breadcrumbs } = props.context;
    const {  components = [] } = page_info;  
    const firstSection = components.filter((el) => el.id === 9)[0];

   return(<>
        <AboutUs 
          title={firstSection?.title}
          breadcrumbs = { breadcrumbs }
          goToRegistration={site_configuration.page_type_reg}
          dangerouslySetInnerHTML={{ __html: firstSection?.content }}
        />
    </>
    )
}

export default About;