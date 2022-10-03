import React, { useState, useEffect } from 'react';
import OrderingAddress from './OrderingAddress';


const OrderingAddressContainer = ({
  role = 2,
  selectedAdress,
  setFieldValue,
  openModalAddAddress, 
  profileId,
  closeModal,
  setFieldCountry,
  handleChange,
}) => {
  const [adresses, setadresses] = useState([]);
  const [stateMarquee, setStateMarquee] = useState(true)
  const [ allCount, setAllCount ] = useState(0);
  const [ searchCount, setSearchCount ] = useState([]);

  
//   const getAdresses = (page=1) => {
//     const params = {
//       page: page
//     }
//     orderApi
//       .getOrderAddressDeliviry(params)
//       .then((res) => {
//         setadresses(res.results);
//         setAllCount(res.count);
//       });
//   };

//   const updateAddressRenderData = (page) => {
//     getAdresses(page);
//     closeModal();
//   };

//   const decorOpenModalAddAddress = () => {
//     const content = (
//       <ModalAddAddress
//         updateAddressRenderData={updateAddressRenderData}
//         typeModal={'create'}
//         profileId={profileId}
//         closeModal={closeModal}
//         initialData={{}}
//       />
//     );
//     return openModalAddAddress(content);
//   };

//   const searchAddressRenderData = (data) => {
//     orderApi
//       .getOrderAddressSearch({ q: data })
//       .then((res) => {
//         setadresses(res);
//         console.log('res****--*/***-', res)
//         setSearchCount(c=> [...c, ...res])
//       });
//   };

//   useEffect(() => {
//     getAdresses();
//   }, []);


  return (
    <OrderingAddress

    />
  );
};

export default React.memo(OrderingAddressContainer);
