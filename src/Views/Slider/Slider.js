import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


const Slider = ({ 
    slides, 
    paramsSlider, 
    profileId, 
    slidesData, 
    SlideCard,
    ...props 
}) => {




     //?! нужно будет более развёрнуто поработать с настройками
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            {...paramsSlider}
        >            
            {
                slidesData.map((el, i) => {
                    return (
                    <SwiperSlide className='test' key={i}>
                        <SlideCard 
                            {...el} 
                            profileId={ profileId } 
                        />
                    </SwiperSlide>
                    );
                })
            }            
        </Swiper>
    )
}

export default Slider;