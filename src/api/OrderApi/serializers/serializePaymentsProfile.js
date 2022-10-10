import dayjs from '../../../helpers/dayjs';
import Api from '../../api';

const serializePaymentsProfile = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      date: dayjs(Api.language, el.created_at).format('DD.MM.YYYY'),
    };
  });
  return data;
};
export default serializePaymentsProfile
