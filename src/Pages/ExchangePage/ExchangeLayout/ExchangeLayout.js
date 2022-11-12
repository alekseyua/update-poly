import React from 'react';
import Block from '../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import InformationViews from '../../../Views/InformationViews';
import Title from '../../../Views/Title';
import SpinnerWrapper from '../../../Views/SpinnerWrapper/SpinnerWrapper';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';


const ExchangeLayout = ({breadcrumbs, title, content }) => {
    return (
        <>
        {
            title || content?
                <Block.Container>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <InformationViews.PaymentsConteiner>
                        <Title variant={'information-payments__title'} type={'h1'}>
                            {title}
                        </Title>
                        <React.Fragment>
                        <InformationViews.HowToWrapper>
                            <InformationViews.BlockHowTo>
                                <InformationViews.ContainerMin>
                                    {/* <InformationViews.PaymentsDescription>
                <div dangerouslySetInnerHTML={{ __html: page_info.content }}></div>
                </InformationViews.PaymentsDescription> */}
                                    <InformationViews.PaymentsDescription content={content} />
                                </InformationViews.ContainerMin>
                            </InformationViews.BlockHowTo>
                        </InformationViews.HowToWrapper>
                        </React.Fragment>

                    </InformationViews.PaymentsConteiner>
                </Block.Container>
                : <SpinnerWrapper>
                    <Spinner size={80} />
                </SpinnerWrapper>
        }
        </>
        )
}

export default ExchangeLayout;

