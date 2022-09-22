import React from "react";
import Breadcrumbs from "../../../Views/Breadcrumbs";
import Block from '../../../Views/GridContainerBlock';
import InformationViews from '../../../Views/InformationViews'
import Title from "../../../Views/Title";
import Spinner from '../../../Views/SpinnerWrapper/Spinner'
import SpinnerWrapper from "../../../Views/SpinnerWrapper/SpinnerWrapper";

const PartnershipLayout = ({ title, subTitle, featureCard, subContent, breadcrumbs, registration_slug }) => {

  

    return (
        <Block.Container>
            {
                featureCard ?
                    <InformationViews.PaymentsConteiner>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <InformationViews.HowToWrapper>
                            <Title variant={'information-payments__title'} type={'h1'}>
                                {title}
                            </Title>
                            <InformationViews.SubTitle variant={'subtitle-partnership'}>
                                <div dangerouslySetInnerHTML={{ __html: subTitle }}></div>
                            </InformationViews.SubTitle>
                            <InformationViews.InfoCardBlock>
                                {
                                    featureCard ?
                                        featureCard.map((el) => {
                                            const { content, id, title } = el;
                                            return <InformationViews.InfoCard key={id} title={title} content={content} />;
                                        })
                                        : null
                                }
                            </InformationViews.InfoCardBlock>
                            <InformationViews.InfoSubBlock>
                                {
                                    subContent ?
                                        subContent.map((el, i) => {
                                            const { content, id, title, image } = el;
                                            return (
                                                <InformationViews.InfoSubContent
                                                    key={id}
                                                    image={image}
                                                    title={title}
                                                    content={content}
                                                    reverse={i % 2 === 0}
                                                    url={registration_slug}
                                                />
                                            )
                                        })
                                        : null
                                }
                            </InformationViews.InfoSubBlock>
                        </InformationViews.HowToWrapper>
                    </InformationViews.PaymentsConteiner>
                    : <SpinnerWrapper>
                        <Spinner size={100} />
                    </SpinnerWrapper>
            }
        </Block.Container>
    )
}

export default PartnershipLayout;