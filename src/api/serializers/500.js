import siteConfigurationSerializer from './site_configuration';

const page500Serializer = (page) => {
  const { init_state, page_info } = page;
  const { profile } = init_state;
  
  return {
    ...init_state,
    ...page_info,
    site_configuration: siteConfigurationSerializer(init_state.site_configuration),
    cart: profile.cart,
    notifications: profile.notifications,
    user_role: profile.user_role,
    user_status: profile.user_status,
    wishlist: profile.wishlist,

  };
 
  // return (e)=>{window.location.reload();}
};

export default page500Serializer;
