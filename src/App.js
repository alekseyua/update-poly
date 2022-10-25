import React, { useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import routes from './routes/routes';
import Layout from './Pages/Layout';
import { useStoreon } from 'storeon/react';
import cogoToast from 'cogo-toast';
import { getCookie } from './helpers/helpers';


const App = (props) => {
  // console.log('init Context', props)
  const token = getCookie('ft_token');

  const { context, goToPage, dispatch } = useStoreon('context', 'goToPage');
  const [notice, setNotice] = useState(null)

  const location = useLocation();
  const navigate = useNavigate();

  const [currencyCurrencies, setCurrencyCurrencies] = useState(null)

  useEffect(() => {
    //  console.log('test',location.pathname)
    //  console.log('test2', location.search)
    let path = location.pathname;
    if (!!location.search) {
      path = `${location.pathname}${location.search}`;
    }
    dispatch('getContextPage', {
      url: path,
      redirectTo: (path) => {
        const timerTimeout = setTimeout(() => {
          navigate(path);
          return () => clearTimeout(timerTimeout);
        }, 2000)
      }
    })
  }, [location.pathname, location.search, currencyCurrencies])

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

  if (!!token) {
    // =========================================================================================
    useEffect(() => {
      if (navigator.serviceWorker) {
        // console.log('navigator.serviceWorker',navigator.serviceWorker)
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

  }


  return (
    <Routes>

      <Route path={'/'} element={<Layout context={context} setCurrencyCurrencies={setCurrencyCurrencies} />} >

        {

          routes.map(({ path, index, fetchInitialData, component: C }) => {
            return (
              <Route
                key={path}
                index={index}
                path={path}
                element={<C context={context.init_state} type={context.type} url={location.pathname} fetchInitialData={fetchInitialData} />}
              />
            )
          })

        }

      </Route>

    </Routes>
  )
};

export default App;

