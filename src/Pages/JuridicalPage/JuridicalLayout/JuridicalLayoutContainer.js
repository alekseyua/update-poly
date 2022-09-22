import React from 'react';
import JuridicalLayout from './JuridicalLayout';

// import Layout from '../Views';
// import InformationViews from '../Views/InformationViews';
// import Title from '../Views/Title';
// import Breadcrumbs from '../Views/Breadcrumbs';
// import Container from '../Views/Container';
// import Modal from '../Views/ModalCreator';
// import Settings from '../#lifehack/Settings';
// import { useStoreon } from 'storeon/react';
// import ModalPreviewFile from '../Views/ModalContentViews/ModalPreviewFile';
// import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
// import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
// import { ROLE } from '../const';
// import { getCookie } from '../utils';
// import * as serviceWorker from '../serviceWorker';

const JuridicalLayoutContainer = ({ breadcrumbs, title, components, role }) => {



//   const { cabinet_menu, create_shop, cabinet_site_menu, profile, breadcrumbs = [], page_info, components } = props;
//   const { user = {}, shop = {}, role, passport, organization, links, balance, front_admin } = profile;
//   const { is_has_shop, shop_link } = shop;
//   const { username = '' } = user;
//   const { dispatch } = useStoreon();
// console.log('props.site_configuration', props.site_configuration)
//   const closeModal = () => {
//     dispatch('modal/update', {
//       show: false,
//       content: null,
//       addClass: false,
//     });
//   };

//   const openModalFeedbackReedFile = (file) => { 
   
//     const renderPage = (props) => {
//         return (
//             <>
//                 {props.canvasLayer.children}
//                 <div style={{ userSelect: 'none' }}>{props.textLayer.children}</div>
//                 {props.annotationLayer.children}
//             </>
//         );
//     };

//     dispatch('modal/update', {
//       show: true,
//       addClass: 'modal-file_views',
//       content: (
//               <ModalPreviewFile closeModal={closeModal}>
//                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
//                     <div id="pdfviewer" style={{overflow:'auto'}}>
//                       <Viewer 
//                         fileUrl={`${file}`}
//                         defaultScale = {'PageWidth'}
//                         renderPage={renderPage}
//                         theme={{
//                           theme: 'dark',
//                         }}
//                         httpHeaders={{
//                           Authorization: `Token ${getCookie('ft_token')}`,
//                         }}
//                         withCredentials={true}
//                       />
//                     </div>
//                 </Worker>

//               </ModalPreviewFile>
//         )
//     })
//   }

    

//   const heandlerPolicy = (e) => {
//     let valueList = e.target.attributes['data-name'].value;
//     // if(valueList === 'public_offer'){
//     //   props.profile.role === ROLE.WHOLESALE? valueList = 'public_offer_2' : valueList = 'public_offer_1';
//     // }
//     openModalFeedbackReedFile(props.site_configuration[valueList]);
//   }

    return (
        <>
        <JuridicalLayout 
            breadcrumbs={breadcrumbs}
            title= {title}
            components={components}
            role={role}
        />
        </>
    )
}

export default JuridicalLayoutContainer;