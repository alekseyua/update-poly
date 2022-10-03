import React from 'react';
import {statusSend} from '../../../images';

import style from '../styles/index.module.scss';

const OrderingAddressItem = ({
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
  selectedAdress,
  setFieldValue,
  setFieldCountry,
  handleChange,
  setStateMarquee,
  stateMarquee,
}) => {

  return (
    // <GxTooltip 
    //   content="сдесь можно выбрать адрес доставки"
    //   placement="top-start"
    // >
      // <Radio
      <div
        // checked={selectedAdress === id ? true : null}
        id={id}
        onClick={(e) => {
          setStateMarquee(false)
          setFieldValue('selectedAdress', id);
          setFieldCountry(country);
          handleChange(country)
        }}
        name="address"
        className={style['ordering__address-card']}
      >
        <p className={style['ordering__address-card-address']}>
          {country}, {post_code}, {city}, {street}, {house}, {flat}
        </p>
        <p className={style['ordering__address-card-client']}>
          {last_name} {first_name} {middle_name}, {phone}
        </p>
        { selectedAdress === id?
          <Icon
            slot="icon-left"
            src={statusSend}
            className="cabinet_orders_details__base_info__icon"
          />
          :null
        }
     {/* </Radio> */}
     </div>
    // </GxTooltip>
  );
};

export default React.memo(OrderingAddressItem);
