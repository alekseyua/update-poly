import React from 'react';
import { statusSend, statusWait } from '../../../images';
import Button from '../../../Views/Button';
import Text from '../../../helpers/Text';
import PersonalPageViews from '../../../Views/PersonalPageViews';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';

const Balance = ({
  passive_balance,
  currency,
  balance,

  openModalTopUpYouBalance
}) => {

  return (
    <React.Fragment>
      <PersonalPageViews.WrapperForm>
        <PersonalPageViews.HeadingBlock title={Text({ text: 'balance' })} />
        <PersonalPageViews.ContentBlock>
          <PersonalPageViews.SmallTextGray>
            В данном разделе Вы можете пополнять баланс.  <strong>После подтверждения </strong>зачисления денежных средств, администратор переводит их в статус <strong>«доступно»</strong>.
          </PersonalPageViews.SmallTextGray>
          <PersonalPageViews.BalanceItemsWrapper>
            {
              balance || balance === 0 ?
                <>
                  <PersonalPageViews.BalanceItem
                    greenText
                    icon={statusSend}
                    value={`${balance} ${String(currency).toUpperCase()}`}
                    text={'Доступно'}
                  />

                  <PersonalPageViews.BalanceItem
                    icon={statusWait}
                    value={`${passive_balance} ${String(currency).toUpperCase()}`}
                    text={'К зачислению'}
                  />
                </>
                : <Spinner sizeWidth='25' />
            }

          </PersonalPageViews.BalanceItemsWrapper>
          <Button
            onClick={openModalTopUpYouBalance}
            variant={'cabinet_default'}
          >
            пополнить баланс
          </Button>
        </PersonalPageViews.ContentBlock>
      </PersonalPageViews.WrapperForm>
    </React.Fragment>
  );
};

export default React.memo(Balance);
