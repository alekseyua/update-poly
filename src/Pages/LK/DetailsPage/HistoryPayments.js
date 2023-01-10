import React, { useEffect, useState } from 'react';
import MyOrderViews from '../../../Views/MyOrderViews';
import { btnDown, btnLoad, statusWait } from '../../../images';
import Text from '../../../helpers/Text';
import Table from '../../../Views/Table';
import Pagination from '../../../Views/Pagination';
import PersonalPageViews from '../../../Views/PersonalPageViews';
import Button from '../../../Views/Button';
import Title from '../../../Views/Title';
import Input from '../../../Views/Input';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import Offset from '../../../Views/Offset';

const HistoryPayments = ({
  changePaginationsPayments,
  confirm_payments_cost,
  historyPayment,
  isLoading,
  currency,
}) => {

  const fileInputRef = React.useRef(null);

  const addCheck = (e, dataFeth) => {

    // dataFeth.updateElementByKey( 
    //   {
    //     ...dataFeth.obj,
    //     receipt: 'treatment',
    //   },
    //   dataFeth.obj.id,
    //   'id',
    // );
    // let dataRequest = new FormData();
    // dataRequest.set('receipt', e.currentTarget.files[0]);
    // dataRequest.set('order', dataFeth.obj.order);
    // apiOrder
    //   .updateReceipt(dataFeth.obj.id, dataRequest)
    //   .then((res) => {
    //     dataFeth.updateElementByKey(
    //       {
    //         ...dataFeth.obj,
    //         receipt: res.data.receipt,
    //       },
    //       dataFeth.obj.id,
    //       'id',
    //     );
    //   })
    //   .catch((err) => {
    //     dataFeth.updateElementByKey(
    //       {
    //         ...dataFeth.obj,
    //         receipt: null,
    //       },
    //       dataFeth.obj.id,
    //       'id',
    //     );

    //   });
  };

  const tableHeaderData = [
    [
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'date'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'beneficiary.account'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'status'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'comment'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'amount'} />, {String(currency).toUpperCase()}
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'receipt'} />
          </MyOrderViews.ThData>
        ),
      },
    ],
  ];
  /**
   * соберет верстку для данных и отправит на пуш в масив с tr
   * @param {[]} data
   * @returns масив с собранными компонентами для таблицы
   */
  const [numIndex, setNumIndex] = useState(null);

  const handleRequisites = (e) => {
    const indexElement = e.target.getAttribute('data-index');
    setNumIndex(+indexElement)
  }
  useEffect(() => {
    const onClick = e => {
      e.target.className === ('requisites') || setNumIndex(null)
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick)
  }, [])

  const createTdForTable = (data = [], currency) => {
    let results = [];

    data.forEach((el, i) => {
      let tr = [];
      //!Дата
      tr.push({
        attr: { 'data-label': 'Дата' },
        content: el.date,
      });
      //!Счёт получателя
      tr.push({
        attr: { 'data-label': 'Счёт получателя' },
        content: <div
          key={i}
          data-index={i}
          className='requisites'
          style={{
            height: i === numIndex ? 'auto' : '50px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={handleRequisites}
          dangerouslySetInnerHTML={{ __html: el.requisites.requisites }}
        >
        </div>,
      });
      //!Статус
      tr.push({
        attr: { 'data-label': 'Статус' },
        content: <PersonalPageViews.BalanceStatus status={el.status} />,
      });
      //!Комментарий
      tr.push({
        attr: { 'data-label': 'Комментарий' },
        content: el.comment,
      });
      //!Сумма
      tr.push({
        attr: { 'data-label': 'Сумма' },
        content: (
          <strong>
            {el.cost ? el.cost : 0} {currency}
          </strong>
        ),
      });
      //!Чек
      if (el.receipt === 'treatment') {
        tr.push({
          attr: { 'data-label': 'Чек' },
          content: (
            <Button variant={'linkBtn'} type={'link'} href={el.receipt} iconLeft={statusWait}>
              <Text text={'file.processing'} />
            </Button>
          ),
        });
      } else {
        tr.push({
          attr: { 'data-label': 'Чек' },
          content: el.receipt ? (
            <Button
              variant={'linkBtn'}
              type={'link'}
              href={`//${el.receipt.split('https://')[1]}`}
              target={'_blank'}
              iconLeft={btnDown}>
              <Text text={'download'} />
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                if (e.target.childNodes.length) {
                  fileInputRef.current.click();
                }
              }}
              variant={'linkBtn'}
              type={'file'}
              iconLeft={btnLoad}
            >
              <Text text={'attach'} />
              <Input
                ref={fileInputRef}
                onChange={(e) => addCheck(e, { obj: el })}
                className={'hidden'}
                type={'file'}
              />
            </Button>
          ),
        });
      }

      results.push(tr);
    });
    return results;
  };

  return (
    <MyOrderViews.WrapperTable>
      <Title variant={'cabinet__heading'} type={'h3'}>
        <Text text={'history.payments'} />
      </Title>
      
      <PersonalPageViews.InfoPayWrapper>
        <PersonalPageViews.InfoPayText>
          Сумма всех платежей {confirm_payments_cost} {' '} {currency}
        </PersonalPageViews.InfoPayText>
        <PersonalPageViews.InfoPayGreyText>
          * Общая сумма всех подтвержденных админом платежей
        </PersonalPageViews.InfoPayGreyText>
      </PersonalPageViews.InfoPayWrapper>

      <Table
        statusLoad={'loading'}
        classNameTable="cabinet-table"
        tableHeaderData={tableHeaderData}
        tableBodyData={createTdForTable(historyPayment.results, currency)}
      />
      {
        isLoading?
          !!historyPayment.results.length?
            <Pagination
              allCount={historyPayment?.count ?? 0}
              count={10}
              handlerChangePaginations={changePaginationsPayments}
            />
            : <Title variant={'lk-message'} type={'h1'}>
                  <Offset offset={20} />
                  У Вас нет ни одного платежа
                  <Offset offset={20} />
              </Title> 
          : 
              <BlockSpinner.SpinnerWrapper>
                <BlockSpinner.Spinner sizeWith={40} sizeHeight={40} />
              </BlockSpinner.SpinnerWrapper>

      }
    </MyOrderViews.WrapperTable>
  );
};

export default React.memo(HistoryPayments);
