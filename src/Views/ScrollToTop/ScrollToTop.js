import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  
  useEffect(() => {
    let t;
    const up = () => {
      console.log('start scroll to top')
      document.querySelector('.goto').scrollIntoView({block:'center', behavior: 'smooth'})
      // let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      // if(top > 0) {
      //   console.log({top})
      //   window.scrollBy(0,-100);
      //   t = setTimeout(up(),1000);
      // } else clearTimeout(t);
      // return false;
    }

    up()
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [pathname]);

  return null;
}

export default ScrollToTop;