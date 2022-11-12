import React from 'react';
import classNames from 'classnames';

import style from './title.module.scss';

const Title = ({ 
  children, 
  variant, 
  type, 
  className, 
  fontSize,
  textAlign,
}) => {
  /**
   *  @param {
   *  @variant: String - удалённый, жёстко прописаный стиль в блоке Title
   *  @type: String - тип из списока ( h1,h2,h3 ... )
   *  @fontSize = {'25px'} || {'1.2em'}
   *  @textAlign = { 'center'} || { 'left' } || { 'right' }
   *  @
   * }
   */

  const classes = classNames({
    [style[variant]]: !!variant,
    [className]: !!className
  })

  switch (type) {
    case 'h1':
      return <h1
        className = { classes }
        style={{
          fontSize: `${fontSize}`,
          textAlign: `${textAlign}`
        }}
      >{children}</h1>;
    case 'h2':
      return <h2
        className = { classes }
        style={{
          fontSize: `${fontSize}`,
          textAlign: `${textAlign}`
        }}
      >{children}</h2>;
    case 'h3':
      return <h3
        className = { classes }
        style={{
          fontSize: `${fontSize}`,
          textAlign: `${textAlign}`
        }}
      >{children}</h3>;
    case 'h4':
      return <h4
        className = { classes }
        style={{
          fontSize: `${fontSize}`,
          textAlign: `${textAlign}`
        }}
      >{children}</h4>;
    case 'h5':
      return <h5
        className = { classes }
        style={{
          fontSize: `${fontSize}`,
          textAlign: `${textAlign}`
        }}
      >{children}</h5>;
    default:
      return <h1
        className = { classes }
        style={{
          fontSize: `${fontSize}`,
          textAlign: `${textAlign}`
        }}
      >{children}</h1>;
  }
};
export default React.memo(Title);

