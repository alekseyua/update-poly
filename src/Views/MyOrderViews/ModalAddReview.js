import React from 'react';
import Text from '../../helpers/Text';
// import ModalContentViews from '../ModalContentViews';

const ModalAddReview = ({ closeModal, isSaved = true, children }) => {
  return (
    // <ModalContentViews.ModalContentViews
    //   title={'Оставьте отзыв'}
    //   keyText={'send'}
    //   closeModal={closeModal}
    //   isSaved={isSaved}
    // >
    <>
      {children}
    </>
    // </ModalContentViews.ModalContentViews>
  );
};

export default React.memo(ModalAddReview);
