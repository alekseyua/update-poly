import React, { useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import routes from './routes/routes';
import Layout from './Pages/Layout';
import { useStoreon } from 'storeon/react';



const App = (props) => {
  // console.log('init Context', props)

  const { context, goToPage, dispatch } = useStoreon('context', 'goToPage');

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
        }, 500)
      }
    })
    document.querySelector('.goto').scrollIntoView({block:'center', behavior: 'smooth'})

  }, [location.pathname, location.search, currencyCurrencies])



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

