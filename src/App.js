import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import routes from './routes/routes';
import Layout from './Pages/Layout';
import { useStoreon } from 'storeon/react';



const App = (props) => {
  // console.log('init Context', props)
  
  const { context, goToPage, dispatch } = useStoreon('context', 'goToPage');

  const location = useLocation();
  
  useEffect(()=>{
    console.log('test',location.pathname)
    console.log('test2', location.search)
    let path = location.pathname;
    if (!!location.search){
      path = `${location.pathname}${location.search}`;
    }
    dispatch('getContextPage', path)
  },[location.pathname, location.search])



  return (
    <Routes>

      <Route path={'/'} element={<Layout context={context} />} >
        
        { 

          routes.map(({ path, index, fetchInitialData, component: C }) => {       
            return (
              <Route
                key={path}
                index={index}
                path={path}
                element={<C context={context.init_state} url={location.pathname} fetchInitialData={fetchInitialData}/>}
              />
            )
          })

        } 

      </Route>
    </Routes>
  )
};

export default App;

