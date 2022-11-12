import React from 'react';
import PaymentLayoutContainer from './PaymentLayout/PaymentLayoutContainer';

const initialState = {
  retailPaymentsInfo: '',
  dropPaymentsInfo: '',
  woosalePaymentsInfo: '',
};

const InformationPayments = (props) => {

  
  const { page_info, profile, breadcrumbs, info_payment } = props.context;
  const { title } = page_info;
  const { role } = profile;
  console.log('props InformationPayments', props)
  
    // const [state, setState] = useState({ initialState });
  // const {
  //   cabinet_menu,
  //   create_shop,
  //   cabinet_site_menu,
  //   profile,
  //   info_payment,
  //   breadcrumbs = [],
  // } = props;
  // const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  // const { is_has_shop, shop_link } = shop;
  // const { username = '' } = user;
  // //todo: можно пропсом кастрировать футер


  // useEffect(() => {
  //   let whosaleInfo, retailInfo, dropInfo;
  //   info_payment.forEach((el) => {
  //     if (el.role === ROLE.WHOLESALE) {
  //       whosaleInfo = el.payment_info;
  //     } else if (el.role === ROLE.RETAIL) {
  //       retailInfo = el.payment_info;
  //     } else {
  //       dropInfo = el.payment_info;
  //     }
  //   });
  //   setState({
  //     retailPaymentsInfo: retailInfo,
  //     dropPaymentsInfo: dropInfo,
  //     woosalePaymentsInfo: whosaleInfo,
  //   });
  // }, [info_payment]);
  return (
    <PaymentLayoutContainer
      breadcrumbs={breadcrumbs}
      info_payment={info_payment}
      role={role}
      title={title}
    />
  );
};

export default React.memo(InformationPayments);
