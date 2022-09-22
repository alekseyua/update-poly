import React from "react";
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Block from '../../../Views/GridContainerBlock';
import InformationViews from "../../../Views/InformationViews";
import Breadcrumbs from "../../../Views/Breadcrumbs";
import Title from "../../../Views/Title";

const InformationContactsLayout = ({ breadcrumbs, components })=>{
    return(
        <Block.Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          {
          !!components.length?
          components.map((el, i) => {
            return (
              <InformationViews.PaymentsConteiner key={el.id}>
                <Title variant={'information-payments__title'} type={'h1'}>
                  {el.title}
                </Title>
                <InformationViews.ContactWrapper>
                  {el.children.map((elChild, iChild) => {
                    return (
                      <InformationViews.ContactItem
                        key={iChild}
                        title={elChild.title}
                        content={elChild.content}
                      />
                    );
                  })}
                </InformationViews.ContactWrapper>
              </InformationViews.PaymentsConteiner>
            );
          })
          : <BlockSpinner.SpinnerWrapper>
            <BlockSpinner.Spinner size={80} />
          </BlockSpinner.SpinnerWrapper>
        }
        </Block.Container>
    )
}
export default InformationContactsLayout;