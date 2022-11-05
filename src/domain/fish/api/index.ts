import { http } from "common/utility/http-client"
import { Commodities, OptionArea, OptionSize } from "../entity";

const ALL_COMMODITIES_API = `${process.env.REACT_APP_COMMODITY_LIST}`;
const OPTION_SIZE_API = `${process.env.REACT_APP_COMMODITY_OPTION_SIZE}`;
const OPTION_AREA_API = `${process.env.REACT_APP_COMMODITY_OPTION_AREA}`;

export const getCommodities = async (): Promise<Commodities> => {
    const response = await http.get(ALL_COMMODITIES_API);
    return response.data
};

export const getOptionSize = async (): Promise<OptionSize> => {
    const response = await http.get(OPTION_SIZE_API);
    return response.data
}

export const getOptionArea = async (): Promise<OptionArea> => {
    const response = await http.get(OPTION_AREA_API);
    return response.data
}
