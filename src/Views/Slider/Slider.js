import React, { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';


const Slider = ({ slides, paramsSlider, profileId, slidesData, SlideCard, ...props }) => {

    //?! нужно будет более развёрнуто поработать с настройками
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            {...paramsSlider}
        // spaceBetween={50}
        // slidesPerView={3}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
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