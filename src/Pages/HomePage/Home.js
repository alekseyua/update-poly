import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import { useStoreon } from 'storeon/react';

import './Home.css';



const Home = (props) => {
  const { first_screen, in_stock_product_filters } = props.context.main_page;
  const { banners, dataProducts, products_in_stock, profile, partner_banners, news, about_banner, reviews, currency } = props.context;
  const { page_type_catalog, page_type_news, page_type_reviews, main_title_video } = props.context.site_configuration;
  const { dispatch } = useStoreon();
  const navigate = useNavigate();
  const location = useLocation();
  const goToCatalog = (path) => {
    navigate(path)
  }

  return (
    <React.Fragment>
      <HomeComponent.TradingPlatform
        first_screen={first_screen}
        page_type_catalog={page_type_catalog}
        goToCatalog={goToCatalog}
        main_title_video={main_title_video}
      // front_admin = {props.profile.front_admin}
      />

      <HomeComponent.MainCategories
        banners={banners}
      //   front_admin = {props.profile.front_admin}
      />


      {
        products_in_stock ?
          !!products_in_stock?.results?.length ?
            <HomeComponent.ProductsInStock
              role={profile.role}
              // front_admin = {props.profile.front_admin}
              in_stock_product_filters={in_stock_product_filters}
              products={products_in_stock?.results}
              catalog_url={page_type_catalog}
              currency={currency}
            />
            : null
          : null
      }


      <HomeComponent.Cooperation
        // front_admin = {props.profile.front_admin}
        partner_banners={partner_banners}
      />

      <HomeComponent.MainNews
        // front_admin = {props.profile.front_admin}
        news={news}
        news_url={page_type_news}
      />

      <HomeComponent.MainAbout
        // front_admin = {props.profile.front_admin}
        about_banner={about_banner}
      />

      {/* 
      <HomeComponent.LivePhotos 
        //Живые фото
        live_photos={live_photos} 
        live_photos_url={page_type_live_photos} 
      /> */}

      <HomeComponent.MainReviews
        // front_admin = {props.profile.front_admin}
        reviews_url={page_type_reviews}
        product_reviews={reviews.product_reviews}
        service_reviews={reviews.service_reviews}
        profileId={profile.id}
      // setModalStates={setModalStates}
      // {...modalStates}
      />
    </React.Fragment>
  );
}

export default Home;
