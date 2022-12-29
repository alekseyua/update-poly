
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
import VidjetChatContainer from '../../Views/VidjetChat';
import ButtonScrollTop from '../../Views/ButtonScrollTop';
import Cookie from '../../Views/Cookie/Cookie';


const Layout = (props) => {
  const token = getCookie('ft_token');

  const { modalState, dispatch } = useStoreon('modalState');
  const { closeModalState } = useStoreon('closeModalState');
  const [dataPage, setDataPage] = useState(props.context);
  const [notice, setNotice] = useState(null)

  const logoLinkGoto = '/'
  const description = 'описание сайта '
  useEffect(() => {
    setDataPage(prev => ({ ...prev, ...props.context }))
  }, [props.context])

  const { title } = dataPage.init_state.page_info
  const { answerCategorys, answers } = dataPage.init_state.faq;

  useEffect(() => {
    if (notice !== null) {
      //сдесь происходит магия запуска обнавления контекста 
      console.log({notice})
      if ([notice].includes('на Товар оплачен')) console.log('observer work good на Товар оплачен !!!') //dispatch('')
      if ([notice].includes('Вы пополнили баланс на')) console.log('observer work good Вы пополнили баланс на !!!') //dispatch('')

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

  useEffect( async () => {
    if (await navigator.serviceWorker) {
      console.log('navigator.serviceWorker', await navigator.serviceWorker)
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


  // useEffect(()=>{
  //   console.log('show modal window')
  //   dispatch('setModalState',{
  //     show: true,
  //     className: null,
  //     // iconImage: errorAlertIcon,
  //     // title: 'testing popup',
  //     // content: (
  //     //   <div>
  //     //     <i>{ Text({ text : 'error_server' }) }</i>
  //     //     <p>{ Text({ text : 'call_admin' }) }</p>
  //     //   </div>
  //     // ),
  //     // action : { title : ['next step', null]},
  //     // onClick : ()=>dispatch('setModalState',{
  //     //             show: true,
  //     //             content: 'hhhhhhhhh'
  //     //           })     
  //   })
  // },[])

  const openModalFeedbackReedFile = (link, title) => {
    dispatch('pdf-viewer', {
      link: link,
      title: title
    });
  }

  return (
    <ModalProvider.ModalProviderView
      show={modalState.show}
      content={modalState.content}
      action={modalState.action}
      title={modalState.title}
      addClass={modalState.addClass}
      onClick={modalState.onClick}
      closeModal={modalState.closeModal ? modalState.closeModal : closeModalState}
      onClickCancel={modalState.onClickCancel}
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
            currency={dataPage.init_state.currency}
            main_menu={dataPage.init_state.main_menu}
            cabinet_menu={dataPage.init_state.cabinet_menu}
            profile={dataPage.init_state.profile}
            site_configuration={dataPage.init_state.site_configuration}
            setCurrencyCurrencies={props.setCurrencyCurrencies}
          />
        </header>

        <main className={style['layout__main']}>
          <VidjetChatContainer
            answers={answers}
            categorys={answerCategorys}
          />

          <Outlet />

          <ButtonScrollTop />
        </main>

        <footer className={style['layout__footer']}>
          <Footer
            footer_menu={dataPage.init_state.footer_menu}
            site_configuration={dataPage.init_state.site_configuration}
            role_configuration={dataPage.init_state.role_configuration}
            year={dataPage.init_state.year}
            profile={dataPage.init_state.profile}
            activeButton={dataPage.init_state.activeButton}
          />
        </footer>
        <Cookie openModalFeedbackReedFile={openModalFeedbackReedFile} policy={dataPage.init_state.site_configuration.policy} />
      </div>
    </ModalProvider.ModalProviderView>
  );
};


export default Layout;