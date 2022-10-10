import dayjs from '../../../helpers/dayjs';
import Api from '../../api';

const serializeOrderData = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      created_at: dayjs(Api.language, el.created_at).format('DD.MM.YYYY'),
      updated_at: dayjs(Api.language, el.updated_at).format('DD.MM.YYYY'),
    };
  });
  return data;
};
export default serializeOrderData

