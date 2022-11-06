import { http } from "common/utility/http-client"
import { isEmpty } from "common/utility/object"
import { Fishes, OptionArea, OptionSize } from "../entity";
import { FilterDto, PaginationDto } from "../dto";

const BASE_URL = process.env.REACT_APP_COMMODITY_API_BASE_URL
const ALL_COMMODITIES_API = `${process.env.REACT_APP_COMMODITY_LIST}`;
const OPTION_SIZE_API = `${process.env.REACT_APP_COMMODITY_OPTION_SIZE}`;
const OPTION_AREA_API = `${process.env.REACT_APP_COMMODITY_OPTION_AREA}`;

export const getCommodities = async (pagination: PaginationDto, query?: Partial<FilterDto>): Promise<Fishes> => {
    let url = new window.URL(ALL_COMMODITIES_API, BASE_URL)
    let params = new URLSearchParams({
        limit: pagination.limit,
        offset: pagination.offset
    });
    if(!isEmpty(query)){
        params.append("search", JSON.stringify(query));
    }
    url.search = params.toString()

    const response = await http.get(url.href);
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
