import React from 'react';
import ImageUpload from '../../../ImageUpload';
import Text from '../../../../helpers/Text';

import style from '../styles/addreview.module.scss';

const FormAddReviewUploadImage = ({ values, setFieldValue }) => {
  const fileInputRef = React.useRef(null);

  return (
    <div className={style['productreviews__form-upload']}>
      <p className={style['productreviews__form-upload-desc']}>
        <Text text={'photo.or.video'} />:
      </p>
      <ImageUpload
        setFieldValue={(e)=>console.log({e})}//?! необходимо допилить сброс изображения
      >
        {({ preview, onSelectFile, selectedFile, onSelectFiles, isDragActive, getRootProps }) => {
          if (!Array.isArray(preview)) {            
            preview = [preview];
          }

          return (
            <>
              <ul className={style['productreviews__form-upload-list']}>
                {
                  preview.map((el, i) => {
                    return (
                      <li key={i} className={style['productreviews__form-upload-item']}>
                        <img
                          crossOrigin="anonymous"
                          className={style['productreviews__form-upload-image']}
                          src={el}
                        />
                      </li>
                    );
                  })
                }
              </ul>
              <div 
                {...getRootProps()} 
                className={style['productreviews__form-addprod-image']}
              >
                <div className={style['productreviews__form-addprod-image-wrap']}>
                  <div 
                    className={style['productreviews__form-upload-button']}
                  >
                    <Text text={'attach'} />
                    <input
                      multiple
                      ref={fileInputRef}
                      className={'hidden'}
                      id="image"
                      type="file"
                      accept=".png, .jpg, .jpeg, .mp4"
                      name={'image'}
                      onChange={(e) => {
                        const files = e.currentTarget.files;
                        onSelectFiles(files);
                        setFieldValue('uploadFiles', files);
                      }}
                    />
                    </div>
                </div>
              </div>
            </>
          );
        }}
      </ImageUpload>
    </div>
  );
};

export default React.memo(FormAddReviewUploadImage);
