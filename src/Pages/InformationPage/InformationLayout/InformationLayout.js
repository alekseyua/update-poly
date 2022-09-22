import React from "react";
import Block from '../../../Views/GridContainerBlock';
import Title from "../../../Views/Title";
import InformationViews from "../../../Views/InformationViews";
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Text from "../../../helpers/Text";
import Breadcrumbs from "../../../Views/Breadcrumbs";
const InformationLayout = ({ breadcrumbs, contents = [], title }) => {
    return (

        <Block.Container>
            <InformationViews.PaymentsConteiner>
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <InformationViews.HowToWrapper>
                    <Title variant={'information-payments__title'} type={'h1'}>
                        {
                            !!!title ?
                                Text({ text: 'info' })
                                : title
                        }
                    </Title>

                    {
                        !!contents.length ?
                            contents.map((el, i) => {
                                const { content, id, title, image } = el;
                                return (
                                    <InformationViews.InfoSubContentContainer
                                        key={id}
                                        image={image}
                                        title={title}
                                        content={content}
                                        reverse={i % 2 === 0}
                                        id={id}
                                    />
                                );
                            })
                            : <BlockSpinner.SpinnerWrapper>
                                    <BlockSpinner.Spinner size={80} />
                                </BlockSpinner.SpinnerWrapper>
     
                    }
                </InformationViews.HowToWrapper>
            </InformationViews.PaymentsConteiner>
        </Block.Container>
    )
}

export default InformationLayout;