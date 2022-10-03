import React from 'react';
import OrderingViews from '../../../../Views/OrderingViews';
import { ROLE } from '../../../../const';
import Pagination from '../../../../Views/Pagination';


const OrderingAddress = ({
  role = 2,
  selectedAdress,
  setFieldValue,
  setFieldCountry,
  handleChange,
  searchAddressRenderData,
  adresses = [],
  decorOpenModalAddAddress,
}) => {

  return (
    <OrderingViews.OrderingAddress>
      <OrderingViews.OrderingAddressHead 
        role={role}
      />
      {/* Поиск по ФИО только для дропа */}
      {role === ROLE.DROPSHIPPER ? (
        <OrderingViews.OrderingAddressSearcheInput
          searchAddressRenderData={searchAddressRenderData}
        />
      ) : null}
      
      {
        adresses.map((res) => {
          const {
            city,
            country,
            first_name,
            flat,
            house,
            id,
            last_name,
            middle_name,
            phone,
            post_code,
            profile,
            street,
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
              selectedAdress={selectedAdress}
              setFieldValue={setFieldValue}
              setFieldCountry={setFieldCountry}
              handleChange={handleChange}
              setStateMarquee={setStateMarquee}
              stateMarquee={stateMarquee}
            />
          );
        })
      }
      
      {/* <Pagination allCount={allCount} searchCount={searchCount.length} count={30} location={'center'} handlerChange={updateAddressRenderData} /> */}

      {/* Для розницы и опта максимум 3 адреса. Если их меньше, то появляется кнопка добавить адрес 
          У дропа кнопка есть всегда */}
    {
    (role !== ROLE.DROPSHIPPER && adresses.length > 2)
        ?null
        :<OrderingViews.OrderingAddressAddBtn onClick={decorOpenModalAddAddress} />
    }

    </OrderingViews.OrderingAddress>
  );
};

export default React.memo(OrderingAddress);
//export default OrderingAddress;