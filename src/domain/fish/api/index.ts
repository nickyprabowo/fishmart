import { http } from "common/utility/http-client"
import { Commodities } from "../entity";

const ALL_COMMODITIES_API = `${process.env.REACT_APP_COMMODITY_LIST}`;

export const getCommodities = async (): Promise<Commodities> => {
    const response = await http.get(ALL_COMMODITIES_API);
    return response.data
};
