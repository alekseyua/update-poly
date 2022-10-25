import React from 'react';
import ImageUpload from '../ImageUpload';
import Text from '../../helpers/Text';
import classNames from 'classnames';

import style from '../styles/addfiles.module.scss';

/**
 * 
 * @param {
 * @ setFieldValue( name, files);
 * @ label - текст слева при выборе файла
 * @ accept=".png, .jpg, .jpeg, .mp4 ... "
 * @ textButton = ' какой либо информационный текст для добавления файла или иконка'
 * @ clearPreviewFiles = 
 * } param0 
 * @returns 
 */
const AddUploadFiles = ({ 
  accept, 
  label, 
  setFieldValue, 
  name , 
  multiple = '', 
  textButton, 
  onBlur,
  className,
  onChange = () => {},

}) => {
  const fileInputRef = React.useRef(null);

  return (
    <div className={classNames({
      [style['files-uploud__form-upload']]:true,
      [style[className]]: !!className
      })
    }
    >
      <p className={style['files-uploud__form-upload-desc']}>
        { 
          label || label === ''?
            <React.Fragment>
              {label}
            </React.Fragment>
              : <React.Fragment>
                  <Text text={'photo.or.video'} />:
                </React.Fragment>
        }
      </p>
      <ImageUpload
     //  clearPreviewFiles = { clearPreviewFiles } //?! необходимо допилить сброс изображения
      >
        {({ preview, onSelectFile, selectedFile, onSelectFiles, isDragActive, getRootProps }) => {
          
          if (!Array.isArray(preview)) {            
            preview = [preview];
          }
          
          return (
            <>
              <ul className={style['files-uploud__form-upload-list']}>
                {
                  preview.map((el, i) => {
                    return (
                      <li key={i} className={style['files-uploud__form-upload-item']}>
                        <img
                          crossOrigin="anonymous"
                          className={style['files-uploud__form-upload-image']}
                          src={el}
                        />
                      </li>
                    );
                  })
                }
              </ul>
              <div 
                // {...getRootProps()} //?! косяк открывает два окна

                className={style['files-uploud__form-addprod-image']}
              >
                <div className={style['files-uploud__form-addprod-image-wrap']}>
                  <div 
                    className={
                        classNames({
                          [style['files-uploud__form-upload-button']]: true,
                          [style['files-uploud__form-upload-button-text']]: !!textButton
                          
                        })
                      }
                  >
                    {
                      textButton?
                        textButton
                        :<Text text={'attach'} />
                    }
                    <input
                      ref={fileInputRef}
                      id = { 'image' }
                      type = { 'file' }
                      name = { 'image' }
                      onBlur = { onBlur }
                      accept = { accept }
                      multiple = { multiple }
                      className = { 'hidden' }
                      onChange = { e => {
                        onChange(e)
                        const files = e.currentTarget.files;
                        onSelectFiles(files);
                        !!multiple? setFieldValue( name, files) : setFieldValue( name, files)[0];
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

export default React.memo(AddUploadFiles);
