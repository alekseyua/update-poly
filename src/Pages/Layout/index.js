
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ModalProvider from '../../Views/ModalProvider/ModalProvider';
import { Helmet } from 'react-helmet';
import { useStoreon } from 'storeon/react';

import style from './layout.module.scss';
import cogoToast from 'cogo-toast';
import { getCookie } from '../../helpers/helpers'; 
import VidjetChatComponent from '../../Views/VidjetChat';


const Layout = (props) => {
  // console.log('start go to props == ', props)
  const token = getCookie('ft_token');

  const { modalState, dispatch } = useStoreon('modalState');
  const { closeModalState } = useStoreon('closeModalState');
  const [ dataPage, setDataPage ] = useState(props.context);
  const [notice, setNotice] = useState(null)

  const logoLinkGoto = '/'
  const description = 'описание сайта '
  useEffect(()=>{
    setDataPage(prev => ({...prev, ...props.context}))
  },[props.context])
  const { title } = dataPage.init_state.page_info
  
const isShowChat = false
  useEffect(() => {
    if (notice !== null) {
      const { hide } = cogoToast.success(notice, {
        position: 'top-center',
        heading: `Уведомление `,
        style: `marginTop: 100px`,
        hideAfter: 90,
        onClick: (e) => hide()
      }
      );
      setNotice(null)
    }
  }, [notice])

    useEffect(() => {
      if (navigator.serviceWorker) {
        console.log('navigator.serviceWorker',navigator.serviceWorker)
        const listener = event => {
          // console.log({event})
          const { notification } = event.data
          if (event.data && event.data.type === 'SKIP_WAITING') {
            self.skipWaiting();
          }
          const { body } = notification
          setNotice(body)
        }
        navigator.serviceWorker.addEventListener('message', listener);
        return removeEventListener('message', listener);
      }
    }, [])


  useEffect(()=>{

    dispatch('setModalState',{
      show: false,
      className: null,
      // iconImage: errorAlertIcon,
      title: 'testing popup',
      // content: (
      //   <div>
      //     <i>{ Text({ text : 'error_server' }) }</i>
      //     <p>{ Text({ text : 'call_admin' }) }</p>
      //   </div>
      // ),
      // action : { title : ['next step', null]},
      // onClick : ()=>dispatch('setModalState',{
      //             show: true,
      //             content: 'hhhhhhhhh'
      //           })     
    })

  },[])

  
  return (
      <ModalProvider.ModalProviderView
        show={modalState.show}
        content={modalState.content}
        action={modalState.action}
        title={modalState.title}
        addClass={modalState.addClass}
        onClick={modalState.onClick}
        closeModal={modalState.closeModal? modalState.closeModal : closeModalState} 
        onClickCancel = { modalState.onClickCancel}
        iconImage={modalState.iconImage}
        style={modalState.style}
      >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} /> 
     </Helmet>

    <div className={style['layout__container']}>
        <div className='goto'></div>
        <header className={style['layout__header']}>
          <Header 
            logo={dataPage.init_state.site_configuration.logo_1} 
            logoLinkGoto={logoLinkGoto} 
            header_menu={dataPage.init_state.header_menu}
            currency = {dataPage.init_state.currency}
            main_menu={dataPage.init_state.main_menu}
            cabinet_menu={dataPage.init_state.cabinet_menu}
            profile={dataPage.init_state.profile}
            site_configuration={dataPage.init_state.site_configuration}
            setCurrencyCurrencies={props.setCurrencyCurrencies}
          />
        </header>

        <main className={style['layout__main']}>
          <VidjetChatComponent 
            isShowChat = { isShowChat }
          />
          
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
            activeButton = { dataPage.init_state.activeButton}
          />
        </footer>
    </div>
      </ModalProvider.ModalProviderView>
  );
};


export default Layout;