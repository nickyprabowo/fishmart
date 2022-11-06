import { http } from "common/utility/http-client"
import { isEmpty } from "common/utility/object"
import { Fishes, OptionArea, OptionSize } from "../entity";
import { FilterDto } from "../dto";

const ALL_COMMODITIES_API = `${process.env.REACT_APP_COMMODITY_LIST}`;
const OPTION_SIZE_API = `${process.env.REACT_APP_COMMODITY_OPTION_SIZE}`;
const OPTION_AREA_API = `${process.env.REACT_APP_COMMODITY_OPTION_AREA}`;

export const getCommodities = async (query?: Partial<FilterDto>): Promise<Fishes> => {
    const paramJSON = isEmpty(query) ? "?search=".concat(JSON.stringify(query)) : ""
    const URL = `${ALL_COMMODITIES_API}${paramJSON}`
    const response = await http.get(URL);
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
