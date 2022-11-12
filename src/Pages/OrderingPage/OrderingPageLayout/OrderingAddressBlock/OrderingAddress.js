import React from 'react';
import OrderingViews from '../../../../Views/OrderingViews';
import { ROLE } from '../../../../const';
import Pagination from '../../../../Views/Pagination';


const OrderingAddress = ({
  addressDilivery,
  selectedAdress,
  handleChange,
  stateMarquee,
  values,
  role,
  
  setFieldValue,
  setFieldCountry,
  setStateMarquee,  
  
  setChooseAddress,
  searchAddressRenderData,
  decorOpenModalAddAddress,
  updateAddressRenderData,

}) => {

  return (
    <OrderingViews.OrderingAddress>
      <OrderingViews.OrderingAddressHead 
        role={role}
      />
      {/* Поиск по ФИО только для дропа */}
      {
        role === ROLE.DROPSHIPPER ? (
          <OrderingViews.OrderingAddressSearcheInput
            searchAddressRenderData={searchAddressRenderData}
          />
          ) : null
      }
      
      {        
      Object.keys(addressDilivery).length?
        addressDilivery.results.map((res) => {
          const {
            id,
            flat,
            city,
            phone,
            house,
            street,
            profile,
            country,
            last_name,
            post_code,
            first_name,
            middle_name,
          } = res;

          return (
            <OrderingViews.OrderingAddressItem
              key={id}
              city={city}
              country={country}
              first_name={first_name}
              flat={flat}
              house={house}
              id={id}
              last_name={last_name}
              middle_name={middle_name}
              phone={phone}
              post_code={post_code}
              profile={profile}
              street={street}
              values = { values }

              selectedAdress={selectedAdress}
              setFieldCountry={setFieldCountry}
              handleChange={handleChange}
              setStateMarquee={setStateMarquee}
              stateMarquee={stateMarquee}
              setChooseAddress = { setChooseAddress }
            />
          );
        })
        : (null)
      }
      
      {
        Object.keys(addressDilivery).length?
          <Pagination allCount={addressDilivery?.count} searchCount={addressDilivery?.results.length} count={30} location={'center'} handlerChange={updateAddressRenderData} />
        : null
      }

      {/* Для розницы и опта максимум 3 адреса. Если их меньше, то появляется кнопка добавить адрес 
          У дропа кнопка есть всегда */}
    {
      Object.keys(addressDilivery).length?
        (role !== ROLE.DROPSHIPPER && addressDilivery?.results.length > 2)
            ?null
            :<OrderingViews.OrderingAddressAddBtn onClick={decorOpenModalAddAddress} />
        : null
    }

    </OrderingViews.OrderingAddress>
  );
};

export default React.memo(OrderingAddress);
//export default OrderingAddress;