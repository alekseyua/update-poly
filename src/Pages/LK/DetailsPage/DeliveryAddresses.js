import React, { useState } from 'react';
import Text from '../../../helpers/Text';
import qs from 'query-string';
import { searchIcon } from '../../../images';

import PersonalPageViews from '../../../Views/PersonalPageViews';
import Input from '../../../Views/Input';
import Icon from '../../../Views/Icon';

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
  const resultsAdress = addressDilivery?.results ?? [];
  const [modalStates, setModalStates] = useState({ show: false, content: null, initialData: {} });
  const [typeModal, setTypeModal] = useState('');
  const [search, setSearch] = useState('');
  const [state, setState] = useState(initialState);

  const updateAddressRenderData = (page=1) => {
   
  };


  const changeAddress = (data) => {
  
  };

  const deleteAddress = (id) => {
   
  };

  const createAddress = (data) => {

  };

  const searchAddressRenderData = (data) => {
   
  };

  const handleChangeSearchInput = (data) => {
    
  };


  const initialFilters = { page: 1, page_size: 5, ...qs.parse(search) };

  return (
    <PersonalPageViews.WrapperForm>
      <div  dataintro="step10">
        <PersonalPageViews.HeaderFormDefaultTitle title={Text({ text: 'address.delivery' })} />
        <PersonalPageViews.FormBlockContent>
          <PersonalPageViews.FormGroup>
            <Input
              value={search}
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
        
            {/* <Pagination allCount={state.count} searchCount={state.search.length} count={30} location={'center'} handlerChange={updateAddressRenderData} /> */}

        </PersonalPageViews.FormBlockContent>
      </div>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(DeliveryAddresses);
