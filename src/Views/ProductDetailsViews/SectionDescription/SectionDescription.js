import React from 'react';
import Title from '../../Title';
import BlockSectionDescriptions from './Block/index';
import BlockGrid from '../../GridContainerBlock';

import style from './styles/sectiondescription.module.scss';
import Text from '../../../helpers/Text';

const SectionDescription = ({ content, extra,article }) => {
  return (

    <BlockSectionDescriptions.SectionDescriptionContainer>
      {/* <BlockGrid.Container> */}
        <div 
          className={style["productdescription__inner-title"]}
        >
          <Title variant={'productdescription__title'} className={style['productdescription__title']} type={'h2'}>
            {Text({text: 'about-products'})}
          </Title>
          <div>
            <span
              className={style['productdescription__text-article']}
            >
              <strong>{Text({text: 'article'})}:  </strong> 
              {article}
            </span>
          </div> 
        </div>
        <BlockSectionDescriptions.DescriptionRow>
          <BlockSectionDescriptions.ProductDescriptionText content={content} />
          <BlockSectionDescriptions.ProductDescriptionList extra={extra}/>
        </BlockSectionDescriptions.DescriptionRow>
      {/* </BlockGrid.Container> */}
    </BlockSectionDescriptions.SectionDescriptionContainer>
  );
};

export default React.memo(SectionDescription);
