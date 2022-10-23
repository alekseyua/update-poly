import React, { useState, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import OrderingAddress from './OrderingAddress';


const OrderingAddressContainer = ({
  addressDilivery = {},
  values,
  role,
  
  setValues,
}) => {

  const { dispatch } = useStoreon();
  const [ stateMarquee, setStateMarquee ] = useState(true)

  const decorOpenModalAddAddress = () => {
    dispatch('modalAddAddress')

  };

  const searchAddressRenderData = (data) => {
    let paramsSearch = {
      q: data
    }
    dispatch('searchAddress', paramsSearch)
  };

  const setChooseAddress = (id, country) => {
    setValues({
      ...values,
      'selectedAdress': id
    })
    
    const paramsGetCountryAddress = {
      country: country
    }

    dispatch('getCountryDeliviry', paramsGetCountryAddress);

  }

  const updateAddressRenderData = (page) => {
    const paramsPage = {
      page: page
    }
    dispatch('getAdresses', paramsPage)
  }


return (
    <OrderingAddress
      setChooseAddress = { setChooseAddress }
      addressDilivery = { addressDilivery }
      setStateMarquee = { setStateMarquee }
      stateMarquee = { stateMarquee }
      values = { values }
      role = { role }

      searchAddressRenderData = { searchAddressRenderData }
      updateAddressRenderData = { updateAddressRenderData }
      decorOpenModalAddAddress = { decorOpenModalAddAddress }
    />
  )
};

export default React.memo(OrderingAddressContainer);
