import classNames from 'classnames';
import React from 'react';
import {statusSend} from '../../../images';
import Icon from '../../Icon';

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
  values, 
  profile,
  street,
  selectedAdress,
  setFieldValue,
  setFieldCountry,
  handleChange,
  setStateMarquee,
  stateMarquee,
  setChooseAddress,
}) => {

  const styleContainer = classNames({
    [style['ordering__address-card']]: true,
    [style['ordering__address-card--active']] : values.selectedAdress === id
  })
  return (
    // <GxTooltip 
    //   content="сдесь можно выбрать адрес доставки"
    //   placement="top-start"
    // >
      // <Radio
      <div
        id={ id }
        onClick = {(e) => {
          setStateMarquee(false)
          setChooseAddress(id, country)
        }}
        name = { "address" }
        className={ styleContainer }
      >
        { 
          values.selectedAdress === id?
            <Icon
              slot="icon-left"
              src={statusSend}
              className="cabinet_orders_details__base_info__icon"
              height={20} 
              width={20}
            />
            :null
        }
        <p className={style['ordering__address-card-address']}>
          {country}, {post_code}, {city}, {street}, {house}, {flat}
        </p>
        <p className={style['ordering__address-card-client']}>
          {last_name} {first_name} {middle_name}, {phone}
        </p>
     {/* </Radio> */}
     </div>
    // </GxTooltip>
  );
};

export default React.memo(OrderingAddressItem);
