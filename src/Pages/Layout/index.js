
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ModalProvider from '../../Views/ModalProvider/ModalProvider';
import { Helmet } from 'react-helmet';

import style from './layout.module.scss';
import { useStoreon } from 'storeon/react';



const Layout = (props) => {
  // console.log('start go to props == ', props)
  const { modalState, dispatch } = useStoreon('modalState');
  const { closeModalState } = useStoreon('closeModalState');
  const [ dataPage, setDataPage ] = useState(props.context);
  const logoLinkGoto = '/'
  const description = 'описание сайта '
  useEffect(()=>{
    setDataPage(prev => ({...prev, ...props.context}))
  },[props.context])
  const { title } = dataPage.init_state.page_info
  
  useEffect(()=>{

    // dispatch('goToPage', {path: '/about'})
    //   show: true,
    //   className: null,
    //   iconImage: errorAlertIcon,
    //   title: 'testing popup',
    //   content: (
    //     <div>
    //       <i>{ Text({ text : 'error_server' }) }</i>
    //       <p>{ Text({ text : 'call_admin' }) }</p>
    //     </div>
    //   ),
    //   action : { title : ['next step', null]},
    //   onClick : ()=>dispatch('setModalState',{
    //               show: true,
    //               content: 'hhhhhhhhh'
    //             })
      

    // })

  },[])


  return (
      <ModalProvider.ModalProviderView
        show={modalState.show}
        content={modalState.content}
        action={modalState.action}
        title={modalState.title}
        className={modalState.className}
        onClick={modalState.onClick}
        closeModal={closeModalState}
        iconImage={modalState.iconImage}
      >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} /> 
     </Helmet>

    <div className={style['layout__container']}>
        <header className={style['layout__header']}>
          <Header 
            logo={dataPage.init_state.site_configuration.logo_1} 
            logoLinkGoto={logoLinkGoto} 
            header_menu={dataPage.init_state.header_menu}
            currencies={dataPage.init_state.currencies}
            main_menu={dataPage.init_state.main_menu}
            cabinet_menu={dataPage.init_state.cabinet_menu}
            profile={dataPage.init_state.profile}
            site_configuration={dataPage.init_state.site_configuration}
          />
        </header>

        <main className={style['layout__main']}>
          {/* <VidjetChatComponent /> */}
          
          <Outlet />

          {/* <ButtonScrollTopComponent/> */}
        </main>

        <footer className={style['layout__footer']}>
         <Footer 
            footer_menu = {dataPage.init_state.footer_menu}
            site_configuration = {dataPage.init_state.site_configuration}
            role_configuration = {dataPage.init_state.role_configuration}
            year = {dataPage.init_state.year}
            profile = {dataPage.init_state.profile}

            // policy_1 = {dataPage.init_state}
            // policy_2 = {dataPage.init_state}
          />
        </footer>
    </div>
      </ModalProvider.ModalProviderView>
  );
};


export default Layout;