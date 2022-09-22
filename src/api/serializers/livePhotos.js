import dayjs from '../../helpers/dayjs';
import api from '../../api/AbstractBaseApi';

const livePhotosSerializer = (live_photos = []) => {
  return live_photos.map((el) => {
    return {
      ...el,
      brand: el.brand,
      ordering: el.ordering,
      image: el.image,
      title: el.title,
      is_active: el.is_active,
      slug: el.slug,
      id: el.id,
      created_at: dayjs(api.language, el.created_at).format('DD.MM.YYYY'),
      updated_at: dayjs(api.language, el.updated_at).format('DD.MM.YYYY'),
      content: el.content,
    };
  });
};

export default livePhotosSerializer;
