const serializeAddressDeliveryPost = (data, profileId) => {
    return {
      profile: profileId,
      post_code: data.post_code,
      country: data.country,
      city: data.city,
      street: data.street,
      house: data.house,
      flat: data.flat,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      phone: data.phone,
    };
  };
  export default serializeAddressDeliveryPost