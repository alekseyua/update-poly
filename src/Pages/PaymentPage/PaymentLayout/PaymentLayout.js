import React from "react";
import { ROLE } from "../../../const";
import Block from '../../../Views/GridContainerBlock';
import InformationViews from '../../../Views/InformationViews';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Title from "../../../Views/Title";

const PaymentLayout = ({breadcrumbs, retailPaymentsInfo, woosalePaymentsInfo, dropPaymentsInfo, role, title }) => {
    return(
        <>
        {
            retailPaymentsInfo || woosalePaymentsInfo || dropPaymentsInfo?
      <Block.Container>
        <InformationViews.PaymentsConteiner>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Title variant={'information-payments__title'} type={'h1'}>
            {/* <Text text={'info.payments'} /> */}
            {title}
          </Title>
          {role === ROLE.RETAIL ? (
            <>
              <InformationViews.PaymentsTextBlock>
                <InformationViews.PaymentsTitle>
                  Для розничного покупателя
                </InformationViews.PaymentsTitle>
                <InformationViews.PaymentsDescription content={retailPaymentsInfo} />
              </InformationViews.PaymentsTextBlock>
            </>
          )
            : role === ROLE.WHOLESALE ? (
              <>
                <InformationViews.PaymentsTextBlock>
                  <InformationViews.PaymentsTitle>
                    Для оптового покупателя
                  </InformationViews.PaymentsTitle>
                  <InformationViews.PaymentsDescription content={woosalePaymentsInfo} />
                </InformationViews.PaymentsTextBlock>
              </>
            )
              : role === ROLE.DROPSHIPPER ? (
                <>
                  <InformationViews.PaymentsTextBlock>
                    <InformationViews.PaymentsTitle>
                      Для дропшиппера
                    </InformationViews.PaymentsTitle>
                    <InformationViews.PaymentsDescription content={dropPaymentsInfo} />
                  </InformationViews.PaymentsTextBlock>
                </>
              ) : role === ROLE.UNREGISTRED ? (
                <>
                  <InformationViews.PaymentsTextBlock>
                    <InformationViews.PaymentsTitle>
                      Для розничного покупателя
                    </InformationViews.PaymentsTitle>
                    <InformationViews.PaymentsDescription content={retailPaymentsInfo} />
                  </InformationViews.PaymentsTextBlock>
                  <InformationViews.PaymentsTextBlock>
                    <InformationViews.PaymentsTitle>
                      Для оптового покупателя
                    </InformationViews.PaymentsTitle>
                    <InformationViews.PaymentsDescription content={woosalePaymentsInfo} />
                  </InformationViews.PaymentsTextBlock>
                  <InformationViews.PaymentsTextBlock>
                    <InformationViews.PaymentsTitle>
                      Для дропшиппера
                    </InformationViews.PaymentsTitle>
                    <InformationViews.PaymentsDescription content={dropPaymentsInfo} />
                  </InformationViews.PaymentsTextBlock>
                </>
              ) : null
          }
        </InformationViews.PaymentsConteiner>
      </Block.Container>
        : <BlockSpinner.SpinnerWrapper>
            <BlockSpinner.Spinner size={80} />
        </BlockSpinner.SpinnerWrapper>    
    }
        </>
    )
}

export default PaymentLayout;