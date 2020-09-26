import _ from "lodash";
import Util from "../util";
const getFilterDates = listData => {
  const filteredData = _.filter(listData, o => o.id !== null);
  
  return filteredData.map(data => ({
    id: data.id,
    name: Util.getFormattedDateTime(data.start_class_time.substring(10,0),"MM-DD-YYYY"),
    class_type:data.class_type,
    end_class_time:data.end_class_time,
    lat:data.lat,
    length:data.length,
    location:data.location,
    start_class_time:data.start_class_time,
    std_num:data.std_num,
    trainer_name:data.trainer_name,
    lng:data.lng
  }));
};

const generateFormData = (payload) => {
  const formData = new FormData();
  for( let key in payload ) {
    formData.append(key, payload[key])
  }
  return formData;
}


export { getFilterDates, generateFormData };
