import React, { useEffect, useState } from 'react';
import MyOrderViews from '../../../Views/MyOrderViews';
import BaseInfoOrder from './BaseInfoOrder';
import AddReview from '../../components/AddReview';
import { infoWhite } from '../../images';
import Text from '../../../helpers/Text';
import Table from '../../../Views/Table';
import Pagination from '../../Views/Pagination';
import { Link } from 'react-router-dom';
import ModalContentViews from '../../Views/ModalContentViews';
import { useStoreon } from 'storeon/react';
import classNames from 'classnames';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';
import GoBackToCartModalContent from '../GoBackToCartModalContent';
import Button from '../../../Views/Button';

const ItemsInOrder = ({
  dateFilterData,
  tableBodyData,
  currency, 
  statuses, 
  profile,
  orders,
 }) => {
  console.log('tableBodyData', tableBodyData)

  const [ dataUpdateCheck, setDataUpdateCheck ] =  useState(false);
  const { updatecurrency, dispatch }                      = useStoreon('updatecurrency');
  const [ stateClickDel, setStateClickDel ] = useState(false);
  const [ modalStates, setmodalStates]                          = useState({
    show: false,
    content: null,
    cusstomClassNameModalResize: null,
  });

  

const tableHeaderData = [
  [
    {
      content: <MyOrderViews.ThData>Дата</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>№ заказа</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>Получатель</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>Стоимость</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>Статус</MyOrderViews.ThData>,
    },
  ],
];

const createName = ({ first_name, last_name, middle_name }) => {
  if (last_name && first_name) return `${last_name} ${String(first_name[0]).toUpperCase()}.`;
  return <Text text={'ivalid.name'} />;
};

/**
 * соберет верстку для данных и отправит на пуш в масив с tr
 * @param {[]} data
 * @returns масив с собранными компонентами для таблицы
 */
const createTdForTable = (data = [], currency) => {
  let results = [];
  data.forEach((el,i) => {
    let tr = [];
    //!date
    tr.push({
      attr: { 'data-label': 'Дата' },
      content: el.created_at,
    });
    //!№ order
    tr.push({
      attr: { 'data-label': '№ заказа' },
      content: (
        <>
          {el.order_number.length ? (
            <Link to={el.order_number}>{el.order_number}</Link>
          ) : (
            'Товар не выбран'
          )}
        </>
      ),
    });
    //!full name
    tr.push({
      attr: { 'data-label': 'Получатель' },
      content: createName(el.address),
    });
    //!total count
    tr.push({
      attr: { 'data-label': 'Стоимость' },
      content: (
        <strong>
          {el.total ? el.total : 0} {currency}
        </strong>
      ),
    });
    //!status
    tr.push({
      attr: { 'data-label': 'Статус' },
      content: (
        <MyOrderViews.TdStatusData status={el.status.status} statusTitle={el.status.title} />
      ),
    });
      //удалить заказ
    el.status.status === 'payment_waiting' || el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ?
    tr.push({
      attr: { 'data-label': el.status.status === 'payment_waiting' ? 
                  'Отменить заказ' 
                  : el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ? //
                        'Убрать в архив'
                      : null
     },
      content: (
        <Button
          type="submit"
          disabled={el.status.status === 'payment_waiting'? !el.can_cancel : false } 
          variant='default' 
          onClick={(e)=> {
           el.status.status === 'payment_waiting' ? 
                (el.can_cancel? btnDelOrder(el) : null)
                  : el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ?
                    sendToArchive(el)
                    : null
          }}
        >
          {
            el.status.status === 'payment_waiting' ? 
              'Отменить' 
              : el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ?
                'Убрать в архив'
              : null  
          }

          {/* {'Отменить'} */}
        </Button>
      ),

    })
    : null;
    results.push(tr);
  });
  return results;
};


const getDataOrdersFilters = data => {
  dispatch('getOrders', data)
}


// *****************************************************************************************

const btnAddOrderItems = (el) => {  
  const params = {
    id: el.id
  }
  dispatch('addNumOrder', params)
//   window.localStorage.setItem('numOrder', el.id)
//  const result = await api.orderApi.listOrderItem()
//   history.push('catalog');
}

  // *****************************************************************************************

const btnDelOrder = (data) => {
  const params = {
    id: data.id
  }
  dispatch('cancelOrder', params)
  }
 //------------------------------------------------------------------------------------------------
 
 const sendToArchive = (data) => {
  const params = {
    id: data.id
  }
  dispatch('sendToArchive', params)
}


  const hideReviewBlock = () => {
    tableBodyData.shift();
  };

  // const openModalFinalyAddReview = (data) => {
  //   return setModalStates({
  //     content: (
  //       <ModalContentViews.ModalWrapper>
  //         <ModalContentViews.CloseBtn closeModal={closeModal} />
  //         <ModalContentViews.ContentBlock>
  //           <ModalContentViews.CenterPosition>
  //             <ModalContentViews.SuccessOrError
  //               closeModal={closeModal}
  //               success={data}
  //               content={'Неправильно введены данные!'}
  //             />
  //           </ModalContentViews.CenterPosition>
  //         </ModalContentViews.ContentBlock>
  //       </ModalContentViews.ModalWrapper>
  //     ),
  //     show: true,
  //     addClass: 'modal-success_error',
  //   });
  // };

  // const setDefaultTableBlock = () => {
  //   setTableBodyData([
  //     [
  //       {
  //         content: (
  //           tableBodyData ?
  //            null
  //             :(
  //           <MyOrderViews.InfoReview
  //             page_type_catalog={page_type_catalog}
  //           />)
  //         ),
  //         attr: { colSpan: 5, className: 'cabinet-table__tdfull not_hovered' },
  //       },
  //     ],
  //   ]);
  // };

  // useEffect(() => {
  //   // setDefaultTableBlock();
  // }, []);


  return (

    <>
      <BaseInfoOrder
        dateFilterData = { dateFilterData }
        statuses={statuses}
        // // activePage={activePage}
        // // loadData={loadData}
        orders = { orders }
        count={ orders?.count }

        getDataOrdersFilters = { getDataOrdersFilters }
      />
      <MyOrderViews.WrapperTable>
        <Table
          statusLoad={'loading'}
          classNameTable="cabinet-table"
          tableHeaderData={tableHeaderData}
          tableBodyData={createTdForTable(tableBodyData, currency)}
        />
        {/* <Pagination activePage={activePage} count={count} params={filterParams} /> */}
      </MyOrderViews.WrapperTable>
    </>
//     <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiOrder.getOrders} >
//       {(data) => {
//         const {
//           count,
//           results = [],
//           activePage,
//           loadData,
//           showMore,
//           status,
//           filterParams,
//           deleteElement,
//           updateElement,
//           deleteElementByKey,
//           updateElementByKey,
//           isNext,
//           isPrev,
//         } = data;
// //reload

// // *****************************************************
//         const executeUpdate = () => {
//           setDataUpdateCheck(false);
//           data.reload();
//         }
//         dataUpdateCheck?executeUpdate():null;
//         // *****************************************************

//         return (
//           <>
//             <GxModal
//               onGx-after-hide={closeModal}
//               open={modalStates.show}
//               className={classNames({
//                 [styleModal['modal_creator']]: true,
//                 [styleModal[modalStates.cusstomClassNameModalResize]]:
//                 modalStates.cusstomClassNameModalResize,
//               })}
//               >
//               <ModalContentViews.CloseBtn closeModal={closeModal} />
//               {modalStates.content}
//             </GxModal>

//             <BaseInfoOrder
//               statuses={statuses}
//               activePage={activePage}
//               loadData={loadData}
//               filterParams={filterParams}
//               count={count}
//             />
//             <MyOrderViews.WrapperTable>
//               <Table
//                 statusLoad={status}
//                 classNameTable="cabinet-table"
//                 tableHeaderData={tableHeaderData}
//                 tableBodyData={tableData}
//               />
//               <Pagination activePage={activePage} count={count} params={filterParams} />
//             </MyOrderViews.WrapperTable>
//           </>
//         );
//       }}
//     </FetcherList>
  );
};

export default React.memo(ItemsInOrder);
