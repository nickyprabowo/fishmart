import { http } from "common/utility/http-client"
const ALL_COMMODITIES_API = `${process.env.REACT_APP_COMMODITY_LIST}`;

export const getCommodities = async () => {
  try {
    const response = await http.get(ALL_COMMODITIES_API);
    return response.data
  } catch (error) {
    return error;
  }
};
