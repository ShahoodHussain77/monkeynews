import _ from "lodash";
import { DELTA_LOCATION } from "../constants";

const getFilteredServiceProviders = listData => {
  const filteredData = _.filter(listData, o => o.details.latitude !== null);
  return filteredData.map(data => ({
    id: data.id,
    name: data.name,
    designation: data.details.designation || "",
    rating: data.details.average_rating,
    ratingCount: data.details.review_count,
    image: data.details.image_url,
    latitude: !_.isNull(data.details.latitude)
      ? parseFloat(data.details.latitude)
      : null,
    longitude: !_.isNull(data.details.longitude)
      ? parseFloat(data.details.longitude)
      : null,
    phone: data.details.phone || "",
    email: data.email,
    service_types: _.map(data.service_types, "id"),
    ...DELTA_LOCATION,
    reviews: [],
    address: data.details.address,
    about: data.details.about
  }));
};

const getfiltersReviewsData = listData => {
  const filteredData = _.filter(listData, o => o.id !== null);
  return filteredData.map(data => ({
    comment: data.comment,
    instance_id: data.instance_id,
    instance_type: data.instance_type,
    rating: data.rating,
    user_id: data.user_id
  }));
};

export { getFilteredServiceProviders, getfiltersReviewsData };
