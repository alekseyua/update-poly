import React, { useState, useEffect } from 'react';
import ReviewsCardView from './ReviewsCardView';
import { useStoreon } from 'storeon/react'

const ReviewsCard = ({
  blockEnableView = false,
  disabledLinkToProduct = false,
  content,
  created_at,
  current_user_like_id,
  is_current_user_liked,
  id,
  likes_count,
  product,
  product_url,
  review_photos,
  review_videos,
  stars,
  updated_at,
  user,
  user_rating,
  profileId,
}) => {
  const { dispatch } = useStoreon();
  const [isLiked, setisLiked] = useState(is_current_user_liked);
  
  const setLike = (id) => { 
    dispatch('updateLikeInReview', {id, profileId})
  };

  const openModalVideo = (slideData = false) => {
  //   if (slideData) {

      // if (homePage) {
  //       return propsSetModalStates({
  //         content: (
  //           <ModalContentViews.ModalWrapper>
  //             <ModalContentViews.CloseBtn closeModal={closeModal} />
  //             <ModalContentViews.ContentBlock>
  //               <ModalContentViews.CenterPosition>
  //                 <ModalContentViews.ViewsVideo
  //                   preview={slideData.video_preview}
  //                   video={slideData.video}
  //                 />
  //               </ModalContentViews.CenterPosition>
  //             </ModalContentViews.ContentBlock>
  //           </ModalContentViews.ModalWrapper>
  //         ),
  //         isShow: true,
  //       });
  //     }
  //     setModalStates({
  //       content: (
  //         <ModalContentViews.ModalWrapper>
  //           <ModalContentViews.CloseBtn closeModal={closeModal} />
  //           <ModalContentViews.ContentBlock>
  //             <ModalContentViews.CenterPosition>
  //               <ModalContentViews.ViewsVideo
  //                 preview={slideData.video_preview}
  //                 video={slideData.video}
  //               />
  //             </ModalContentViews.CenterPosition>
  //           </ModalContentViews.ContentBlock>
  //         </ModalContentViews.ModalWrapper>
  //       ),
  //       isShow: true,
  //     });
  //   }
  };
  const openModalImage = (slideData = false) => {
  //   if (slideData) {
  //     if (homePage) {
  //       return propsSetModalStates({
  //         content: (
  //           <ModalContentViews.ModalWrapper>
  //             <ModalContentViews.CloseBtn closeModal={closeModal} />
  //             <ModalContentViews.ContentBlock>
  //               <ModalContentViews.CenterPosition>
  //                 <ModalContentViews.ViewsImage image={slideData.image} />
  //               </ModalContentViews.CenterPosition>
  //             </ModalContentViews.ContentBlock>
  //           </ModalContentViews.ModalWrapper>
  //         ),
  //         isShow: true,
  //       });
  //     }
  //     setModalStates({
  //       content: (
  //         <ModalContentViews.ModalWrapper>
  //           <ModalContentViews.CloseBtn closeModal={closeModal} />
  //           <ModalContentViews.ContentBlock>
  //             <ModalContentViews.CenterPosition>
  //               <ModalContentViews.ViewsImage image={slideData.image} />
  //             </ModalContentViews.CenterPosition>
  //           </ModalContentViews.ContentBlock>
  //         </ModalContentViews.ModalWrapper>
  //       ),
  //       isShow: true,
  //     });
  //   }
  };

  useEffect(() => {
    setisLiked(is_current_user_liked);
  }, [is_current_user_liked]);

  return (
    <React.Fragment>
      <ReviewsCardView
        disabledLinkToProduct={disabledLinkToProduct}
        blockEnableView={blockEnableView}
        content={content}
        created_at={created_at}
        id={id}
        likes_count={likes_count}
        isLiked={isLiked}
        product={product}
        product_url={product_url}
        review_photos={review_photos}
        review_videos={review_videos}
        updated_at={updated_at}
        user={user}
        stars={stars}
        user_rating={user_rating}
        setLike={setLike}
        openModalVideo={openModalVideo}
        openModalImage={openModalImage}
      />
    </React.Fragment>
  );
};

export default React.memo(ReviewsCard);
