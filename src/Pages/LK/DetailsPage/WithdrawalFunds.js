import React from 'react';
import Button from '../../../Views/Button';
import Text from '../../../helpers/Text';
import PersonalPageViews from '../../../Views/PersonalPageViews';

const WithdrawalFunds = ({ 
  openModalGetMyCache, 
}) => {

  return (
    <PersonalPageViews.WrapperForm>
      <PersonalPageViews.HeadingBlock title={'Возврат денежных средств в связи с отменой заказа'} />
      <PersonalPageViews.ContentBlock>
        <PersonalPageViews.SmallTextGray>
          Согласно п.5 Договора оказания услуг по подбору и выкупу одежды (публичная оферта).
           Вы можете запросить возврат денежных средств,
           воспользовавшись формой ниже. Необходимо приложить скан заполненного заявления
        </PersonalPageViews.SmallTextGray>
        <Button onClick={openModalGetMyCache} variant={'cabinet_default'} >
          Оформить возврат
        </Button>
      </PersonalPageViews.ContentBlock>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(WithdrawalFunds);
