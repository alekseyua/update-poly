import React, { useState } from 'react';
import Text from '../../../helpers/Text';
import { searchIcon } from '../../../images';

import PersonalPageViews from '../../../Views/PersonalPageViews';
import Input from '../../../Views/Input';
import Icon from '../../../Views/Icon';
import { useStoreon } from 'storeon/react';
import Pagination from '../../../Views/Pagination';
import Button from '../../../Views/Button';

const initialState = { 
  addresses: [],
  count: 1,
  isLoad: false,
  search: [],
};

const DeliveryAddresses = ({ 
  profileId,
  addressDilivery,
}) => {
  const { dispatch } = useStoreon();
  const resultsAdress = addressDilivery?.results ?? [];
  const [state, setState] = useState(initialState);

  console.log({resultsAdress})
  const updateAddressRenderData = (page=1) => {
   
  };


  const changeAddress = (id) => {
    dispatch('modalChangeAddress', {idAddress: +id})
  };

  const deleteAddress = (id) => {
   dispatch('deleteAddresDelivery', { idAddress: +id })
  };

  const createAddress = () => {
    dispatch('modalAddAddress')
  };

  const searchAddressRenderData = (data) => {
   console.log({q1: data})
  };

  const handleChangeSearchInput = (data) => {
    console.log({q: data})
    dispatch('searchAddress', {q: data.target.value})
  };

  const handlerChangePaginations = (page) => {
    dispatch('getAdresses', {
      page: page
    })
  }

  const showMore = () => {
    console.log(addressDilivery?.results.length, addressDilivery?.count)
    dispatch('moreAddress')
  }

 return (
    <PersonalPageViews.WrapperForm>
      <div  dataintro="step10">
        <PersonalPageViews.HeaderFormDefaultTitle title={Text({ text: 'address.delivery' })} />
        <PersonalPageViews.FormBlockContent>
          <PersonalPageViews.FormGroup>
            <Input
              value={addressDilivery?.textSearch? addressDilivery?.textSearch : ''}
              name={'searchAddress'}
              autocomplete={'off'}
              onChange={handleChangeSearchInput}
              clearable
              className={''}
              helpText={''}
              label={''}
              placeholder={'Поиск по адресу'}
              inputmode={'search'}
            >
              <Icon src={searchIcon} alt="search" slot={'prefix'} height={20} width={20} />
            </Input>
          </PersonalPageViews.FormGroup>

          <PersonalPageViews.AdresesWrapper>
            <PersonalPageViews.AddAdress onClick={createAddress} />
            {state.isLoad ? <Spinner /> : null}
            {
              resultsAdress.length?
              resultsAdress.map((el) => {
                return (
                  <PersonalPageViews.Address
                    {...el}
                    id={el.id}
                    key={el.id}
                    address={`${el.post_code}, ${el.street}`}
                    userFullName={`${el.first_name} ${el.last_name} ${el.middle_name}`}
                    phone={el.phone}
                    changeAddress={changeAddress}
                    deleteAddress={deleteAddress}
                  />
                );
              })
              : null
            } 
          </PersonalPageViews.AdresesWrapper>
        
         {
           addressDilivery?.results.length < addressDilivery?.count && addressDilivery?.currentPage * 30 < addressDilivery?.count? (
             <Button full onClick = { showMore } variant = { 'show_more' }>
               <Text text = { 'show.more' } />
             </Button>
           ) : null
         }

         <Pagination
           location = { 'center' }
           count = { 30 }
           allCount = { addressDilivery?.count }
           currentPage={ addressDilivery?.currentPage ?? 1}
           handlerChangePaginations = { handlerChangePaginations }
         />

        </PersonalPageViews.FormBlockContent>
      </div>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(DeliveryAddresses);
