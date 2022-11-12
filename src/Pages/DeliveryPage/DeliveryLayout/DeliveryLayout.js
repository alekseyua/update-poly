import React from "react";
import Block from '../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import InformationViews from '../../../Views/InformationViews';
import { ROLE } from '../../../const';
import Title from "../../../Views/Title";
import SpinnerWrapper from '../../../Views/SpinnerWrapper/SpinnerWrapper';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';
import Text from "../../../helpers/Text";

const DeliveryLayout = ({ breadcrumbs, role, title = '', retailData ='', whosaleData = '', dropData = '' }) => {
    return (
        <>
        {
            
            
                <Block.Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <InformationViews.PaymentsConteiner>
                <Title variant={'information-payments__title'} type={'h1'}>
                    {
                    !title?
                        Text({text: 'info-delivery'})
                        : title                    
                    }
                </Title>
            </InformationViews.PaymentsConteiner>
            {
            
            !!retailData || !!whosaleData || !!dropData?
                role === ROLE.RETAIL ?
                    (<React.Fragment>
                        <InformationViews.PaymentsTextBlock>
                            <InformationViews.PaymentsTitle>{retailData.title}</InformationViews.PaymentsTitle>
                            <InformationViews.PaymentsDescription>
                                <div dangerouslySetInnerHTML={{ __html: retailData.content }}></div>
                            </InformationViews.PaymentsDescription>
                        </InformationViews.PaymentsTextBlock>{' '}
                    </React.Fragment>
                    ) : role === ROLE.WHOLESALE ?
                        (<React.Fragment>
                            <InformationViews.PaymentsTextBlock>
                                <InformationViews.PaymentsTitle>{whosaleData.title}</InformationViews.PaymentsTitle>
                                <InformationViews.PaymentsDescription>
                                    <div dangerouslySetInnerHTML={{ __html: whosaleData.content }}></div>
                                </InformationViews.PaymentsDescription>
                            </InformationViews.PaymentsTextBlock>{' '}
                        </React.Fragment>
                        ) : role === ROLE.DROPSHIPPER ?
                            (<React.Fragment>
                                <InformationViews.PaymentsTextBlock>
                                    <InformationViews.PaymentsTitle>{dropData.title}</InformationViews.PaymentsTitle>
                                    <InformationViews.PaymentsDescription>
                                        <div dangerouslySetInnerHTML={{ __html: dropData.content }}></div>
                                    </InformationViews.PaymentsDescription>
                                </InformationViews.PaymentsTextBlock>{' '}
                            </React.Fragment>
                            ) : role === ROLE.UNREGISTRED ?
                                (<>
                                    <React.Fragment>
                                        <InformationViews.PaymentsTextBlock>
                                            <InformationViews.PaymentsTitle>{retailData.title}</InformationViews.PaymentsTitle>
                                            <InformationViews.PaymentsDescription>
                                                <div dangerouslySetInnerHTML={{ __html: retailData.content }}></div>
                                            </InformationViews.PaymentsDescription>
                                        </InformationViews.PaymentsTextBlock>{' '}
                                    </React.Fragment>
                                    <React.Fragment>
                                        <InformationViews.PaymentsTextBlock>
                                            <InformationViews.PaymentsTitle>{whosaleData.title}</InformationViews.PaymentsTitle>
                                            <InformationViews.PaymentsDescription>
                                                <div dangerouslySetInnerHTML={{ __html: whosaleData.content }}></div>
                                            </InformationViews.PaymentsDescription>
                                        </InformationViews.PaymentsTextBlock>{' '}
                                    </React.Fragment>
                                    <React.Fragment>
                                        <InformationViews.PaymentsTextBlock>
                                            <InformationViews.PaymentsTitle>{dropData.title}</InformationViews.PaymentsTitle>
                                            <InformationViews.PaymentsDescription>
                                                <div dangerouslySetInnerHTML={{ __html: dropData.content }}></div>
                                            </InformationViews.PaymentsDescription>
                                        </InformationViews.PaymentsTextBlock>{' '}
                                    </React.Fragment>
                                </>
                                ) : null
                                
                : <SpinnerWrapper>
                    <Spinner size={80} />
                </SpinnerWrapper>
            }
                </Block.Container>
        }
        </>
    )
}

export default DeliveryLayout;


